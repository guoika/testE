import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { TestComponent } from './test.component';
import { testRoutes } from './test.routes';

@NgModule({
    declarations: [
        TestComponent
    ],
    imports: [
        MenuHeaderModule,
        CommonModule, BaseModule,
        RouterModule.forChild(testRoutes)
    ],
})
export class TestModule { }
