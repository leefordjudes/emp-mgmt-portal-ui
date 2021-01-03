import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }
  employeeList:any=[];
  allEmployees:any=[];
  empNameFilter;
  deptNameFilter;

  modalTitle;
  activateAddEditEmp:boolean = false;
  @ViewChild('closeModelBtn') closeModelBtn:ElementRef;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  getModelStatus() {
    this.activateAddEditEmp = false;
    this.closeModelBtn.nativeElement.click();
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data => {
      this.employeeList = data;
      this.allEmployees = data;
    });
  }

  closeModel() {
    this.activateAddEditEmp=false;
    this.refreshEmpList();
  }

  addEmp() {
    this.emp = {id:null, name:'', department: '', doj:'', photoFileName:'anonymous.png'};
    this.modalTitle='Add Employee';
    this.activateAddEditEmp=true;
  }

  editEmp(emp:any) {
    this.emp = {id: emp.id, name:emp.name, department: emp.department, doj: emp.doj, photoFileName: emp.photoFileName};
    this.modalTitle='Edit Employee';
    this.activateAddEditEmp=true;
  }

  deleteEmp(emp:any) {
    if(confirm('Are you sure?')) {
      this.service.deleteEmployee(emp).subscribe(
        (res:any) => {
          this.refreshEmpList();
          alert('Employee deleted successfully');
        },
        (err:any) => {
          alert(err.error.message);
          this.refreshEmpList();
        });
    }
  }

  filterFn(key) {
    if (key === 'emp') {
      this.employeeList = this.allEmployees.filter(x => x.name.toString().trim().toLowerCase().includes(this.empNameFilter.toString().trim().toLowerCase()));
    } else if (key === 'dept') {
      this.employeeList = this.allEmployees.filter(x => x.department.name.toString().trim().toLowerCase().includes(this.deptNameFilter.toString().trim().toLowerCase()));
    }
  }

  sortResult(prop, order) {
    console.log(prop, order);
    if (prop === 'dept') {
      this.employeeList = _.orderBy(this.allEmployees, [x=>x.department.name.toLowerCase()],[order]);
    } else if (prop === 'emp') {
      this.employeeList = _.orderBy(this.allEmployees, [x=>x.name.toLowerCase()],[order]);
    }
  }

}
