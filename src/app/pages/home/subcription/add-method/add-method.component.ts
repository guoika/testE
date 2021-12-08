import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-method',
  templateUrl: './add-method.component.html',
  styleUrls: ['./add-method.component.scss']
})
export class AddMethodComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CompanyService,
    public dialogRef: MatDialogRef<AddMethodComponent>
  ) { }
  ngOnInit(): void {
  }
  addMethod(): void {
    const req  = {
      type: 'paypal ',
    };
    this.service.addCompanyPaymentMethod(req).subscribe(res => {
      console.log(res);
      const popUp = window.open(res, '_blank');
      setTimeout(() => {
        if (popUp.closed) {
          this.dialogRef.close();
        }
      }, 200);
    //   popUp.onbeforeunload = function(){
    //     console.log('unload');
    // }
    });
  }
  close(): void {
    this.dialogRef.close();
  }

}
