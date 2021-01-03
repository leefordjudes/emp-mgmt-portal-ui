import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import * as _ from 'lodash';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../shared/NgbDateCustomParserFormatter';

interface Employee {
  id?: String,
  name: String,
  department: {
    id: String,
    name: String,
  },
  doj: Date,
  photoFileName?: String,
}

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})
export class AddEditEmpComponent implements OnInit {
  constructor(private service: SharedService) { }
  @Input() emp: Employee;
  @Output() modelStatus: EventEmitter<any> = new EventEmitter<any>();

  doj: NgbDateStruct;
  employee:Employee;
  empId: String;
  empName: String;
  deptId: String;
  deptName: String;
  photoFileName: String;
  photoFilePath: String;
  formData:FormData;
  departmentList:any=[];

  ngOnInit(): void {
    this.loadDepartmentList();
    this.formData=new FormData();
    // console.log(this.emp);
    this.empId = this.emp.id;
    this.empName = this.emp.name;
    this.deptId = this.emp.department.id;
    this.deptName = this.emp.department.name;
    const empdoj = new Date(this.emp.doj);
    this.doj = {
      year: empdoj.getFullYear(),
      month: empdoj.getMonth()+1,
      day: empdoj.getDate()
    };
    console.log(this.doj);
    this.photoFileName = this.emp.photoFileName;
    this.photoFilePath = (this.service.photosUrl+this.photoFileName);
    if (!this.empId){
      this.deptId = '0';
      this.photoFilePath = 'assets/anonymous.png';
      const today = new Date();
      this.doj = {
        year: today.getFullYear(),
        month: today.getMonth()+1,
        day: today.getDate()
      };
      console.log(this.doj);
    }

    if (!this.emp?.photoFileName) {
      this.photoFilePath = 'assets/anonymous.png';
    }
  }

  loadDepartmentList() {
    this.service.getDeptList().subscribe(data => {
      this.departmentList = data;
    });
  }

  addEmp() {
    // const newEmp = {
    //   name: this.empName,
    //   department: this.deptId,
    //   doj: `${this.doj.year}-${(this.doj.month).toString().padStart(2,'0')}-${(this.doj.day).toString().padStart(2,'0')}`,
    // };
    console.log('1',this.photoFileName);
    if (this.photoFileName !== 'anonymous.png') {
      // _.assign(newEmp, {photoFileName: this.photoFileName});
      console.log('2',this.photoFileName);
      this.formData.append('photoFileName', this.photoFileName.toString());
    } else {
      this.formData.delete('file');
    }
    this.formData.append('name', this.empName.toString());
    this.formData.append('department', this.deptId.toString());
    this.formData.append('doj', `${this.doj.year}-${(this.doj.month).toString().padStart(2,'0')}-${(this.doj.day).toString().padStart(2,'0')}`);
    
    this.service.addEmployee(this.formData).subscribe(
      (res:any) => {
        alert('Employee added successfully');
        this.modelStatus.emit();
      },
      (err:any) => {
        alert(err.error.message);
        this.modelStatus.emit();
      }
    );
    
  }

  updateEmp(){
    const exEmp = {
      id: this.empId,
      name: this.empName,
      department: this.deptId,
      doj: `${this.doj.year}-${(this.doj.month).toString().padStart(2,'0')}-${(this.doj.day).toString().padStart(2,'0')}`,
    };

    if (this.photoFileName !== 'anonymous.png') {
      _.assign(exEmp, {photoFileName: this.photoFileName});
    }
    // console.log(exEmp);
    this.service.updateEmployee(exEmp).subscribe(
      (res:any) => {
      alert('Employee updated successfully');
      
      },
      (err) =>{
        alert(err.error.message);
      });
  }

  // uploadPhoto(event) {
  //   const file=event.target.files[0];
  //   const formData:FormData=new FormData();
  //   formData.append('uploadedFile', file, file.name);

  //   this.service.uploadPhoto(formData).subscribe((data:any)=>{
  //     this.photoFileName=data.toString();
  //     this.photoFilePath=this.service.photosUrl+this.photoFileName;
  //   });
  // }

  uploadPhoto(event) {
    // this.formData=new FormData();
    if (event.target.files && event.target.files[0]) {
      const file=event.target.files[0];
      this.formData.append('file', file, file.name);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.photoFileName = file.name;
        this.photoFilePath = e.target.result;
      };
    }
  }

}
