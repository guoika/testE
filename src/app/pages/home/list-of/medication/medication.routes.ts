import { Routes } from "@angular/router";
import { CreateMedicationComponent } from "./create-medication.component";
import { DetailMedicationComponent } from "./detail-medication.component";
import { ListMedicationComponent } from "./list-medication.component";
import { MedicationComponent } from "./medication.component";

export const medicationRoutes: Routes = [
    {
        path: '',
        component: MedicationComponent,
        children: [
            {
                path: 'list',
                component: ListMedicationComponent
            },
            {
                path: 'create',
                component: CreateMedicationComponent
            },
            {
                path: ':id',
                component: DetailMedicationComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
        ]
    }
]