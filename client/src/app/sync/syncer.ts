import { Injectable, inject } from '@angular/core';
import { RecipeLocalPersistor } from '../recipe/local-persistor/recipe.local-persistor';
import { RecipeApi } from '../recipe/api/recipe.api';
import { ActionLog } from '@sync';

/**
 * takes the log of actions, and executes them one after another.
 * In case one fails, it will immediatly stop.
 * The failed action, is considered a "conflict" which needs to be resolved,
 * before the syncer will continue processing action logs.
 */
@Injectable({ providedIn: 'root' })
export class Syncer {
  private readonly recipeLP = inject(RecipeLocalPersistor);
  private readonly recipeApi = inject(RecipeApi);

  async syncAsync(): Promise<void> {
    const apiActionLogs = await this.recipeApi.getActionLogsAsync();
    const lpActionLogs = await this.recipeLP.getActionLogsAsync();
    const byDateAsc = (lhs: Date, rhs: Date) => {
      const lhsMs = lhs.getTime();
      const rhsMs = rhs.getTime();
      if (lhsMs < rhsMs) return -1;
      else if (lhsMs > rhsMs) return 1;
      else return 0;
    };
    const actionLogs = lpActionLogs
      .concat(apiActionLogs)
      .sort((lhs, rhs) => byDateAsc(lhs.createdAt, rhs.createdAt));

    for (const actionLog of actionLogs) {
      switch (actionLog.source) {
        case 'api': {
          // currently the api has no actionlogs
          break;
        }
        case 'local-persistor': {
          this.recipeLP.processLogAsync(actionLog);
          break;
        }
        default:
          throw new Error(
            `Log Source not implemented '${actionLog.source}' (Should never reach).`,
          );
      }
    }
  }

  // - read action logs from server (mocked)
  // - read action logs from local
  // merge them, and sort them by date asc
  // execute them one after another
  // report progress before and after each log process
  // ui is out of scope here
}
