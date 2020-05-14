import { createAction, props } from '@ngrx/store';
import { PollingEntity } from '../reducers/polling.reducer';

export const curbsideOrderAdded = createAction(
  '[polling] curbside order added',
  props<{ for: string; items: string[] }>()
);

export const curbsideOrderAddedSuccessfully = createAction(
  '[polling] curbside order added successfully',
  props<{ payload: PollingEntity }>()
);

export const refreshItem = createAction(
  '[polling] refresh item request',
  props<{ id: string }>()
);

export const refreshItemSuccess = createAction(
  '[polling] refresh item success',
  props<{ id: string; status: string }>()
);
