import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-of',
    template: `<router-outlet></router-outlet>`
})
export class ListOfComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
