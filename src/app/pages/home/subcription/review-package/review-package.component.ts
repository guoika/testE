import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { ChangeMethodComponent } from '../change-method/change-method.component';

@Component({
  selector: 'app-review-package',
  templateUrl: './review-package.component.html',
  styleUrls: ['./review-package.component.scss']
})
export class ReviewPackageComponent implements OnInit, OnChanges {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: CompanyService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReviewPackageComponent>) {
    this.payForm = this.fb.group({
      NumberOfAccount: ['', Validators.required]
    });
  }
  button: any = {
    listUpdate: { cancel: true, confirm: true },
    listChange: { change: true },

  };
  totalAmount = 0;
  payForm: FormGroup;
  pay: any = {};
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.Payments && this.data.Payments.length !== 0) {
      this.pay = this.data.Payments.find(x => x.defaultMethod === 'yes');
    }
  }
  ngOnInit(): void {
    if (this.data.Payments && this.data.Payments.length !== 0) {
      this.pay = this.data.Payments.find(x => x.defaultMethod === 'yes');
    }
    this.payForm.controls.NumberOfAccount.setValue(this.data.AvailableAccount);
    this.totalAmount = this.data.AvailableAccount * 19.59;
  }
  check(data): void {
    console.log(data);
    this.totalAmount = data * 19.59;

  }
  openChangeDialog(): void {
    let peyments = [];
    if (this.data.Payments && this.data.Payments.length !== 0) {
      // peyments = this.data.Payments;
      peyments = this.data.Payments.filter(x => x.Id !== this.pay.Id);
    }
    const dialogChildRef = this.dialog.open(ChangeMethodComponent, {
      width: '700px',
      height: '500px',
      panelClass: 'dialog-60-97', disableClose: true,
      data: peyments,
    });
    dialogChildRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pay = result;
      }
    });
  }
  // tslint:disable-next-line:typedef
  callBack(type: string) {
    console.log(type);
    switch (type) {
      case 'cancel':
        this.dialogRef.close();
        break;
      case 'confirm':
        this.service.payWithMethod(this.pay.Id, this.payForm.value.NumberOfAccount).subscribe(res => {
          console.log(res);
          this.dialogRef.close(res);
        });
        this.dialogRef.close();
        break;
      case 'change':
        this.openChangeDialog();
        break;
      default:
        break;
    }
  }

}
