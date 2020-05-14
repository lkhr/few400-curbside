import { createAction, props } from '@ngrx/store';
import { SyncEntity } from '../reducers/sync.reducer';

export const curbsideOrderAdded = createAction(
  '[sync] curbside order added',
  props<{ for: string; items: string[] }>()
);

export const curbsideOrderAddedSuccessfully = createAction(
  '[sync] curbside order added successfully',
  props<{ payload: SyncEntity }>()
);
