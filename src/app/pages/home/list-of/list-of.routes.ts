import { Routes } from "@angular/router";
import { HomeListOfComponent } from "./home-list-of/home-list-of.component";
import { ListOfComponent } from "./list-of.component";

export const listOfRoutes: Routes = [
    {
        path: '',
        component: ListOfComponent,
        children: [
            {
                path: '',
                component: HomeListOfComponent
            },
            {
                path: 'medication',
                loadChildren: () => import('./medication/medication.module').then(m => m.MedicationModule),
            },
            {
                path: 'service',
                loadChildren: () => import('./services/services.module').then(m => m.ServiceModule),
            },
            {
                path: 'exam',
                loadChildren: () => import('./exams/exams.module').then(m => m.ExamsModule),
            },
            {
                path: 'test',
                loadChildren: () => import('./test/test.module').then(m => m.TestModule),
            },
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full',
            }
        ]
    }
]