import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() listExams;
  @Input() create;
  @Input() type;
  @Output() callback = new EventEmitter();
  name = '';
  ngOnInit(): void {
    console.log(this.listExams);

    //throw new Error('Method not implemented.');
  }
  onCallBack(item, type?): void {
    console.log(item, type);
    this.callback.emit({
      Type: type,
      Item: item
    });
  }
  add() {
    if (this.name !== '') {
      this.callback.emit({
        Type: 'add',
        Item: this.name
      });
      this.name = '';
    }
  }
  editItem(item): void {
    if (item.edit === false) {
      item.edit = true;
    } else {
      item.edit = false;
      this.callback.emit({
        Type: 'edit',
        Item: item
      });
    }
  }
}
