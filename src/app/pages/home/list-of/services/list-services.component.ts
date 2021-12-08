import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { LoaderService } from 'src/app/services/loader.service';
import { ServicepriceService } from 'src/app/services/serviceprice.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2';
import { DetailServiceComponent } from './detail-services.component';

@Component({
    selector: 'app-list-service',
    template: `   <app-menu-header [option]="option" (callback)="handleChangeValueSearch($event)">
                </app-menu-header>
                <app-table
                    [data]="dataSub"
                    [config]="configData"
                    (callback)="callbackFromTable($event)"
                ></app-table>
                <app-button
                class="add"
                [buttonType]="{add:true}"
                (callback)="linkToAdd($event)"
            ></app-button>
                `
})
export class ListServiceComponent implements OnInit {
    configData = [
        {
            name: 'Service',
            condition: 'Name',
            type: 'string',
        },
        {
            name: 'Category',
            condition: 'ServiceTypeString',
            type: 'string',
        },
        {
            name: 'Description',
            condition: 'Description',
            type: 'string',
        },
        {
            name: 'Currency',
            condition: 'CurrencyCode',
            type: 'string',
        },
        {
            name: 'Price',
            condition: 'Price',
            type: 'number',
        },
        {
          name: 'TaxRate',
          condition: 'TaxRate',
          type: 'string',
        },
        {
            name: '',
            condition: '',
            type: 'setting',
        },
    ];
    data: any = [];
    option = {
        avatar: false,
        title: 'List Service',
        search: true,
    };
    dataSub: any[];

    constructor(
        private loadingService: LoaderService,
        private service: ServicepriceService,
        public dialog: MatDialog,
        private router: Router,
        private swal: SwalService
    ) { }

    ngOnInit() {
        this.loadingService.show();
        this.getListServicePrice();

    }
    getListServicePrice() {
        this.service.list().subscribe((res) => {
            this.data = res;
            this.data.forEach(x => {
                x.Name = x.Name || '',
                    x.Description = x.Description || ''
            });
            this.dataSub = this.data;
        },
            (err) => {
                this.loadingService.hide();
            },
            () => {
                this.loadingService.hide();
            }
        );
    }
    handleChangeValueSearch = (keyword) => {
        if (keyword) {
            this.dataSub = this.data;
        }
        else {
        }
        this.dataSub = this.data.filter((item: any) => item.Name.toLowerCase().includes(keyword.trim().toLocaleLowerCase()))
    }
    linkToAdd($event){
        this.router.navigateByUrl('management/service/create')
    }
    callbackFromTable = (event) => {
        console.log(event);

        switch (event.type) {
            case 'edit':
                this.router.navigateByUrl(`management/service/${event.data.ServicepriceId}`);
                // this.dialog.open(DetailServiceComponent, {
                //     width: '1000px',
                //     height: '460px',
                //     panelClass: 'custom-modalbox',
                //     data: event.data,
                // }).afterClosed().subscribe(result => {
                //     this.ngOnInit();
                // });
                break;
            case 'delete': {
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
                        this.service.delete(event.data.ServicepriceId).subscribe(res => {
                            // this.swal.success('Delete success');
                            this.getListServicePrice();
                        });
                    }
                });

            }

            default:
                break;
        }
    };
}

@NgModule({
    declarations: [ListServiceComponent],
    imports: [BaseModule, MenuHeaderModule, MatDialogModule],
    providers: [],
})
export class ListServiceModule { }
