import { Routes } from "@angular/router";
import { ExamsComponent } from "./exams.component";
import { ListExamsComponent } from "./list-exams.component";


export const examsRoutes: Routes = [
    {
        path: '',
        component: ExamsComponent,
        children: [
            {
                path: 'list',
                component: ListExamsComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
        ]
    }
]