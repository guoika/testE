import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamsComponent } from './exams.component';
import { examsRoutes } from './exams.routes';

@NgModule({
    declarations: [ExamsComponent],
    imports: [
        RouterModule.forChild(examsRoutes)],

})
export class ExamsModule { }
