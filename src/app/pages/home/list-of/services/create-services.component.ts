import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { MedicationModel } from 'src/app/models/home/medication.model';
import { ServiceModel } from 'src/app/models/home/service.model';
import { MedicationService } from 'src/app/services/medication.service';
import { ServicepriceService } from 'src/app/services/serviceprice.service';
import { SwalService } from 'src/app/services/swal.service';
import { CommonService } from 'src/app/utils/pipes/common.service';

@Component({
    selector: 'app-create-service',
    template: ` <app-menu-header [option]="optionHeader" >
                </app-menu-header>
                <app-detail
                    [data]="listCreate"
                    [dataModel]="model"
                    [option]="option"
                    (callback)="handleEventDetail($event)"
                    [button]="btnConfig"
                ></app-detail>`
})
export class CreateServiceComponent implements OnInit {
    config = new ServiceModel();
    listCreate = [];
    ListServiceType;
    model: any = {
        MediaURL: 'assets/svg/big-avatar.svg',
    };
    option = {
        avatar: false,
        search: false,
        col: 'col-6'
    };
    optionHeader = {
      title: 'Create Service',
    };
    btnConfig: any = {
        isEventUpdate: true,
        listUpdate: { save: true }
    }
    constructor(
        private router: Router,
        private commonService: CommonService,
        private servicePrice: ServicepriceService,
        private swal: SwalService
    ) { }

    ngOnInit() {
        this.listCreate = this.config.create;
        this.commonService.listCurrency().subscribe(res => {
            this.listCreate[3].data = res.map(x => {
                return {
                    CurrencyId: x.CurrencyId,
                    Code: x.Code,
                    Name: x.Code,
                    value: x.CurrencyId
                }
            })

        });
        this.servicePrice.listServiceTypes().subscribe(res => {
            this.ListServiceType = res.map(x =>  {
              return {
                Name: x.Value,
                value: x.NumericKey
              };
            });
            this.listCreate[1].data = this.ListServiceType;
        }, err => {
            const listServiceType = [{ Name: 'Exam', value: 1 }, { Name: 'Diagnosis', value: 2 }, { Name: 'Test', value: 3 }];
            this.listCreate[1].data = listServiceType;
        })
    }

    handleEventDetail = (value) => {
        const model = {
            CurrencyId: +value.data.CurrencyId,
            Description: value.data.Description,
            MediaURL: value.data.MediaURL,
            Name: value.data.Name,
            Price: +value.data.Price,
            ServiceType: +value.data.ServiceType,
            TaxRate: +value.data.TaxRate
        };
        this.servicePrice.create(model).subscribe(res => {
            // this.swal.success('Create success');
            this.router.navigateByUrl('management/service/list');
        });
    };
}
@NgModule({
    declarations: [CreateServiceComponent],
    imports: [
        BaseModule,
        MenuHeaderModule
    ],
    providers: []
})

export class CreateServiceModule { }
