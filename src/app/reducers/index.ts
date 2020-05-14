import * as fromPolling from './polling.reducer';
import * as fromSync from './sync.reducer';
import * as fromSocket from './socket.reducer';
import { createSelector } from '@ngrx/store';
export interface AppState {
  sync: fromSync.SyncState;
  polling: fromPolling.PollingState;
  socket: fromSocket.SocketState;
}

export const reducers = {
  polling: fromPolling.reducer,
  sync: fromSync.reducer,
  socket: fromSocket.reducer,
};

const selectPollingBrach = (state: AppState) => state.polling;
const selectSyncBranch = (state: AppState) => state.sync;
const selectSocketBranch = (state: AppState) => state.socket;

export const { selectAll: selectAllPolling } = fromPolling.adapter.getSelectors(
  selectPollingBrach
);

export const { selectAll: selectAllSync } = fromSync.adapter.getSelectors(
  selectSyncBranch
);

export const { selectAll: selectAllSocket } = fromSync.adapter.getSelectors(
  selectSocketBranch
);

export const selectSyncLoaded = createSelector(
  selectSyncBranch,
  (b) => b.loaded
);

export const selectSocketMessage = createSelector(
  selectSocketBranch,
  (b) => b.message
);
