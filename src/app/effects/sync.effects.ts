import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as actions from '../actions/sync.actions';
import { switchMap, map } from 'rxjs/operators';
import { SyncEntity } from '../reducers/sync.reducer';
import { pipe } from 'rxjs';
@Injectable()
export class SyncEffects {
  readonly baseUrl = environment.apiUrl + '/curbsideordersync';

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.curbsideOrderAdded),
      switchMap((a) =>
        this.client
          .post(this.baseUrl, { for: a.for, items: a.items })
          .pipe(
            map((result: SyncEntity) =>
              actions.curbsideOrderAddedSuccessfully({ payload: result })
            )
          )
      )
    )
  );
  constructor(private actions$: Actions, private client: HttpClient) {}
}
