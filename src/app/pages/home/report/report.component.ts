import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';
import { ReportService } from 'src/app/services/report.service';
import { FormatDateService } from 'src/app/utils/pipes/format-date.service';
import { ReportCustomComponent } from './report-custom/report-custom.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  option = {
    avatar: true,
    title: 'List of Clients',
    search: false,
    col: 'col-6'
  };

  data = [];
  // config = [
  //   { 'ColumnName': 'DOB' },
  //   { 'ColumnName': 'Email' },
  //   { 'ColumnName': 'FullName' },
  //   { 'ColumnName': 'Gender' },
  //   { 'ColumnName': 'Phone' },
  //   { 'ColumnName': 'Problems' },
  //   { 'ColumnName': 'VisitDate' },
  // ]
  startDate = new Date();
  toDate = new Date();
  ProviderId;
  configData;
  showAll = false;
  constructor(
    public dialog: MatDialog,
    private reportService: ReportService,
    private dateSerive: FormatDateService
  ) { }
  ngOnInit(): void {
    this.ProviderId = localStorage.getItem('ProviderId');
    this.getFormReport();
    this.getReport();
  }
  getFormReport(): void {
    this.reportService.getFormReport(this.ProviderId).subscribe(res => {
      this.configData = res.map(x => {
        const separateWord = x.ColumnName.toLowerCase().split(' ');
        for (let i = 0; i < separateWord.length; i++) {
          separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
            separateWord[i].substring(1);
        }
        let condition = separateWord.join(' ').replace(' ', '');
        if (x.ColumnName === 'DOB') {
          condition = 'DOB';
        }
        return {
          name: x.ColumnName,
          condition: condition.replace(' ', ''),
          type: 'string',
          SequenceNumber: x.SequenceNumber
        };
      }).filter(x => x.SequenceNumber != null);
      console.log(this.configData);
    });
  }
  getReport(): void {
    let sDate = this.dateSerive.formatDate(this.startDate, 'yyyy-MM-DD');
    const toDate = new Date(this.toDate.getFullYear(), this.toDate.getMonth() + 1, 1);
    let tDate = this.dateSerive.formatDate(toDate, 'yyyy-MM-DD');
    if (this.showAll !== true) {
      tDate = sDate = '';
    }
    this.reportService.getReport(sDate, tDate).subscribe(res => {
      this.data = res;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ReportCustomComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'save') {
        this.getFormReport();
        this.getReport();
      }
    });
  }


  nextFromDate(): void {
    if (this.startDate.getFullYear() === this.toDate.getFullYear() && this.startDate.getMonth() === this.toDate.getMonth()) {
    } else {
      this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);
    }
  }
  backFromDate(): void {
    this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1, 1);
  }
  nextToDate(): void {
    this.toDate = new Date(this.toDate.getFullYear(), this.toDate.getMonth() + 1, 1);
  }
  backToDate(): void {
    if (this.startDate.getFullYear() === this.toDate.getFullYear() && this.startDate.getMonth() === this.toDate.getMonth()) {
    } else {
      this.toDate = new Date(this.toDate.getFullYear(), this.toDate.getMonth() - 1, 1);
    }
  }
}
