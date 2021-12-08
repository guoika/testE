import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { TableComponent } from './table/table.component';
import { TabComponent } from './tab/tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { CardComponent } from './card/card.component';
import { ModalExamsComponent } from './modal-exams/modal-exams.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

@NgModule({
    declarations: [
        ListComponent,
        DetailComponent,
        TableComponent,
        TabComponent,
        ButtonComponent,
        ModalComponent,
        CardComponent,
        ModalExamsComponent,
        CompanyDetailComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatTabsModule,
        MatDialogModule,
        RouterModule,
        SwiperModule,
        NgxPaginationModule
    ],
    providers: [],
    exports: [
        ListComponent,
        DetailComponent,
        CompanyDetailComponent,
        TableComponent,
        TabComponent,
        ButtonComponent,
        ModalComponent,
        CardComponent,
    ]
})
export class BaseModule { }
