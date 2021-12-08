import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { MedicationModel } from 'src/app/models/home/medication.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MedicationService } from 'src/app/services/medication.service';
import { SwalService } from 'src/app/services/swal.service';
import { CommonService } from 'src/app/utils/pipes/common.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detail-medication',
    template: `<app-menu-header
                    [option]="optionHeader"
                >
                </app-menu-header>
                <app-detail
                    [data]="listCreate"
                    [dataModel]="model"
                    [option]="option"
                    (callback)="handleEventDetail($event)"
                    [button]="btnConfig"
                ></app-detail>`
})
export class DetailMedicationComponent implements OnInit {
    option = {
        avatar: true,
        search: false,
        col: 'col-6'
    };
    optionHeader = {
      title: 'Detail Medication',
    };
    config = new MedicationModel();
    listCreate = [];
    model: any = {};
    btnConfig: any = {
        isEventUpdate: false,
        listUpdate: { cancel: true, save: true },
        listNoUpdate: { edit: true }
    };

    constructor(
        private service: MedicationService,
        private router: ActivatedRoute,
        private commonService: CommonService,
        private loadService: LoaderService,
        private route: Router,
        private swal: SwalService
    ) { }

    ngOnInit() {
        this.loadService.show();
        this.listCreate = this.config.create;
        this.model.DrugId = this.router.snapshot.params.id;
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
        this.service.detail(this.model.DrugId).subscribe(res => {
            this.model = res;
            this.model.MediaURL = res.MediaURL;
            this.model.DefaultIMG = 'assets/svg/default-medication.png'
        },
            () => { this.loadService.hide(); },
            () => {
                this.loadService.hide();
            })

    }

    handleEventDetail = (value) => {
        switch (value.type) {
            case 'save':
                this.service.update(value.data.DrugId, value.data).subscribe(res => {
                    // this.swal.success('Update success');
                    this.route.navigateByUrl('/management/medication/list');
                });
                break;
            case 'delete':
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'ci-button-confirm-swal',
                        cancelButton: 'ci-button-cancel-swal'
                    },
                    buttonsStyling: false
                });
                swalWithBootstrapButtons.fire({
                    title: `Are you sure you want to delete?`,
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'OK',
                    reverseButtons: true,
                    background: '#F2F2F2'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.service.delete(value.data.DrugId).subscribe(res => {
                            // this.swal.success('Delete success');
                            this.route.navigateByUrl('/management/medication/list');
                        })
                    }
                });
                break;
                break;
            default:
                break;
        }
    };

}
@NgModule({
    declarations: [DetailMedicationComponent],
    imports: [
        BaseModule,
        MenuHeaderModule
    ],
    providers: []
})

export class DetailMedicationModule { }
