import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MedicationComponent } from './medication.component';
import { medicationRoutes } from './medication.routes';

@NgModule({
    declarations: [MedicationComponent],
    imports: [RouterModule.forChild(medicationRoutes)],
    providers: [],
})
export class MedicationModule { }
