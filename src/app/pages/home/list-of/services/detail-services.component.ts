import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { ServiceModel } from 'src/app/models/home/service.model';
import { ServicepriceService } from 'src/app/services/serviceprice.service';
import { SwalService } from 'src/app/services/swal.service';
import { CommonService } from 'src/app/utils/pipes/common.service';

@Component({
    selector: 'app-detail-service',
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
export class DetailServiceComponent implements OnInit {
    // option = {
    //     avatar: false,
    //     title: 'Edit service',
    //     search: false,
    //     col: 'col-12'
    // };
    option = {
      avatar: false,
      search: false,
      col: 'col-6'
    };
    optionHeader = {
      title: 'Edit service',
    };
    config = new ServiceModel();
    listCreate = [];
    serviceId = 0;
    ListServiceType;
    model: any = {};
    btnConfig: any = {
      isEventUpdate: false,
      listUpdate: { cancel: true, save: true },
      listNoUpdate: { edit: true }
    };

    constructor(
        private service: ServicepriceService,
        private swal: SwalService,
        private route: Router,
        private router: ActivatedRoute,
        private servicePrice: ServicepriceService,
        private commonService: CommonService,
    ) { }

    ngOnInit(): void {
        this.listCreate = this.config.edit;
        this.serviceId = +this.router.snapshot.params.id;
        // this.model = this.data;
        this.getListServicePrice();
    }
    getListServicePrice(): void {
      this.service.list().subscribe((res) => {
        this.model = res.find(service => service.ServicepriceId === this.serviceId);
        this.model.Name = (this.model.Name) ? this.model.Name : '';
        this.model.Description = (this.model.Description) ? this.model.Description : '';
      },
          (err) => {},
          () => {
            this.commonService.listCurrency().subscribe(res => {
                this.listCreate[3].data = res.map(x => {
                    return {
                        Code: x.Code,
                        Name: x.Code,
                        value: x.CurrencyId
                    };
                });
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
            });
          }
      );
    }
    handleEventDetail = (value) => {
        switch (value.type) {
            case 'save':
                this.model.ServiceType = +value.data.ServiceType;
                this.model.CurrencyId = +value.data.CurrencyId;
                this.service.update(this.model.ServicepriceId, value.data).subscribe(res => {
                  this.route.navigateByUrl('/management/service/list');
                });
                break;
            case 'cancelDialog':
                break;
            default:
                break;
        }
        return value;
    };

}
@NgModule({
    declarations: [DetailServiceComponent],
    imports: [
        BaseModule,
        MenuHeaderModule
    ],
    providers: []
})

export class DetailServiceModule { }
