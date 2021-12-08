import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { LoaderService } from 'src/app/services/loader.service';
import { MedicationService } from 'src/app/services/medication.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-list-medication',
    template: ` <app-menu-header [option]="option" (callback)="handleChangeValueSearch($event)">
                    </app-menu-header>
                    <app-table
                        [data]="data"
                        [config]="configData"
                        (callback)="callbackFromTable($event)"
                    ></app-table>
                    <app-button
                    class="add"
                    [buttonType]="{add:true}"
                    (callback)="linkToAdd($event)"
                ></app-button>`
})
export class ListMedicationComponent implements OnInit {
    searchList = [];
    configData = [
      {
          name: 'Name',
          condition: 'Name',
          type: 'string',
      },
      {
        name: 'MediaURL',
        condition: 'MediaURL',
        type: 'image',
      },
      {
          name: 'UnitName',
          condition: 'UnitName',
          type: 'string',
      },
      {
          name: 'Price',
          condition: 'Price',
          type: 'number',
      },
      {
          name: 'Currency',
          condition: 'CurrencyCode',
          type: 'string',
      },
      {
          name: '',
          condition: '',
          type: 'setting',
      },
    ];
    data: any = [];
    // option = {
    //     avatar: true,
    //     title: 'List Medication',
    //     search: true
    // }
    option = {
      avatar: false,
      title: 'List Medication',
      search: false,
      col: 'col-12'
    };
    btnConfig: any = {
      isEventUpdate: false,
      listUpdate: { cancel: true, save: true },
      listNoUpdate: { cancelDialog: true, save: true }
    };
    constructor(
        private service: MedicationService,
        private router: Router,
        private loadingService: LoaderService,
        private swal: SwalService
    ) { }

    ngOnInit(): void {
        this.loadingService.show();
        this.service.list().subscribe(res => {
            this.searchList = res.map(x => {
                return {
                    DrugId: x.DrugId,
                    Name: x.Name,
                    UnitName: x.UnitName || 'uống',
                    Price: x.Price || 0,
                    CurrencyCode: x.CurrencyCode || '',
                    MediaURL: x.MediaURL || '',
                    fullText: x.Name || '',
                    DefaultIMG: 'assets/svg/default-medication.png'
                };
            });
            this.data = this.searchList;
            this.loadingService.hide();
        });
    }
    callbackFromTable(data): void {
      console.log(data);
      if (data.type === 'edit') {
        this.handleEventListBase(data.data);
      } else if (data.type === 'delete') {
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
                this.service.delete(data.data.DrugId).subscribe(res => {
                    // // this.swal.success('Delete success');
                    this.ngOnInit();
                });
            }
        });
      }

    }
    handleChangeValueSearch = (keyword) => {
        this.searchList = this.data.filter(item => {
            return item.fullText.toLowerCase().includes(keyword.trim().toLocaleLowerCase());
        });
    }

    handleEventListBase = (value) => {
        console.log(value);
        this.router.navigateByUrl(`management/medication/${value.DrugId}`);
    }

    linkToAdd = ($event) => {
        this.router.navigateByUrl('management/medication/create');
    }
}


@NgModule({
    declarations: [ListMedicationComponent],
    imports: [BaseModule, MenuHeaderModule],
    providers: []
})

export class ListMedicationModule { }
