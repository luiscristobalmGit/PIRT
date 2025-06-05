import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroAppPageRoutingModule } from './registro-app-routing.module';
import { RegistroAppPage } from './registro-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAppPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroAppPage]
})
export class RegistroAppPageModule {}
