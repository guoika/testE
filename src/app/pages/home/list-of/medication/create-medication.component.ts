import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { MedicationModel } from 'src/app/models/home/medication.model';
import { MedicationService } from 'src/app/services/medication.service';
import { SwalService } from 'src/app/services/swal.service';
import { CommonService } from 'src/app/utils/pipes/common.service';

@Component({
    selector: 'app-create-medication',
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
export class CreateMedicationComponent implements OnInit {
    config = new MedicationModel();
    listCreate = [];
    model: any = {
        MediaURL: 'assets/svg/logo-big.svg',
    };
    option = {
        avatar: true,
        search: false,
        col: 'col-6'
    };
    optionHeader = {
      avatar: true,
      title: 'Create Medication',
      search: false,
      col: 'col-6'
  }
    btnConfig: any = {
        isEventUpdate: true,
        listUpdate: { save: true }
    }
    constructor(
        private service: MedicationService,
        private router: Router,
        private commonService: CommonService,
        private swal: SwalService
    ) { }

    ngOnInit() {
        this.listCreate = this.config.create;
        this.commonService.listUnit().subscribe(res => {
            this.listCreate[3].data = res.map(x => {
                return {
                    Name: x.Description,
                    UnitId: x.UnitId,
                    value: x.UnitId
                }
            })
        })
        this.commonService.listCurrency().subscribe(res => {
            this.listCreate[5].data = res.map(x => {
                return {
                    CurrencyId: x.CurrencyId,
                    Code: x.Code,
                    Name: x.Code,
                    value: x.CurrencyId
                }
            })

        })
    }

    handleEventDetail = (value) => {
        this.service.create(value.data).subscribe(res => {
            // this.swal.success('Create success');
            this.router.navigateByUrl('/management/medication/list');
        })
    };
}
@NgModule({
    declarations: [CreateMedicationComponent],
    imports: [BaseModule, MenuHeaderModule],
    providers: []
})

export class CreateMedicationModule { }
