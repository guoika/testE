import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseModule } from "src/app/base/base.module";
import { MenuHeaderModule } from "src/app/layouts/menu-header/menu-header.component";
import { ListOfComponent } from "./list-of.component";
import { listOfRoutes } from "./list-of.routes";
@NgModule({
    declarations: [ListOfComponent],
    imports: [
        BaseModule,
        MenuHeaderModule,
        RouterModule.forChild(listOfRoutes)
    ],
    providers: []
})
export class ListOfModule { }