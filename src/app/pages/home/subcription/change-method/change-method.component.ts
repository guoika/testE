import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-change-method',
  templateUrl: './change-method.component.html',
  styleUrls: ['./change-method.component.scss']
})
export class ChangeMethodComponent implements OnInit {

  constructor(
    private service: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangeMethodComponent>
  ) { }
  button: any = {
    listUpdate: { cancel: true },
    listChange: { choose: true },

  };
  paymentMethod = [];
  ngOnInit(): void {
    this.paymentMethod = this.data;
  }
  callBack(type): void {
    if (type === 'cancel') {
      this.dialogRef.close();
    }
  }
  chooseItem(item): void {
    this.dialogRef.close(item);
  }

}
