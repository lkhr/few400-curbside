import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollingComponent } from './components/polling/polling.component';
import { SocketsComponent } from './components/sockets/sockets.component';
import { SyncComponent } from './components/sync/sync.component';

const routes: Routes = [
  {
    path: 'sync',
    component: SyncComponent,
  },
  {
    path: 'polling',
    component: PollingComponent,
  },
  {
    path: 'sockets',
    component: SocketsComponent,
  },
  {
    path: '**',
    redirectTo: 'sync',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
