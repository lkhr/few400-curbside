import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/sync.actions';
export interface SyncEntity {
  id: string;
  for: string;
  items: string[];
  status: string;
}

export interface SyncState extends EntityState<SyncEntity> {
  loaded: boolean;
}

export const adapter = createEntityAdapter<SyncEntity>();

const initialState = adapter.getInitialState({
  loaded: true,
});

const reducerFunction = createReducer(
  initialState,
  on(actions.curbsideOrderAdded, (s) => ({ ...s, loaded: false })),
  on(actions.curbsideOrderAddedSuccessfully, (s, a) => {
    const tempState = adapter.addOne(a.payload, s);
    return { ...tempState, loaded: true };
  })
);

export function reducer(state: SyncState = initialState, action: Action) {
  return reducerFunction(state, action);
}
