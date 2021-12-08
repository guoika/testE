import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExamResultService } from 'src/app/services/exam-result.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-modal-exams',
  templateUrl: './modal-exams.component.html',
  styleUrls: ['./modal-exams.component.scss']
})
export class ModalExamsComponent implements OnInit {
  nameExam = '';
  item: any = {};
  constructor(
    public dialogRef: MatDialogRef<ModalExamsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private examService: ExamService,
    private examResultService: ExamResultService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.item = this.data.item;
    if (this.data.type === 'add') {
      this.nameExam = '';
    } else if (this.data.type === 'edit') {
      this.nameExam = this.item.Name;
    } else if (this.data.type === 'edit-result') {
      this.nameExam = this.item.Name;
    }
  }
  createExam(type): void {
    console.log(type);
    if (type === 'cancel') {
      this.dialogRef.close();
    } else if (type === 'save') {
      if (this.data.type === 'add') {
        console.log({
            ParentExamId: this.data.item.ParentExamId,
            Name: this.nameExam,
          });
        this.examService.create({
          ParentExamId: this.data.item.ParentExamId,
          Name: this.nameExam,
        }).subscribe(res => {
          console.log(res);
          this.dialogRef.close();
        });
      } else if (this.data.type === 'edit') {
        this.examService.edit({
          Name: this.nameExam
        }, this.data.item.ExamId).subscribe(res => {
          this.dialogRef.close(this.nameExam);
        });
      } else if (this.data.type === 'edit-result') {
          const req = {
              Name: this.nameExam,
              Normal: this.item.Normal,
              LeftRight: this.item.LeftRight
          };
          this.examResultService.edit(req, this.item.ResultId).subscribe(res => {
            this.dialogRef.close(this.nameExam);
          });
      }
    //   else if (this.data.type === 'add-result') {
    //     const req = {
    //         ExamId: this.item.ExamId,
    //         Name: this.nameExam,
    //         Normal: this.item.Normal,
    //         LeftRight: this.item.LeftRight
    //     };
    //     this.examResultService.create(req).subscribe(res => {
    //       this.dialogRef.close(this.nameExam);
    //     });
    // }
    }
  }

}
