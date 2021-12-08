import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceComponent } from './services.component';
import { serviceRouter } from './services.routes';

@NgModule({
    declarations: [ServiceComponent],
    imports: [RouterModule.forChild(serviceRouter)],
    providers: [],
})
export class ServiceModule { }
