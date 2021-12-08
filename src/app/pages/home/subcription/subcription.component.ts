import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/models/home/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { SwalService } from 'src/app/services/swal.service';
import { AddMethodComponent } from './add-method/add-method.component';
import { PaymentLogComponent } from './payment-log/payment-log.component';
import { ReviewPackageComponent } from './review-package/review-package.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subcription',
  templateUrl: './subcription.component.html',
  styleUrls: ['./subcription.component.scss']
})
export class SubcriptionComponent implements OnInit {

  model: any = {};
  lstSub = [];
  config = new CompanyModel();
  pipe = new DatePipe('en-US');
  option = {
    avatar: true,
    titles: ['Company Information', 'Package Information', 'Payment method'],
    search: false,
    col: 'col-5 col-5c'
  };
  listCreate = [];
  btnConfig: any = {
    isEventUpdate: false,
    listUpdate: { cancel: true, save: true },
    listNoUpdate: { edit2: true },
    listRenew: { renew: true, },
    listPayment: { history: true, method: true },
    listDefault: { setDefault: true }
  };
  configCss: any = {
    height: 'calc(100% - 430px)',
    isShowPayment: true,
    css: 'insideShadow  he-200'
  };
  subscription: Subscription;

  constructor(
    private service: CompanyService,
    private sendDataService: SendDataService,
    public dialog: MatDialog,
    private swal: SwalService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.config.create;
    this.getSubcription();
    this.getCompanyPaymentmethod();
    // this.getPaymentUrl();
  }
  getCompanyPaymentmethod(): void {
    this.service.getCompanyPaymentMethods().subscribe(res => {
      if (res && res.length  !== 0) {
        const first = res.find(x => x.defaultMethod === 'yes');
        const last = res.filter(x => x.defaultMethod !== 'yes');
        last.unshift(first);
        this.model.lstPayment = last;
      } else {
        this.model.lstPayment = res;
      }
    });
  }
  getSubcription(): void {
    this.service.getSubcription().subscribe(res => {
      this.model.lstSub = res;
      console.log(res);

    });
  }
  getCompanyPaymentLogs(): void {
    this.service.getCompanyPaymentLogs().subscribe(res => {
      if (res) {
        res.forEach(element => {
          element.Period = this.pipe.transform(element.ValidDate, 'dd/MM/yyyy') + ' - '
            + this.pipe.transform(element.ExpiredDate, 'dd/MM/yyyy');
        });
      }
      this.openDetailDialog(res);
    });
  }
  getPaymentUrl(): void {
    this.service.getPaymentPaypalURL(30).subscribe(res => {
      // this.model = res;


    });
  }
  openDetailDialog(lisData): void {
    const dialogRef = this.dialog.open(PaymentLogComponent, {
      width: '900px',
      height: '600px',
      panelClass: 'dialog-60-97', disableClose: true,
      data: lisData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result === true) {
      //   this.getPrescriptionByPatient();
      // }
    });
  }
  showRenew(item): void {
    // let dataPay = {};
    // if (this.model.lstPayment && this.model.lstPayment.length !== 0) {
    //   dataPay = this.model.lstPayment.find(x => x.defaultMethod ===  'yes'); Please add a payment method first
    // }
    if (this.model.lstPayment && this.model.lstPayment.length !== 0) {
      const dialogRef = this.dialog.open(ReviewPackageComponent, {
        width: '700px',
        height: '500px',
        panelClass: 'dialog-60-97', disableClose: true,
        data: {
          AvailableAccount: item.AvailableAccount,
          Payments: this.model.lstPayment
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.getSubcription();
        }
      });

    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          cancelButton: 'ci-button-cancel-swal'
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        // title: `Are you sure you want to delete?`,
        text: `Please add a payment method first.`,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'OK',
        confirmButtonText: '',
        reverseButtons: false,
        background: '#F2F2F2'
      }).then((result) => {
        // if (result.isConfirmed) {
        //   this.service.deleteCompanyPaymentMethod(item.Id).subscribe(res => {
        //     console.log(res);
        //     this.getCompanyPaymentmethod();
        //   });
        // }
      });
    }

  }
  addMethod(): void {
    const dialogRef = this.dialog.open(AddMethodComponent, {
      width: '900px',
      height: '400px',
      panelClass: 'dialog-60-97', disableClose: true,
      // data: lisData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result === true) {
      //   this.getPrescriptionByPatient();
      // }
    });
  }
  deleteMethod(item): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'ci-button-confirm-swal',
        cancelButton: 'ci-button-cancel-swal'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      // title: `Are you sure you want to delete?`,
      text: `Are you sure you want to delete?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'OK',
      reverseButtons: true,
      background: '#F2F2F2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCompanyPaymentMethod(item.Id).subscribe(res => {
          console.log(res);
          this.getCompanyPaymentmethod();
        });
      }
    });
  }
  setDefaultMethod(value): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'ci-button-confirm-swal',
        cancelButton: 'ci-button-cancel-swal'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      // title: `Are you sure you want to delete?`,
      text: `Are you sure you want to set this as your
      default payment method?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'OK',
      reverseButtons: true,
      background: '#F2F2F2'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.setDefaultCompanyPaymentMethod(value.Id).subscribe(res => {
          console.log(res);
          this.getCompanyPaymentmethod();
        });
      }
    });
  }
  handleCallback = (value) => {
    switch (value.type) {
      case 'history':
        this.getCompanyPaymentLogs();
        break;
      case 'renew':
        this.showRenew(value.item);
        break;
      case 'method':
        this.addMethod();
        break;
      case 'delete':
        console.log(value.item);
        this.deleteMethod(value.item);
        break;
      case 'setDefault':
        console.log(value.item);
        this.setDefaultMethod(value.item);
        break;
      default:
        break;
    }
    if (value.type === 'history') {
      // this.service.update(value.data.CompanyId, value.data).subscribe(res => {
      //   this.btnConfig.isEventUpdate = false;
      //   this.sendDataService.changeData('company');
      // });
    }
  }

}
