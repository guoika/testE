import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { EmployeeModel } from 'src/app/models/home/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { SwalService } from 'src/app/services/swal.service';
import { CommonService } from 'src/app/utils/pipes/common.service';

@Component({
    selector: 'app-add-update-employee',
    template: ` <app-menu-header [option]="optionHeader">
                </app-menu-header>
                <app-detail
                    [data]="listCreate"
                    [dataModel]="model"
                    [option]="option"
                    [configCss]="configCss"
                    (callback)="handleEventDetail($event)"
                    [button]="btnConfig"
                >
                <hr style="border-top: 1px solid #707070;
                  width: 100%;
                  margin: 14px 14px;"/>
                    <app-detail
                        [dataModel]="model"
                        [data]="createEmercy"
                        [configCss]="configCssChild"
                        [option]="optionChild"
                        [button]="btnConfig2"
                    ></app-detail>
                    <hr style="border-top: 1px solid #707070;
                  width: 100%;
                  margin: 14px 14px;"/>
                    <app-detail
                        [data]="createRole"
                        [dataModel]="model"
                        [configCss]="configCssChild"
                        [option]="optionChild2"
                        [(button)]="btnConfig2"
                        ></app-detail>
                </app-detail>
                 `
})
export class AddUpdateEmployeeComponent implements OnInit {
    optionHeader = {
        avatar: true,
        title: 'Add New Employees',
        search: false
    };
    option = {
        avatar: true,
        title: 'Personal Information.',
        search: false,
        col: 'col-6'
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
    btnConfig2 = {
      isEventUpdate: true,
    };
    config = new EmployeeModel();
    model: any = {
        MediaURL: 'assets/svg/logo-big.svg',
    };
    configCss: any = {
        height: 'calc(100vh - 210px)',
        css: 'insideShadow can-scroll'
    };
    configCssChild: any = {
      css: 'child'
    };
    btnConfig: any = {
        isEventUpdate: true,
        listUpdate: { save: true, cancel: true }
    };
    listCreate = [];
    createEmercy = [];
    createRole = [];
    constructor(
        private service: EmployeeService,
        private commonService: CommonService,
        private route: Router,
        private swal: SwalService
    ) { }

    ngOnInit(): void {
        this.listCreate = this.config.createPersonal;
        this.createEmercy = this.config.createEmergency;
        this.createRole = this.config.createRole;
        this.listCreate[2].data = [
            { Name: 'Female', value: 1 },
            { Name: 'Male', value: 2 }
        ];
        this.service.listPosition().subscribe(res => {
            // this.listCreate[5].data = res.map(x => {
            //     return {
            //         Description: x.Description,
            //         Name: x.Name,
            //         PositionId: x.PositionId,
            //         value: x.PositionId
            //     };
            // });
            this.createRole[0].data = res.map(x => {
              return {
                Description: x.Description,
                Name: x.Name,
                PositionId: x.PositionId,
                value: x.PositionId
              };
            });
        });
        this.commonService.listLanguage().subscribe(res => {
            this.listCreate[11].data = res.map(x => {
                return {
                    LanguageId: x.LanguageId,
                    Name: x.Name,
                    value: x.LanguageId
                };
            });
        });
    }


    handleEventDetail = (value) => {
        if (value.type === 'cancel') {
          this.route.navigateByUrl('employee/list');
        } else {
          if (!value.data.Password || value.data.Password === '') {
            value.data.Password = '123456';
          }
          value.data.ConfirmPassword = value.data.Password;
          if (!value.data.Email) {
            console.log('The Email field is required.');
            // return this.swal.error('The Email field is required.');
          } else {
            console.log(value.data);
            this.service.create(value.data).subscribe(res => {
              // this.swal.success('Create success');
              this.btnConfig.isEventUpdate = false;
              this.btnConfig2.isEventUpdate = false;
              this.route.navigateByUrl('employee/list');
            }, (err) => {
              console.log(err.error.Message);
              // this.swal.error(err.error.Message);
            }, () => {
                console.log('final');
            });
          }
        }
    }



}
@NgModule({
    declarations: [
        AddUpdateEmployeeComponent,
    ],
    imports: [
        BaseModule,
        MenuHeaderModule
    ]
})
export class AddUpdateEmployeeModule { }
