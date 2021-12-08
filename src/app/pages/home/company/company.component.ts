import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/models/home/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  model: any = {};
  config = new CompanyModel();
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
    listNoUpdate: { edit2: true},
    listRenew: { renew: true, },
    listPayment: { history: true,  method: true}
  };
  configCss: any = {
    height: 'calc(100vh - 210px)',
    isShowPayment: false,
    css: 'insideShadow'
  };
  subscription: Subscription;

  constructor(
    private service: CompanyService,
    private sendDataService: SendDataService,
    private swal: SwalService
  ) { }

  ngOnInit(): void {
    this.listCreate = this.config.create;
    this.getCompany(false);
  }
  getCompany(check): void {
    this.service.detail().subscribe(res => {
      this.model = res;
      if (check === true) {
        console.log(JSON.stringify(this.model));
        this.sendDataService.changeData(JSON.stringify(this.model));
      }
    });
  }
  handleCallback = (value) => {
    if (value.type === 'save') {
      console.log(value);
      this.service.update(value.data.CompanyId, value.data).subscribe(res => {
        // this.swal.success('Update success');
        this.btnConfig.isEventUpdate = false;
        this.getCompany(true);
      });
    } else if (value.type === 'edit') {
      this.btnConfig.isEventUpdate = true;
    }
  }

}
