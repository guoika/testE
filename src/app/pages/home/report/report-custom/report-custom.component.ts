import { Component, Inject, Input, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragRelease, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReportService } from 'src/app/services/report.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-report-custom',
  templateUrl: './report-custom.component.html',
  styleUrls: ['./report-custom.component.scss']
})
export class ReportCustomComponent implements OnInit {
  listForm = [];
  listFormChange = {};
  ProviderId
  checkActive: number;
  check = true
  listFormItem: any;
  constructor(
    private reportService: ReportService,
    public dialogRef: MatDialogRef<ReportCustomComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private loadService: LoaderService
  ) { }

  ngOnInit(): void {
    this.ProviderId = localStorage.getItem('ProviderId')
    this.getFormReport();

  }
  clickActive(item) {
    const index = this.listForm.map(x => x.SequenceNumber).indexOf(item.SequenceNumber);
    console.log(index);
    this.listForm[index].SequenceNumber = null;
  }
  clickNotActive(item) {
    const index = this.listForm.map(x => x.SequenceNumber).indexOf(item.SequenceNumber);
    this.listForm[index].SequenceNumber = index;
  }
  getFormReport() {
    this.loadService.show();
    this.reportService.getFormReport(this.ProviderId).subscribe(res => {
      this.listForm = res.sort((a, b) => a.SequenceNumber - b.SequenceNumber
      );
      this.loadService.hide();
    })
  }
  updateCustomReport(type) {
    if (type === 'save') {
      this.reportService.createFormReport({
        'ProviderId': this.ProviderId,
        'ListProviderReportForm': this.listForm
      }).subscribe(res => {
        this.closeDialog()

      })
    } else if (type === 'cancel') {
      this.closeDialog()
    }

  }
  closeDialog() {
    this.dialogRef.close({ event: 'save' });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listForm, event.previousIndex, event.currentIndex);
    this.listForm = this.listForm.map((x, index) => {
      return {
        SequenceNumber: index,
        ReportColumnId: x.ReportColumnId,
        ColumnName: x.ColumnName
      }
    });
  }

}
