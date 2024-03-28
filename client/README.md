# UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## ToDo

- Set up an HTTP error handler and message service properly and implement some (back-end?) logging for errors.
- For more, [see requirements](../README.md#requirements)

## Notes

Actually, haven't done anything in the front end, except set up a simple text field with reactive forms (which is to be extended once I finish the actual Domain Model) and implement some necessary stuff to test and develop. The whole front-end still needs to be designed and created.

## Deployment

run `ng build --configuration=production`, then `firebase deploy`. Make sure you are logged in, in the correct firebase account `firebase login`, and have the correct firebase project selected. `ng deploy` will not work, because it is not set up (I need to delete all firebase stuff in the ui folder and rerun `firebase init` or so idk, tbh, last time ng deploy was automatically set up).

## Domain vs Infrastructure (Outdated I think, its feature-by-folder with domain structure. maybe a little vertical slice structure)

`/app` never is allowed to access the infrastructure layer. Only the Domain is allowed to make use of the infrastructure.
The incrastructure contains 3rd-party libraries, like i18n or open-api generated files.

The domain contains `feature-`'s (usually smart components which are routable, and hard to reuse).
As well as `ui`'s (usually dumb components, reuseable) and utils which usually contains pipes (relating to the domain) and such.

## LocalPersitor

The app mostly runs on locally stored data, and every now and then syncs with the remote database to share its own data (Recipe Modifications, new Recipes, etc..).  
*Name suffices are open to change.*

- Classes named `exmaple.local-persistor.ts` are responsible for CRUD operations, which are all offline compatible. (The app used [idb](https://github.com/jakearchibald/idb) library for this mostly)  
The name implies, that the underlaying storage plays no role. (Whether it be, indexedDB, localStorage, etc..).  
- Classes named `exmaple.api.ts` are responsible for CRUD operations on the remote database.
- Classes named `example.syncer.ts`  are Mediators. They make use of the `example.api.ts` and the `exmaple.local-persistor.ts` files, to keep the local database in sync with the remote (and vice versa).  

## Adding domain prefixes

in `.eslintrc` add the prefixes to the `@angular-eslint` properties.

## Testing Jest and Cypress

Jasmine:

- run `ng test` to run all spec.ts files
- for intellisense, go to `tsconfig.json`, scroll to the bottom and follow the comments to enable jasmine types (this will disable cypress types, because the conflict each other)
- use --include filepath to run specified files

Cypress:

- run `yarn run cypress open` and follow the browser to test e2e or component

## Syncing

Syncing, is the process of syncing a client database with the remote database.

### Updating local-db based on remote-db

The client can request the server:

- to query by `creator` != requestingClient-`chefId` AND `createdAt` > `lastSyncDate`-local.  
*The resulting entities have been creatd by other chefs, since the last time the requesting client syned.*
- to query by `creator` != requestingClient-`chefId` AND `modifiedAt` > `lastSyncDate`-local.  
*The resulting entities have been modified by other chefs, since the last time the requesting client syned.*
- to retrieve a list of deleted `entityId`s filtered by `creator` != requestingClient-`chefId` AND `deletionDate` > `lastSyncDate`-local.  
*on remote deletions, the `entityId` and the present date is stored to remeber which entities have been deleted.*

### Updating remote-db based on local-db

- store a queue of created and modified and deleted `entityId`s. These can be send to the server.
*a server action is stored alongside, so the server can tell easily apar which action to take.*

```typescript
/** the action the server has to execute. */
enum ServerAction { Create, Modify, Delete }

interface SyncAction
{
  entityId: EntityId;
  action: ServerAction;
}
```

> **Note:**  
> *For some operations the order of execution is important.  
> Generally, make sure, to sync "child" before "parent" entities.*
