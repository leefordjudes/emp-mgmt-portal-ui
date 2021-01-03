import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: SharedService) { }
  departmentList:any=[];
  modalTitle;
  activateAddEditDept:boolean = false;
  dep:any;
  allDepartments:any=[];
  nameFilter;

  ngOnInit(): void {
    this.refreshDeptList();
  }

  refreshDeptList(){
    this.service.getDeptList().subscribe(data => {
      this.departmentList = data;
      this.allDepartments = data;
    });
  }

  filterFn() {
    // console.log(this.nameFilter);
    // console.log(this.allDepartments);
    this.departmentList = this.allDepartments.filter(x => x.name.toString().trim().toLowerCase().includes(this.nameFilter.toString().trim().toLowerCase()));
  }

  closeModel() {
    this.activateAddEditDept=false;
    this.refreshDeptList();
  }

  addDept() {
    this.dep = {id:null,name:''};
    this.modalTitle='Add Department';
    this.activateAddEditDept=true;
  }

  editDept(dept:any) {
    this.dep = {id: dept.id, name:dept.name};
    this.modalTitle='Edit Department';
    this.activateAddEditDept=true;
  }

  deleteDept(dept:any) {
    if(confirm('Are you sure?')) {
      this.service.deleteDepartment(dept).subscribe(
        (res:any) => {
          this.refreshDeptList();
          alert('Department deleted successfully');
        },
        (err:any) => {
          alert(err.error.message);
          this.refreshDeptList();
        });
    }
  }

  sortResult(prop, order) {
    this.departmentList = this.allDepartments.sort((a, b)=>{
      if(order) {
        return (a[prop]>b[prop])? 1 : ((a[prop]<b[prop])? -1: 0);
      } else {
        return (b[prop]>a[prop])? 1 : ((b[prop]<a[prop])? -1: 0);
      }
    })
  }

}
