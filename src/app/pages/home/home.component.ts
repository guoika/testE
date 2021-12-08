import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    template: ` <div class="app-row">
                    <div  >
                        <app-menu-bar></app-menu-bar>
                    </div>
                    <div >
                        <router-outlet></router-outlet>
                    </div>
                </div>`,
})
export class HomeComponent {
    title = 'TITILE';
}
