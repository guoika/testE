import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBarModule } from 'src/app/layouts/menu-bar/menu-bar.component';
import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';
@NgModule({
    declarations: [HomeComponent],
    imports: [
        RouterModule.forChild(homeRoutes),
        MenuBarModule
    ],
    providers: [],
})
export class HomeModule { }
