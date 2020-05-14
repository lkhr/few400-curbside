import { createAction, props } from '@ngrx/store';
import { SocketEntity } from '../reducers/socket.reducer';

export const curbsideOrderRequest = createAction(
  '[socket] curbside order request',
  props<{ payload: { for: string; items: string[] } }>()
);

export const orderPlaced = createAction(
  '[socket] order placed',
  props<{ payload: SocketEntity }>()
);

export const orderItemProcessed = createAction(
  '[socket] order item processed',
  props<{ id: string; itemId: string }>()
);

export const orderProcessed = createAction(
  '[socket] order processed',
  props<{ payload: SocketEntity }>()
);
