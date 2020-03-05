import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheAvanceePage } from './recherche-avancee.page';

const routes: Routes = [
  {
    path: '',
    component: RechercheAvanceePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercheAvanceePageRoutingModule {}
