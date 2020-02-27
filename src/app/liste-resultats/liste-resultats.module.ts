import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeResultatsPageRoutingModule } from './liste-resultats-routing.module';

import { ListeResultatsPage } from './liste-resultats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeResultatsPageRoutingModule
  ],
  declarations: [ListeResultatsPage]
})
export class ListeResultatsPageModule {}
