import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { SwalService } from 'src/app/services/swal.service';
import { TestService } from 'src/app/services/test.service';
import { DetailServiceComponent } from '../services/detail-services.component';

@Component({
  selector: 'app-detail-test',
  template: ` <app-detail
    [isService]="true"
    [data]="listCreate"
    [dataModel]="model"
    [option]="option"
    [button]="btnConfig"
    (callback)="handleEventDetail($event)"
  ></app-detail>`,
})
export class DetailTestComponent implements OnInit {
  option = {
    avatar: false,
    title: 'Edit Test',
    search: false,
    col: 'col-12',
  };
  listCreate = [
    {
      id: 'Name',
      label: 'TestName',
      name: 'test',
      type: 'text',
    },
  ];
  model: any = {};
  btnConfig: any = {
    isEventUpdate: false,
    listUpdate: { cancel: true, save: true },
    listNoUpdate: { cancelDialog: true, save: true },
  };
  constructor(
    private service: TestService,
    private swal: SwalService,
    public dialogRef: MatDialogRef<DetailServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.model = this.data;
    console.log(this.model);
  }

  handleEventDetail = (value) => {
    switch (value.type) {
      case 'save':
        // this.swal.success('Update success');
        this.dialogRef.close();
        break;
      case 'cancelDialog':
        this.dialogRef.close();
        break;
      default:
        break;
    }
    return value;
  };
}
@NgModule({
  declarations: [DetailTestComponent],
  imports: [BaseModule, MenuHeaderModule],
  providers: [],
})
export class DetailServiceModule {}
