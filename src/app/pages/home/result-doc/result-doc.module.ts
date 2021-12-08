import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseModule } from "src/app/base/base.module";
import { MenuHeaderModule } from "src/app/layouts/menu-header/menu-header.component";
import { ResultDocComponent } from "./result-doc.component";
import { resultDocRoutes } from "./result-doc.routes";

@NgModule({
    declarations: [
        ResultDocComponent
    ],
    imports: [
        BaseModule,
        MenuHeaderModule,
        RouterModule.forChild(resultDocRoutes)
    ],
    providers: []
})
export class ResultDocModule { }