import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BaseModule } from "src/app/base/base.module";
import { MenuHeaderModule } from "src/app/layouts/menu-header/menu-header.component";
import { CompanyComponent } from "./company.component";
import { companyRoutes } from "./company.routes";

@NgModule({
    declarations: [
        CompanyComponent
    ],
    imports: [
        MenuHeaderModule,
        BaseModule,
        RouterModule.forChild(companyRoutes)
    ],
    exports: [
        CompanyComponent
    ],
    providers: [],
})
export class CompanyModule { }