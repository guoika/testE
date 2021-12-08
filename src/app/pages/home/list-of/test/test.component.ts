import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  option = {
    avatar: true,
    title: 'List of Tests',
    search: false,
  };

  firstData: any = [];
  secondData: any = [];
  thirtData: any = [];
  fourthData: any = [];
  listParentTest = [];

  optionActive: any = {};

  constructor(
    private service: TestService
  ) { }

  ngOnInit(): void {
    this.service.listParentTestcategory().subscribe(res => {
      this.listParentTest = res;
      if (this.listParentTest && this.listParentTest.length !== 0) {
        const data = {
          Item: this.listParentTest[0]
        };
        console.log(this.listParentTest);

        this.setInit();
        this.onActiveItem(data);
      }
    });
    // this.service.listParentTestcategory(0).subscribe(res => {
    //   this.firstData = res;
    // });
    // this.service.listOrgans().subscribe(res => {
    //   this.secondData = res;
    // });
  }

  setInit(): void {
    this.listParentTest.forEach(parent => {
      parent.isActive = false;
      parent.edit = false;
      if (parent.ListOrgans.length !== 0) {
        parent.ListOrgans.forEach(organ => {
          organ.isActive = false;
          organ.edit = false;
          if (organ.ListTestcombinations.length !== 0) {
            organ.ListTestcombinations.forEach(testCom => {
              testCom.isActive = false;
              testCom.edit = false;
            });
          }
        });
      }
      if (parent.ListTestcategories.length !== 0) {
        parent.ListTestcategories.forEach(testCategory => {
          testCategory.isActive = false;
          testCategory.edit = false;
          if (testCategory.ListTestcombinations.length !== 0) {
            testCategory.ListTestcombinations.forEach(testCom => {
              testCom.isActive = false;
              testCom.edit = false;
            });
          }
          if (testCategory.ListOrgans.length !== 0) {
            testCategory.ListOrgans.forEach(testOrgan => {
              testOrgan.isActive = false;
              testOrgan.edit = false;
              if (testOrgan.ListTestcombinations.length !== 0) {
                testOrgan.ListTestcombinations.forEach(testCom => {
                  testCom.isActive = false;
                  testCom.edit = false;
                });
              }
            });
          }
        });
      }
    });
  }


  onActiveItem(data): void {
    const item = data.Item;
    if (data.Type === 'add') {
    } else if (data.Type === 'edit') {
      const dataReq = {
        Name: item
      };
      this.service.editTestcategory(item.TestcategoryId, dataReq).subscribe(res => {
      });
    } else if (data.Type === 'delete') {

    } else {
      this.listParentTest.forEach(element => {
        // set Active in first item of list Plan
        if (item.TestcategoryId === element.TestcategoryId) {
          element.isActive = true;
          if (element.ListTestcategories.length !== 0) {
            element.ListTestcategories[0].isActive = true;
            if (element.ListTestcategories[0].ListOrgans.length !== 0) {
              element.ListTestcategories[0].ListOrgans[0].isActive = true;
            }
          } else if (element.ListOrgans.length !== 0) {
            element.ListOrgans[0].isActive = true;
          }
          // remove all Active in all child item of list Plan
        } else {
          element.isActive = false;
          if (element.ListTestcategories.length !== 0) {
            element.ListTestcategories.forEach(test => {
              test.isActive = false;
              if (test.ListOrgans.length !== 0) {
                test.ListOrgans.forEach(organ => {
                  organ.isActive = false;
                });
              }
            });
          } else if (element.ListOrgans.length !== 0) {
            element.ListOrgans.forEach(organ => {
              organ.isActive = false;
            });
          }
        }
      });
    }

    console.log(this.listParentTest, item, 'test');

  }
  onActiveTestCategory(lst, data, parent): void {

    const item = data.Item;
    console.log(lst, data, parent);
    if (data.Type === 'add') {
      const dataReq = {
        ParentTestcategoryId: parent.TestcategoryId,
        Name: item
      };
      this.service.craeteTestcategory(dataReq).subscribe(res => {
        lst.push({
          TestcategoryId: res,
          Name: item,
          isActive: false, Type: 2, Status: 1, edit: false,
          ListOrgans: [],
          ListTestcombinations: []
        });
      });

    } else if (data.Type === 'delete') {
      Swal.fire({
        title: 'Are you sure you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9FB9C8',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteTestcategory(item.TestcategoryId).subscribe(res => {
            if (this.listParentTest && this.listParentTest.length !== 0) {
              this.ngOnInit();
            }
          });
        }
      });
    } else if (data.Type === 'edit') {
      const dataReq = {
        Name: item
      };
      this.service.editTestcategory(item.TestcategoryId, dataReq).subscribe(res => {
      });
    } else {
      lst.forEach(element => {
        element.isActive = false;
      });
      item.isActive = true;
    }
  }
  onActiveOrgans(lst, data, parent): void {
    const item = data.Item;
    console.log(data);
    if (data.Type === 'add') {
      const dataReq = {
        TestcategoryId: parent.TestcategoryId,
        Name: item
      };
      this.service.craeteOrgan(dataReq).subscribe(res => {
        lst.push({
          OrganId: res,
          isActive: false, Type: 2, Status: 1, edit: false,
          Name: item,
          ListTestcombinations: []
        });
      });

    } else if (data.Type === 'delete') {
      Swal.fire({
        title: 'Are you sure you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9FB9C8',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteOrgan(item.OrganId).subscribe(res => {
            this.ngOnInit();
          });
        }
      });
    } else if (data.Type === 'edit') {
      this.service.editOrgan(item.OrganId, item).subscribe(res => {
      });
    } else {
      lst.forEach(element => {
        element.isActive = false;
      });
      item.isActive = true;
    }
  }

  openChild = (lst, data, organ, testcategory) => {
    const item = data.Item;
    console.log(organ, testcategory, lst);

    // console.log(lst, data, parent);
    if (data.Type === 'add') {
      const dataReq = {
        TestcategoryId: testcategory?.TestcategoryId,
        OrganId: organ?.OrganId,
        Name: item
      };
      this.service.craeteTest(dataReq).subscribe(res => {
        lst.push({
          TestcombinationId: res,
          Name: item,
          isActive: false, Type: 2, Status: 1, edit: false,
          ListOrgans: [],
          ListTestcombinations: []
        });
      });

    } else if (data.Type === 'delete') {
      Swal.fire({
        title: 'Are you sure you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9FB9C8',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteTest(item.TestcombinationId).subscribe(res => {
            this.ngOnInit();
          });
        }
      });
    } else if (data.Type === 'edit') {
      this.service.editTest(item.TestcombinationId, item).subscribe(res => {
      });
    }
    // console.log(event);
    // if (event.type === 3) {
    //   this.service.listTestLab(event.item.TestcategoryId).subscribe(res => {
    //     console.log(res);
    //   })
    // }
    // if (event.type === 'add') {
    //   switch (event.item.Type) {
    //     case 2:
    //       this.service.createOrgans({
    //         Name: event.item.name
    //       }).subscribe(res => {
    //         this.secondData.push({
    //           OrganId: res,
    //           Name: event.item.name
    //         })
    //       })
    //       break;
    //     case 4:
    //       this.service.createTest({ Name: event.item.name }).subscribe(res => {
    //         this.service.createTestCombination({
    //           TestcategoryId: this.optionActive.TestcategoryId,
    //           OrganId: this.optionActive.OrganId,
    //           TestId: res
    //         }).subscribe(res => {
    //           this.fourthData.push({
    //             TestcategoryId: this.optionActive.TestcategoryId,
    //             OrganId: this.optionActive.OrganId,
    //             TestId: res,
    //             Name: event.item.name
    //           })
    //         })
    //       })
    //       break;
    //     default:
    //       break;
    //   }
    // }
    // if (event.type === 'delete') {
    //   switch (event.item.Type) {
    //     case 2:
    //       Swal.fire({
    //         title: 'Are you sure you want to delete?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#9FB9C8',
    //         cancelButtonColor: '#ccc',
    //         confirmButtonText: 'ok'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           this.service.deleteOrgans(event.item.OrganId).subscribe(res => {
    //             this.secondData = this.secondData.filter(x => x.OrganId !== event.item.OrganId);
    //           })
    //           Swal.fire(
    //             2'Deleted!',
    //             2'Your file has been deleted.',
    //             success'
    //           )
    //         }
    //       })

    //       break;
    //     case 4:

    //       break;
    //     default:
    //       break;
    //   }
    // }


    // switch (event.item.Type) {
    //   case 1:
    //     this.optionActive.TestcategoryId = event.item.TestcategoryId;
    //     if (this.optionActive.OrganId) {
    //       this.service.listTest(this.optionActive.OrganId, this.optionActive.TestcategoryId).subscribe(res => {
    //         this.fourthData = res;
    //       })
    //     }
    //     break;
    //   case 2:
    //     this.optionActive.OrganId = event.item.OrganId;
    //     if (this.optionActive.TestcategoryId) {
    //       this.service.listTest(this.optionActive.OrganId, this.optionActive.TestcategoryId).subscribe(res => {
    //         this.fourthData = res;
    //       })
    //     }
    //     break;
    //   default:
    //     break;
    // }

  }

}
