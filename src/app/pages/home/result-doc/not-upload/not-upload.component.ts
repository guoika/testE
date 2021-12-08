import { Component, NgModule, OnInit } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ModalComponent } from 'src/app/base/modal/modal.component';


@Component({
  selector: 'app-not-upload',
  template: ` <app-menu-header [option]="option">
                </app-menu-header>
                <app-tab
                    [data]="data"
                   (tableCallBack)="addResult($event)"
                ></app-tab>`,
})
export class NotUploadComponent implements OnInit {
  option = {
    avatar: false,
    title: 'List of Result,Doc',
    search: false,
  };
  listImage = [{"id":"1","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/nsamoylov/128.jpg"},{"id":"2","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/emmeffess/128.jpg"},{"id":"3","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/falconerie/128.jpg"},{"id":"4","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/brenton_clarke/128.jpg"},{"id":"5","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/michaelcolenso/128.jpg"},{"id":"6","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/d_nny_m_cher/128.jpg"},{"id":"7","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/fjaguero/128.jpg"},{"id":"8","mediaURL":"https://s3.amazonaws.com/uifaces/faces/twitter/mikebeecham/128.jpg"}]
  data = [
    {
      type: 'table',
      label: 'Lab',
      config: [
        {
          condition: 'dateVisit',
          name: 'Proplem Name',
          type: 'date',
          width: '25%',
        },
        {
          condition: 'content',
          name: 'Category',
          type: 'text',
          width: '25%',
        },
        {
          condition: 'content',
          name: 'Test',
          type: 'text',
          width: '25%',
        },
        {
          condition: 'upload',
          name: '',
          type: 'upload',
          width: '25%',
        },
      ],
      data: [
        {
          dateVisit: new Date(),
          content: 'benh nan y, benh nan y, ...',
        },
        {
          dateVisit: new Date(),
          content: 'benh nan y, benh nan y, ...',
        },
        {
          dateVisit: new Date(),
          content: 'benh nan y, benh nan y, ...',
        },
      ],
    },
    {
      label: 'Biopsy',
    },
    {
      label: 'Functional',
    },
    {
      label: 'Imaging',
    },
    {
      type: 'table',
      label: 'Other Documents',
      config: [
        {
          condition: 'doc',
          name: 'Document',
          type: 'text',
          width: '60%',
        },
        {
          condition: 'type',
          name: 'Type',
          type: 'text',
          width: '20%',
        },
        {
          condition: 'upload',
          name: '',
          type: 'upload',
          width: '20%',
        },
      ],
      data: [
        {
          doc: 'Reference Document',
          type: 'PDF',
        },
        {
          doc: 'Reference Document',
          type: 'TEXT',
        },
      ],
    },
  ];
  configModal = {
    title: 'Add documents',
    config: [
      {
        condition: 'ProblemName',
        type: 'text',
        label: 'Problem Name',
      },
      {
        condition: 'Type',
        type: 'text',
        label: 'Type',
      },
      {
        condition: 'Test',
        type: 'text',
        label: 'Test',
      },
      {
        condition: 'file',
        type: 'file',
        label: 'File attached',
      },
    ],
  };
  dataModal = {
    ProblemName: 'Chest pain',
    Type: 'Lab Test',
    Test: 'RBC',
    file: [],
  };
  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  addResult(ev): void {
    console.log(123);
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '1000px',
      height: '700px',
      panelClass: 'custom-modalbox',
      data: {
        dataModal: this.dataModal,
        configModal: this.configModal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
@NgModule({
  declarations: [
      NotUploadComponent,
  ],
  imports: [
      BaseModule,
      MenuHeaderModule,
  ],
  providers: [MatDialogRef]
})
export class NotUploadModule { }
