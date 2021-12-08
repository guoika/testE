import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private service: AuthService,
    private cookieService: CookieService,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      CompanyName: ['', [Validators.required, Validators.maxLength(255)]],
      FullName: ['', [Validators.required, Validators.maxLength(255)]],
      FirstName: [''],
      LastName: [''],
      // Email: ['', Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      Email: ['', [Validators.required, Validators.maxLength(255)]],
      Password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      ConfirmPassword: ['', Validators.maxLength(20)]
    });
  }
  lstError = [];
  lstRequired = [];
  dupEmail = false;
  model: any;
  loginForm: FormGroup;
  ngOnInit(): void {
  }
  registerAccount(): void {
    const data = this.loginForm.value;
    this.lstError = [];
    this.dupEmail = false;
    this.lstRequired = [];
    this.findInRequidControls(data);
    if (this.lstRequired.length === 0) {
      this.lstError = this.findInvalidControls();
      if (data.Password !== data.ConfirmPassword) {
        this.lstError.push('ConfirmPassword');
      }
      if (this.lstError.length === 0) {
        if (data.Password === data.ConfirmPassword) {
          const index = data.FullName.trim().search(' ');
          if (index >= 0) {
            data.LastName = data.FullName.trim().slice(0, index);
            data.FirstName = data.FullName.trim().slice(index + 1);
          } else {
            data.FirstName = data.FullName.trim();
          }
          this.companyService.registerClinic(data).subscribe(res => {
            console.log(res);
            this.autoLogin(data.Email, data.Password);
          },
          error => {
            console.log(error);
            this.dupEmail = true;
          });
        }
      }
    }
  }
  // tslint:disable-next-line:typedef
  findInvalidControls() {
    const invalid = [];
    const controls = this.loginForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    if (!invalid.includes('Email') && this.loginForm.value.Email.search('@') < 4 ) {
      invalid.push('Email');
    }
    return invalid;
  }
  // tslint:disable-next-line:typedef
  findInRequidControls(data) {
    if (data.CompanyName === '') {
      this.lstRequired.push('CompanyName');
    }
    if (data.FullName === '') {
      this.lstRequired.push('FullName');
    }
    if (data.Email === '') {
      this.lstRequired.push('Email');
    }
    if (data.Password === '') {
      this.lstRequired.push('Password');
    }
  }
  setCookie(key: string): void {
    this.cookieService.set('key', key);
  }
  autoLogin(userName, pwd): void {
    // this.loadingSerive.show();
    this.service.login(userName, pwd).subscribe((data: any) => {
      localStorage.setItem('ProviderId', data.ProviderId);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('access_user', JSON.stringify(data));
      this.setCookie(JSON.stringify(this.model));
      setTimeout(() => this.router.navigateByUrl('/company'), 300);
    }, (err) => {
      // this.error = err;
    }, () => {
      // this.loadingSerive.hide();
    });
  }
  login(): void {
    this.router.navigateByUrl('/login');
  }
}
