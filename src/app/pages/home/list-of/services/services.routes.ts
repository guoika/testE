import { Routes } from "@angular/router";
import { CreateServiceComponent } from "./create-services.component";
import { DetailServiceComponent } from "./detail-services.component";
import { ListServiceComponent } from "./list-services.component";
import { ServiceComponent } from "./services.component";


export const serviceRouter: Routes = [
    {
        path: '',
        component: ServiceComponent,
        children: [
            {
                path: 'list',
                component: ListServiceComponent
            },
            {
                path: 'create',
                component: CreateServiceComponent
            },
            {
                path: ':id',
                component: DetailServiceComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
        ]
    }
]