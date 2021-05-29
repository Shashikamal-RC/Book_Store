import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TimelineModule } from 'primeng/timeline';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    InputNumberModule,
    FileUploadModule,
    MultiSelectModule,
    CalendarModule,
    TimelineModule,
    StepsModule,
    RadioButtonModule
  ]
})
export class PrimeNgModule { }
