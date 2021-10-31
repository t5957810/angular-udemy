import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
