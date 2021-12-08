import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../service/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { BaseModule } from 'src/app/base/base.module';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private service: AuthService,
        private loadingSerive: LoaderService,
        private cookieService: CookieService
    ) { }

    error: any;
    model: any = {};
    checked = false;
    ngOnInit(): void {
      if (this.getCookie('key')) {
        this.model = JSON.parse(this.getCookie('key'));
        this.checked = true;
      }
      // this.getCookie('key')
    }
    login(): void {
        this.loadingSerive.show();
        this.service.login(this.model.userName, this.model.pwd).subscribe((data: any) => {
          if (data.Role === 'Admin') {
            localStorage.setItem('ProviderId', data.ProviderId);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('access_user', JSON.stringify(data));
            if (this.checked === true) {
                this.setCookie(JSON.stringify(this.model));
            } else {
              this.cookieService.delete('key');
            }
            setTimeout(() => this.router.navigateByUrl('/company'), 300);
          } else {
            this.error = 'Tài khoản không có quyền đang nhập!';
          }
        }, (err) => {
            this.error = err;
        }, () => {
            this.loadingSerive.hide();
        });
    }
    signUp(): void {
      this.router.navigateByUrl('/sign-up');
    }
    check(data): void {
      this.checked = data;
    }
    getCookie(key: string): any{
      return this.cookieService.get(key);
    }
    setCookie(key: string): void{
      this.cookieService.set('key', key);
    }
}

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatCheckboxModule,
        BaseModule
    ],
    exports: [LoginComponent]
})
export class SignInModule { }
