import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheAvanceePageRoutingModule } from './recherche-avancee-routing.module';

import { RechercheAvanceePage } from './recherche-avancee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheAvanceePageRoutingModule
  ],
  declarations: [RechercheAvanceePage]
})
export class RechercheAvanceePageModule {}
