import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() option?: any;
  @Input() dataModel?: any;
  @Input() button?: any;
  @Input() configCss?: any;
  @Output() callback = new EventEmitter<any>();
  @Input() isService = false;
  model: any = {};
  tempModel: any = {};
  profileImageString;
  typeImage = '';
  height = 'calc(100% - 430px)';
  constructor() { }
  ngOnInit(): void {
    console.log(this.button);

  }

  ngOnChanges(): void {
    this.data = this.data.filter(x => x.type !== 'link');
    this.model = this.dataModel || {};
    console.log(this.model);

    this.tempModel = cloneDeep(this.model);
    this.profileImageString = this.dataModel ? this.dataModel.MediaURL : '';
  }

  handleEvent(typeButton): void {
    console.log(typeButton);
    this.callback.emit({
      type: typeButton,
    });
  }
  setData(data, typeButton): void {
    this.callback.emit({
      type: typeButton,
      item: data,
    });
  }
  processFileProfileImage = (files) => {
    const reader = new FileReader();
    this.typeImage = files[0].type;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.profileImageString = reader.result;
      this.model.MediaURL = this.profileImageString.split(',')[1];
    };
  }
}
