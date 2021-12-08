import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { ReportComponent } from './report.component';
import { reportRoutes } from './report.routes';
import { ReportCustomComponent } from './report-custom/report-custom.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [ReportComponent, ReportCustomComponent],
    imports: [
        CommonModule,
        MenuHeaderModule,
        RouterModule.forChild(reportRoutes),
        BaseModule,
        MatDialogModule,
        DragDropModule,
    ],
    exports: [ReportComponent],
})
export class ReportModule {

}
