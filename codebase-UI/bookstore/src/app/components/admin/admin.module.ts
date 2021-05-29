import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { PrimeNgModule } from 'src/app/prime-ng.module';

import { DialogService } from 'primeng/dynamicdialog';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';

@NgModule({
  declarations: [AdminComponent, AddBookComponent, AddAuthorComponent, AddPublisherComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService
  ]
})
export class AdminModule { }
