import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-result-doc',
    template: `<router-outlet></router-outlet>`,

})
export class ResultDocComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }
}
