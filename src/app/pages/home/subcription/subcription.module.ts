import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { SubcriptionComponent } from './subcription.component';
import { SubcriptionRoutes } from './subcription.routes';
import { PaymentLogComponent } from './payment-log/payment-log.component';
import { MatTableModule } from '@angular/material/table';
import { ReviewPackageComponent } from './review-package/review-package.component';
import { AddMethodComponent } from './add-method/add-method.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeMethodComponent } from './change-method/change-method.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
      SubcriptionComponent,
      PaymentLogComponent,
      ReviewPackageComponent,
      AddMethodComponent,
      ChangeMethodComponent
    ],
    imports: [
        MenuHeaderModule,
        CommonModule,
        BaseModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(SubcriptionRoutes)
    ],
    exports: [
      SubcriptionComponent
    ],
    providers: [],
})
export class SubcriptionModule { }
