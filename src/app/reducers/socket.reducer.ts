import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/socket.actions';
export interface SocketEntity {
  id: string;
  for: string;
  items: string[];
  status: string;
}

export interface SocketState extends EntityState<SocketEntity> {
  message: string;
}

export const adapter = createEntityAdapter<SocketEntity>();

const initialState = adapter.getInitialState({
  message: '',
});

const reducerFunction = createReducer(
  initialState,
  on(actions.orderPlaced, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.orderProcessed, (s, a) => {
    const temp = adapter.upsertOne(a.payload, s);
    return { ...temp, message: null };
  }),
  on(actions.orderItemProcessed, (s, a) => ({
    ...s,
    message: `Updated ${a.itemId} of order ${a.id}`,
  }))
);

export function reducer(state: SocketState = initialState, action: Action) {
  return reducerFunction(state, action);
}
