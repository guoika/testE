import { Routes } from "@angular/router";
import { DetailResultDocComponent } from "./detail-result-doc/detail-result-doc.component";
import { ListResultDocComponent } from "./list-result-doc/list-result-doc.component";
import { NotUploadComponent } from "./not-upload/not-upload.component";
import { ResultDocComponent } from "./result-doc.component";


export const resultDocRoutes: Routes = [
    {
        path: '',
        component: ResultDocComponent,
        children: [
            {
                path: 'list',
                component: ListResultDocComponent
            },
            {
                path: 'detail',
                component: DetailResultDocComponent
            },
            {
                path: 'not-upload',
                component: NotUploadComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
        ]
    }
]