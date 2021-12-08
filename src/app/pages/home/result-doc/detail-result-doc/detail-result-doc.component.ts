import { Component, NgModule, } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';


@Component({
    selector: 'app-detail-result-doc',
    template: ` <app-menu-header [option]="option">
                </app-menu-header>
                <app-tab
                    [data]="data"
                    (tableCallBack)="openDetail($event)"
                ></app-tab>`
})
export class DetailResultDocComponent {
    option = {
        avatar: false,
        title: 'List of Result,Doc',
        search: false
    }
    data = [
        {
            type: 'table',
            label: 'Not yet uploaded',
            config: [
                {
                    condition: 'dateVisit',
                    name: 'Visit',
                    type: 'date',
                    width: '20%'
                },
                {
                    condition: 'content',
                    name: 'Problem',
                    type: 'text',
                    width: '60%'
                },
                {
                    condition: 'upload',
                    name: '',
                    type: 'upload',
                    width: '20%'
                },
            ],
            data: [
                {
                    dateVisit: new Date(),
                    content: 'benh nan y, benh nan y, ...'
                },
                {
                    dateVisit: new Date(),
                    content: 'benh nan y, benh nan y, ...'
                },
                {
                    dateVisit: new Date(),
                    content: 'benh nan y, benh nan y, ...'
                }
            ]

        },
        {
            type: 'list',
            label: 'Done',
            config: [
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
            ],
            data: [
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
        },
    ]
    constructor(
        private router: Router
    ) { }
    openDetail(ev) {
        this.router.navigateByUrl('result-doc/not-upload')
    }

}

@NgModule({
    declarations: [
        DetailResultDocComponent,
    ],
    imports: [
        BaseModule,
        MenuHeaderModule,
    ],
    providers: []
})
export class DetailResultDocModule { }