import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseModule } from "src/app/base/base.module";
import { MenuHeaderModule } from "src/app/layouts/menu-header/menu-header.component";
import { EmployeeComponent } from "./employee.component";
import { employeeRoutes } from "./empoyee.routes";

@NgModule({
    declarations: [
        EmployeeComponent,
    ],
    imports: [
        BaseModule,
        MenuHeaderModule,
        RouterModule.forChild(employeeRoutes)
    ],
    providers: []
})
export class EmployeeModule { }