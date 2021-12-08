import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { EmployeeModel } from 'src/app/models/home/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SwalService } from 'src/app/services/swal.service';
import { CommonService } from 'src/app/utils/pipes/common.service';
import { FormatDateService } from 'src/app/utils/pipes/format-date.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-detail-employee',
    template: ` <app-menu-header
                    [option]="optionHeader"
                >
                </app-menu-header>
                <app-detail
                    [data]="listInfor"
                    [dataModel]="model"
                    [option]="option"
                    (callback)="handleEventDetail($event)"
                    [(button)]="btnConfig"
                    [configCss]="configCss"
                >
                <hr style="border-top: 1px solid #707070;
                  width: 100%;
                  margin: 14px 14px;"/>
                <app-detail
                    [data]="createEmercy"
                    [dataModel]="model"
                    [configCss]="configCssChild"
                    [option]="optionChild"
                    [(button)]="btnConfig2"
                    ></app-detail>
                <hr style="border-top: 1px solid #707070;
                  width: 100%;
                  margin: 14px 14px;"/>
                <app-detail
                    [data]="updateRole"
                    [dataModel]="model"
                    [configCss]="configCssChild"
                    [option]="optionChild2"
                    [(button)]="btnConfig2"
                    ></app-detail>
                </app-detail>`
})
export class DetailEmployeeComponent implements OnInit {
    btnConfig: any = {
        isEventUpdate: false,
        listUpdate: { cancel: true, save: true },
        listNoUpdate: { edit: true, resign: true }
    };
    optionHeader = {
        avatar: true,
        title: 'Edit Employees Info',
        search: false
    };
    option = {
        avatar: true,
        title: 'Personal Information.',
        search: false,
        col: 'col-6'
    };
    configCssChild: any = {
      css: 'child'
    };
    optionChild = {
      avatar: false,
      title: 'Emergency contact',
      search: false,
      col: 'col-6'
  };
  optionChild2 = {
    avatar: false,
    title: 'Account info',
    search: false,
    col: 'col-6'
};
    configCss: any = {
        height: 'calc(100vh - 210px)',
        css: 'insideShadow can-scroll'
    };
    btnConfig2 = {
      isEventUpdate: false
    };
    config = new EmployeeModel();
    model: any = {};
    listInfor = [];
    createEmercy = [];
    updateRole = [];
    constructor(
        private route: ActivatedRoute,
        private service: EmployeeService,
        private dateSerive: FormatDateService,
        private commonService: CommonService,
        private loadService: LoaderService,
        private router: Router,
        private swal: SwalService
    ) { }

    ngOnInit(): void {
        this.loadService.show();
        this.listInfor = this.config.createPersonal;
        this.createEmercy = this.config.createEmergency;
        this.updateRole = this.config.updateRole;
        this.service.listPosition().subscribe(res => {
            // this.listInfor[5].data = res.map(x => {
            //     return {
            //         Description: x.Description,
            //         Name: x.Name,
            //         PositionId: x.PositionId,
            //         value: x.PositionId
            //     };
            // });
            this.updateRole[0].data = res.map(x => {
              return {
                Description: x.Description,
                Name: x.Name,
                PositionId: x.PositionId,
                value: x.PositionId
              };
            });
        });
        const id = this.route.snapshot.params.id;
        this.listInfor[2].data = [
            { Name: 'Female', value: 1 },
            { Name: 'Male', value: 2 }
        ];
        this.commonService.listLanguage().subscribe(res => {
            this.listInfor[11].data = res.map(x => {
                return {
                    LanguageId: x.LanguageId,
                    Name: x.Name,
                    value: x.LanguageId
                };
            });
        });
        this.service.detail(id).subscribe(res => {
            this.model = res;
            if (this.model.Status === 2) {
              this.btnConfig.listNoUpdate = { edit: true, active: true };
            }
            this.model.DOB = this.model.DOB ? this.dateSerive.formatDate(this.model.DOB, 'yyyy-MM-DD') : null;
        }, () => {

        }, () => {
            this.loadService.hide();
        });
    }
    handleEventDetail = (value) => {
        console.log(value, 1);
        switch (value.type) {
            case 'resign':
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'ci-button-confirm-swal',
                        cancelButton: 'ci-button-cancel-swal'
                    },
                    buttonsStyling: false
                });
                swalWithBootstrapButtons.fire({
                    title: `Are you sure you want to proceed?`,
                    text: `This employee will no longer
                    be able to login and use system's feature.`,
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'OK',
                    reverseButtons: true,
                    background: '#F2F2F2'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.service.delete(value.data.ProviderId).subscribe(res => {
                            // this.swal.success('Resign success');
                            this.router.navigateByUrl('employee/list');
                        });
                    }
                });
                break;
            case 'active':
              const swalWithBootstrapButtonsActivee = Swal.mixin({
                  customClass: {
                      confirmButton: 'ci-button-confirm-swal',
                      cancelButton: 'ci-button-cancel-swal'
                  },
                  buttonsStyling: false
              });
              swalWithBootstrapButtonsActivee.fire({
                  // title: `Are you sure you want to proceed?`,
                  text: `Are you sure you want to active?`,
                  showCancelButton: true,
                  cancelButtonText: 'Cancel',
                  confirmButtonText: 'OK',
                  reverseButtons: true,
                  background: '#F2F2F2'
              }).then((result) => {
                  if (result.isConfirmed) {
                      value.data.Status = 1;
                      this.service.update(value.data.ProviderId, value.data).subscribe(res => {
                        this.router.navigateByUrl('employee/list');
                      });
                  }
              });
              break;
            case 'save':
                console.log(value.data);
                this.service.update(value.data.ProviderId, value.data).subscribe(res => {
                    // this.swal.success('Update success');
                    this.btnConfig.isEventUpdate = false;
                    this.btnConfig2.isEventUpdate = false;
                });
                break;
            case 'edit':
                this.btnConfig2.isEventUpdate = true;
                break;
            case 'cancel':
                this.btnConfig2.isEventUpdate = false;
                break;
            default:
                break;
        }
    }
}

@NgModule({
    declarations: [
        DetailEmployeeComponent,
    ],
    imports: [
        BaseModule,
        MenuHeaderModule
    ]
})
export class DetailEmployeeModule { }
