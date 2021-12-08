import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
    selector: 'app-list-employee',
    templateUrl: './list-employee.component.html',
    styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
    isShowActive = false;
    option = {
        avatar: true,
        title: 'List of Employees',
        search: true
    }

    configData = [
        {
            condition: 'MediaURL',
            type: 'link',
            cssClass: 'MediaURL'
        },

        {
            condition: 'FullName',
            type: 'text',
            cssClass: 'text-bold'
        },
        {
            condition: 'ProviderCode',
            type: 'text',
            cssClass: 'text-bold'
        },
        {
            condition: 'PositionName',
            type: 'text',
            cssClass: 'text-regular'
        }
    ]
    listEmployeeActive: any = [];
    listEmployeeResigned: any = [];
    dataActive: any = [];
    dataResigned: any = [];
    constructor(
        private service: EmployeeService,
        private router: Router
    ) { }

    ngOnInit() {
        this.service.listEmployee(1).subscribe(res => {
            console.log(res, 123);

            this.listEmployeeActive = res.map(x => {
                return {
                    MediaURL: x.MediaURL,
                    PositionName: x.PositionName,
                    FullName: x.FullName,
                    ProviderId: x.ProviderId,
                    ProviderCode: x.ProviderCode,
                    fullText: x.FullName + '-' + x.ProviderId
                };
            });
            this.dataActive = this.listEmployeeActive;
        });
        this.service.listEmployee(2).subscribe(res => {
            this.listEmployeeResigned = res.map(x => {
                return {
                    MediaURL: x.MediaURL,
                    PositionName: x.PositionName,
                    FullName: x.FullName,
                    ProviderId: x.ProviderId,
                    ProviderCode: x.ProviderCode,
                    fullText: x.FullName + '-' + x.ProviderId
                };
            });
            this.dataResigned = this.listEmployeeResigned;
        });
    }

    handleChangeValueSearch = (keyword) => {
        this.listEmployeeActive = this.dataActive.filter((item: any) => {
            return item.fullText.toLowerCase().includes(keyword.trim().toLocaleLowerCase());
        })
        this.listEmployeeResigned = this.dataResigned.filter((item: any) => {
            return item.fullText.toLowerCase().includes(keyword.trim().toLocaleLowerCase());
        })
    }

    routeToDetail(ev): void {
        this.router.navigateByUrl(`employee/${ev.ProviderId}`);
    }

    linkToAdd(ev) {
        this.router.navigateByUrl('employee/add');
    }

}
@NgModule({
    declarations: [
        ListEmployeeComponent
    ],
    imports: [
        BaseModule,
        CommonModule,
        MatTabsModule,
        MenuHeaderModule
    ],
    providers: []
})

export class ListEmpoyeeModule { }
