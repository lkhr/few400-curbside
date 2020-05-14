import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as actions from '../actions/polling.actions';
import { switchMap, map } from 'rxjs/operators';
import { PollingEntity } from '../reducers/polling.reducer';
import { pipe } from 'rxjs';
@Injectable()
export class PollingEffects {
  readonly baseUrl = environment.apiUrl + '/curbsideorders';

  refreshItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.refreshItem),
        switchMap((request) =>
          this.client.get(this.baseUrl + '/' + request.id).pipe(
            map((response: PollingEntity) =>
              actions.refreshItemSuccess({
                id: response.id,
                status: response.status,
              })
            )
          )
        )
      ),
    { dispatch: true }
  );

  addOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.curbsideOrderAdded),
        switchMap((action) =>
          this.client
            .post(this.baseUrl, { for: action.for, items: action.items })

            .pipe(
              map((response: PollingEntity) =>
                actions.curbsideOrderAddedSuccessfully({ payload: response })
              )
            )
        )
      ),
    { dispatch: true }
  );
  constructor(private actions$: Actions, private client: HttpClient) {}
}
