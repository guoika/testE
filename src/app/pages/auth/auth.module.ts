import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { authRoutes } from './auth.routes';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [
        AuthComponent,
        SignUpComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
})
export class AuthModule { }
