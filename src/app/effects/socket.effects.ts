import { Injectable } from '@angular/core';
import { AppState } from '../reducers';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as signalR from '@aspnet/signalr';

import { environment } from '../../environments/environment';
import * as actions from '../actions/socket.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class SocketEffects {

  sendOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.curbsideOrderRequest),
      tap(a => this.hubConnection.send('PlaceOrder', a.payload))
    ), { dispatch: false }
  );

  private hubConnection: signalR.HubConnection;

  constructor(private actions$: Actions, private store: Store<AppState>) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.wsUrl + '/curbsidehub')
      .build();

    this.hubConnection.start()
      .then(() => console.log('Started the hub Connection'))
      .catch(err => console.error('Error in hub Connection ', err));

    this.hubConnection.on('OrderPlaced', (data) => this.store.dispatch(actions.orderPlaced({ payload: data })));
    this.hubConnection.on('OrderProcessed', (data) => this.store.dispatch(actions.orderProcessed({ payload: data })));
    this.hubConnection.on('OrderItemProcessed', (data) => this.store.dispatch(actions.orderItemProcessed({ ...data })));


  }


}
