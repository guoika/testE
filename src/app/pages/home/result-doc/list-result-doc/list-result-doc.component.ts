import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';

@Component({
    selector: 'app-list-result-doc',
    templateUrl: './list-result-doc.component.html',
    styleUrls: ['./list-result-doc.component.scss']
})
export class ListResultDocComponent implements OnInit {
    option = {
        avatar: true,
        title: 'List of Result,Doc',
        search: false
    }
    configData = [
        {
            condition: 'MediaURL',
            type: 'link',
            cssClass: 'MediaURL'
        },
        {
            condition: 'name',
            type: 'text',
            cssClass: 'text-bold'
        },
        {
            condition: 'id',
            type: 'text',
            cssClass: 'text-bold'
        },
        {
            condition: 'position',
            type: 'text',
            cssClass: 'text-regular'
        },
    ]
    data = [
        {
            MediaURL: 'assets/png/list-avatar.png',
            name: 'Tran Thi Thu',
            id: '125468792',
            position: 'Doctor'
        },
        {
            MediaURL: 'assets/png/list-avatar.png',
            name: 'Tran Thi Thu',
            id: '125468792',
            position: 'Doctor'
        }
    ]
    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }
    routeToDetail(ev) {
        this.router.navigateByUrl('result-doc/detail')
    }

}

@NgModule({
    declarations: [
        ListResultDocComponent,
    ],
    imports: [
        BaseModule,
        MenuHeaderModule
    ],
    providers: []
})
export class ListResultDocModule { }