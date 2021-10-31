import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directive/dropdown.directive';
import { AlertComponent } from './component/alert/alert.component';
import { LoadingComponent } from './component/loading/loading.component';
import { PlaceholderDirective } from './directive/placeholder.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DropdownDirective,
    LoadingComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [AlertComponent],  
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownDirective,
    LoadingComponent,
    AlertComponent,
    PlaceholderDirective
  ]
})
export class SharedModule { }
