import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeResultatsPage } from './liste-resultats.page';

const routes: Routes = [
  {
    path: '',
    component: ListeResultatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeResultatsPageRoutingModule {}
