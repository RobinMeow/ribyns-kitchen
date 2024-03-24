import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase, IDBPObjectStore } from 'idb';
import { RecipeLocalDto } from 'src/app/recipe/util/Recipe.local-dto';

interface CommunityCookbook extends IDBPDatabase {
  recipes: IDBPObjectStore<RecipeLocalDto, 'id'>;
}

export type CommunityCookbookDb = Omit<
  IDBPDatabase<CommunityCookbook>,
  | 'createObjectStore' // store creation should only be in onversion change, which is to be extended via the super() constructor
  | 'clear'
  | 'onversionchange'
  | 'onabort'
  | 'onclose'
  | 'onerror'
  | 'addEventListener'
  | 'removeEventListener'
  | 'close'
  | 'deleteObjectStore'
  | 'dispatchEvent'
  | 'objectStoreNames' // StoreNames are exposed in the base class.
  | 'name' // i dont see as of now, why the calling code would use this. (and if, it might be better of exposing it like StoreNames)
  | 'version' // same reason as 'name'
>;

@Injectable({ providedIn: 'root' })
export class LocalPersistorBase {
  private static readonly _storeNames = {
    Recipes: 'recipes',
  };

  private static readonly indexedDbVersion = 1;

  private static _database?: IDBPDatabase<CommunityCookbook> = undefined;

  protected readonly StoreNames = LocalPersistorBase._storeNames;

  constructor() {}

  /** Lazy Loaded (also avoids inconvienient static class accesors, which are suppoed to be a encapsulated impl detail.) */
  protected async getDatabaseAsync(): Promise<CommunityCookbookDb> {
    if (!LocalPersistorBase._database) {
      LocalPersistorBase._database = await LocalPersistorBase.initDbAsync();
    }

    return LocalPersistorBase._database;
  }

  private static initDbAsync(): Promise<IDBPDatabase<CommunityCookbook>> {
    return openDB<CommunityCookbook>(
      'communitycookbook',
      this.indexedDbVersion,
      {
        upgrade: (
          database: IDBPDatabase<CommunityCookbook>,
          oldVersion: number,
        ) => {
          this.onVersionChange(database, oldVersion);
        },
      },
    );
  }

  // This should not contain async code.
  // If it absolutely has to, bear in mind, that the transaction automatically
  // completes when all microtasks are completed.
  private static onVersionChange(
    database: IDBPDatabase<CommunityCookbook>,
    oldVersion: number,
  ): void {
    try {
      let currentVersion = oldVersion;
      while (currentVersion != this.indexedDbVersion) {
        switch (currentVersion) {
          case 0: {
            this.init(database);
            break;
          }
          default:
            throw new Error(
              'Version upgrade not implemented. (Should never reach in prod)',
            );
        }
        currentVersion++;
      }
    } catch (error) {
      console.error(error);
    }
  }

  private static init(database: IDBPDatabase<CommunityCookbook>) {
    for (const storeName of Object.values(LocalPersistorBase._storeNames)) {
      database.createObjectStore(storeName, { keyPath: 'id' });
      console.log('LocalPersistor created: ', storeName);
    }
  }
}
