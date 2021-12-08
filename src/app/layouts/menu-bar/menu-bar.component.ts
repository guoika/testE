import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { SendDataService } from 'src/app/services/send-data.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  listNav = [
    {
      icon: 'assets/svg/Company.svg',
      name: 'Company',
      router: '/company'
    },
    {
      icon: 'assets/svg/Subcription.svg',
      name: 'Subscription',
      router: '/subscription'
    },
    {
      icon: 'assets/svg/Employee.svg',
      name: 'Employee',
      router: '/employee'
    },
    {
      icon: 'assets/svg/Lists.svg',
      name: 'Lists',
      router: '/management'
    },
    {
      icon: 'assets/svg/report.svg',
      name: 'Report',
      router: '/report'
    }
  ];
  subscription: Subscription;
  constructor(
    private service: CompanyService,
    private sendDataService: SendDataService,
  ) { }

  companyDetal: any;
  ngOnInit(): void {
    this.subscription = this.sendDataService.currentMessage.subscribe(data => {
      if (data && data !== 'default message') {
        console.log(data);

        this.companyDetal = JSON.parse(data);
        // this.getCompany();
      }
    });
    this.getCompany();
  }
  getCompany(): void {
    this.service.detail().subscribe(res => {
      this.companyDetal = res;
    });
  }
}

@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MenuBarComponent]
})
export class MenuBarModule { }
