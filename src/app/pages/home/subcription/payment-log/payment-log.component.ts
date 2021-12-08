import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-payment-log',
  templateUrl: './payment-log.component.html',
  styleUrls: ['./payment-log.component.scss']
})
export class PaymentLogComponent implements OnInit {

  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentLogComponent>) { }
  dataSource: any;
  history: any;
  displayedColumns: string[] = [
    'Date',
    'Description',
    'Period',
    'Price'
  ];
  title = 'Payment History';
  configData = [
    {
        name: 'Date',
        condition: 'CreatedDate',
        type: 'date2',
        width: '15%'
    },
    {
        name: 'Description',
        condition: 'Description',
        type: 'string',
        width: '35%'
    },
    {
        name: 'Period',
        condition: 'Period',
        type: 'string',
        width: '35%'
    },
    {
        name: 'Price',
        condition: 'Amount',
        type: 'string',
        width: '15%'
    }
  ];
  dataSub;
  ngOnInit(): void {
    console.log(this.data);
    this.dataSub = this.data;
    // this.dataSource = new MatTableDataSource(this.data);
    this.getHistory(this.data.PrescriptionDrugId);
  }
  callbackFromTable(data): void {
    if (data.type === 'close') {
      this.dialogRef.close();
    }
  }
  getHistory(prescriptionDrugId): void {
    // this.prescriptionService
    //   .historyPrescriptionDrug(prescriptionDrugId)
    //   .subscribe((res) => {
    //     this.history = res;
    //     console.log(this.history);
    //     this.dataSource = new MatTableDataSource(this.history);
    //     // this.dataSource.paginator = this.paginator;
    //   });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
