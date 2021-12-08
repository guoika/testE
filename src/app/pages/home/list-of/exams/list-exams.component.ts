import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { BaseModule } from 'src/app/base/base.module';
import { MenuHeaderModule } from 'src/app/layouts/menu-header/menu-header.component';
import { ExamService } from 'src/app/services/exam.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalExamsComponent } from 'src/app/base/modal-exams/modal-exams.component';
import Swal from 'sweetalert2';
import { ExamResultService } from 'src/app/services/exam-result.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-exams',
  templateUrl: `list-exams.component.html`,
  styleUrls: ['./list-exams.component.scss']
})

export class ListExamsComponent implements OnInit {
  listExamSub: any = [];
  secondData: any = [];
  thirtData: any = [];
  fourthData: any = [];
  nameResult = '';
  nameLeft = '';
  nameRight = '';
  option = {
    avatar: true,
    title: 'List of Exams',
    search: false,
  };
  optionActive: any = {};

  constructor(
    private examService: ExamService,
    private examResultService: ExamResultService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getListExams();
  }
  openDialogCreate(item): void {
    this.dialog.open(ModalExamsComponent, {
      panelClass: 'myDialogStyle',
      data: {
        title: 'Add new exam type',
        item,
        type: 'add'
      }
    });
  }
  openDialogEdit(item): void {
    this.dialog.open(ModalExamsComponent, {
      panelClass: 'myDialogStyle',
      data: {
        title: 'Edit exam',
        item,
        type: 'edit'
      }
    }).afterClosed().subscribe(result => {
      item.Name = result;
      });
  }
  openDialogDelete(item): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
          confirmButton: 'ci-button-confirm-swal',
          cancelButton: 'ci-button-cancel-swal'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `Are you sure you want to delete?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'OK',
        reverseButtons: true,
        background: '#F2F2F2'
    }).then((result) => {
        if (result.isConfirmed) {
            this.examService.delete(item.ExamId).subscribe(res => {
                // // this.swal.success('Delete success');
                this.ngOnInit();
            });
        }
    });
  }
  openDialogResultCreate(type, name, examId): void {
    const req = {
      ExamId: examId,
      Name: name,
      Normal: 1,
      LeftRight: type
    };
    if (type === 0) {
      this.nameResult = '';
    } else if (type === 1) {
      this.nameLeft = '';
    } else {
      this.nameRight = '';
    }
    this.examResultService.create(req).subscribe(res => {
      this.ngOnInit();
    });
  }
  openDialogResultEdit(item): void {
    this.dialog.open(ModalExamsComponent, {
      panelClass: 'myDialogStyle',
      data: {
        title: 'Edit Result',
        item,
        type: 'edit-result'
      }
    }).afterClosed().subscribe(result => {
      item.Name = result;
      });
  }
  openDialogResultDelete(item): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
          confirmButton: 'ci-button-confirm-swal',
          cancelButton: 'ci-button-cancel-swal'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: `Are you sure you want to delete?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'OK',
        reverseButtons: true,
        background: '#F2F2F2'
    }).then((result) => {
        if (result.isConfirmed) {
            this.examResultService.delete(item.ResultId).subscribe(res => {
                // // this.swal.success('Delete success');
                this.ngOnInit();
            });
        }
    });
  }
  openChild(ev): void {
    console.log(ev);
    // switch (ev.item.Type) {
    //     case 1:
    //         this.optionActive.lv1 = ev.item.ExamId
    //         break;
    //     case 2:
    //         this.optionActive.lv2 = ev.item.ExamId
    //         break;
    //     case 3:
    //         this.optionActive.lv3 = ev.item.ExamId
    //         break;
    //     default:
    //         break;
    // }
    // if (ev.type === 'delete') {
    //     switch (ev.item.Type) {
    //         case 1:
    //             this.firstData = this.firstData.filter(x => x.ExamId !== ev.item.ExamId)
    //             break;
    //         case 2:
    //             this.secondData = this.secondData.filter(x => x.ExamId !== ev.item.ExamId)
    //             break;
    //         case 3:
    //             this.thirtData = this.thirtData.filter(x => x.ExamId !== ev.item.ExamId)
    //             break;
    //         case 4:
    //             this.fourthData = this.fourthData.filter(x => x.ExamId !== ev.item.ExamId)
    //             break;
    //         default:
    //             break;
    //     }
    //     this.examService.delete(ev.item.ExamId).subscribe(res => {
    //         console.log(res);
    //     })
    //     return;
    // }

    // if (ev.type === 'add') {
    //     switch (ev.item.Type) {
    //         case 2:
    //             this.examService.create({
    //                 ParentExamId: this.optionActive.lv1,
    //                 LeftRight: 0,
    //                 Name: ev.item.name,
    //                 Description: ev.item.name
    //             }).subscribe(res => {
    //                 this.secondData.push({
    //                     ParentExamId: this.optionActive.lv1,
    //                     LeftRight: 0,
    //                     Name: ev.item.name,
    //                     Description: ev.item.name,
    //                     ExamId: res
    //                 })
    //             });
    //             break;
    //         case 3:
    //             this.examService.create({
    //                 ParentExamId: this.optionActive.lv2,
    //                 LeftRight: 0,
    //                 Name: ev.item.name,
    //                 Description: ev.item.name
    //             }).subscribe(res => {
    //                 this.thirtData.push({
    //                     ParentExamId: this.optionActive.lv2,
    //                     LeftRight: 0,
    //                     Name: ev.item.name,
    //                     Description: ev.item.name,
    //                     ExamId: res
    //                 })
    //             });
    //             break;
    //         case 4:
    //             this.examService.create({
    //                 ParentExamId: this.optionActive.lv3,
    //                 LeftRight: 0,
    //                 Name: ev.item.name,
    //                 Description: ev.item.name
    //             }).subscribe(res => {
    //                 this.fourthData.push({
    //                     ParentExamId: this.optionActive.lv3,
    //                     LeftRight: 0,
    //                     Name: ev.item.name,
    //                     Description: ev.item.name,
    //                     ExamId: res
    //                 })
    //             });
    //             break;
    //         default:
    //             break;
    //     }
    //     return;
    // }
    // this.getListExams();

  }

  getListExams(): void {
    // this.listExamSub = this.examService.getS();
    // this.setDataInit(this.listExamSub);
    this.examService.list().subscribe(res => {
      this.listExamSub = res;
      this.setDataInit(this.listExamSub);
      console.log(this.listExamSub);
      this.onClickActiveExam(this.listExamSub[0], this.listExamSub, true);
    });
  }


  setDataInit(lst): void {
    lst.forEach(e => {
      e.isActive = false;
      if (e.ListSubExams) {
        e.level2 = true;
        e.ListSubExams.forEach(eChild1 => {
          eChild1.isActive = false;
          if (eChild1.ListSubExams && eChild1.ListSubExams.length !== 0) {
            e.level2 = false;
            eChild1.ListSubExams.forEach(eChild2 => {
              eChild1.isActive = false;
            });
          }
        });
      }
    });
  }

  onClickActiveExam(exam, lst, checkLevel?): void {
    lst.forEach(e => {
      e.isActive = false;
      if (e.ListSubExams) {
        if (checkLevel === true) {
          e.level2 = true;
        }
        e.ListSubExams.forEach(eChild1 => {
          eChild1.isActive = false;
          if (eChild1.ListSubExams && eChild1.ListSubExams.length !== 0) {
            e.level2 = false;
            eChild1.ListSubExams.forEach(eChild2 => {
              eChild1.isActive = false;
            });
          }
        });
      }
    });
    exam.isActive = true;
    if (exam.ListSubExams && exam.ListSubExams.length !== 0) {
      exam.ListSubExams[0].isActive = true;
      if (exam.ListSubExams[0].ListSubExams && exam.ListSubExams[0].ListSubExams.length !== 0) {
        exam.ListSubExams[0].ListSubExams[0].isActive = true;
      }
    }
    console.log(this.listExamSub, lst);

  }


}

@NgModule({
  declarations: [
    ListExamsComponent
  ],
  imports: [
    MenuHeaderModule,
    CommonModule,
    BaseModule,
    MatTabsModule,
    FormsModule

  ],
  providers: [],
})
export class ListExamsModule { }
