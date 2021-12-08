import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchModule } from './search/search.component';
import { UserProfileModule } from './user-profile/user-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-menu-header',
    templateUrl: './menu-header.component.html',
    styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent {
    @Input() option;
    @Output() callback = new EventEmitter<any>();
    constructor(private router: Router) {}
    onChangeValueInputSearch = (value) => {
        this.callback.emit(value);
    }
    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_user');
        this.router.navigateByUrl('/login');
    }
}
@NgModule({
    declarations: [
        MenuHeaderComponent
    ],
    imports: [
        CommonModule,
        UserProfileModule,
        SearchModule,
        MatMenuModule,
        MatIconModule
    ],
    exports: [MenuHeaderComponent, UserProfileModule]
})
export class MenuHeaderModule { }
