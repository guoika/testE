import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
              path: 'sign-up',
              component: SignUpComponent
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            }
        ],
    },
];
