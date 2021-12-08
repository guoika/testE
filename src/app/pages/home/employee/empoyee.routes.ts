import { Routes } from "@angular/router";
import { AddUpdateEmployeeComponent } from "./create-employee/create-employee.component";
import { DetailEmployeeComponent } from "./detail-employee/detail-employee.component";
import { EmployeeComponent } from "./employee.component";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";

export const employeeRoutes: Routes = [
    {
        path: '',
        component: EmployeeComponent,
        children: [
            {
                path: 'list',
                component: ListEmployeeComponent
            },
            {
                path: 'add',
                component: AddUpdateEmployeeComponent
            },
            {
                path: ':id',
                component: DetailEmployeeComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
        ]
    }
]