import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  private dataSource = new BehaviorSubject('default message');
  currentMessage = this.dataSource.asObservable();

  constructor() { }
  private company: any;

  changeData(data: any): void {
    this.dataSource.next(data);
  }

}
