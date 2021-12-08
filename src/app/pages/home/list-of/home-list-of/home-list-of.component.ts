import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
@Component({
    selector: 'app-home-list-of',
    templateUrl: './home-list-of.component.html',
    styleUrls: ['./home-list-of.component.scss']
})
export class HomeListOfComponent {
    option = {
        avatar: true,
        title: 'Lists Management',
        search: false
    }
    listItem: any = [
        {
            text: 'List of Tests',
            icon: 'assets/svg/listTest.png',
            router: 'test'
        },
        {
            text: 'List of Exam',
            icon: 'assets/svg/listExam.png',
            router: 'exam'
        },
        {
            text: 'List of Medications',
            icon: 'assets/svg/listMedication.png',
            router: 'medication'
        },
        {
            text: 'List of Services',
            icon: 'assets/svg/Services.png',
            router: 'service'
        }]
}
@NgModule({
    declarations: [
        HomeListOfComponent,
    ],
    imports: [
        MenuHeaderModule,
        RouterModule,
        CommonModule
    ],
    exports: [
        HomeListOfComponent
    ]
})
export class HomeListOfModule { }
