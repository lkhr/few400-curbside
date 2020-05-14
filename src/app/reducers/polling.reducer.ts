import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/polling.actions';
export interface PollingEntity {
  id: string;
  for: string;
  items: string[];
  status: string;
}

export interface PollingState extends EntityState<PollingEntity> {}

export const adapter = createEntityAdapter<PollingEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.curbsideOrderAddedSuccessfully, (s, a) =>
    adapter.addOne(a.payload, s)
  ),
  on(actions.refreshItemSuccess, (s, a) =>
    adapter.updateOne({ id: a.id, changes: { status: a.status } }, s)
  )
);

export function reducer(state: PollingState = initialState, action: Action) {
  return reducerFunction(state, action);
}
