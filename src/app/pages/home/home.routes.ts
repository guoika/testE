import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'company',
                loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
            },
            {
              path: 'subscription',
              loadChildren: () => import('./subcription/subcription.module').then(m => m.SubcriptionModule),
            },
            {
                path: 'employee',
                loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
            },
            {
                path: 'management',
                loadChildren: () => import('./list-of/list-of.module').then(m => m.ListOfModule),
            },
            {
                path: 'result-doc',
                loadChildren: () => import('./result-doc/result-doc.module').then(m => m.ResultDocModule),
            },
            {
                path: 'report',
                loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
            },
            {
                path: '',
                redirectTo: 'company',
                pathMatch: 'full',
            },
        ],
    }
];
