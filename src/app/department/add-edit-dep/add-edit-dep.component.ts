import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service: SharedService) { }
  @Input() dep: any;
  deptId: string;
  deptName: string;

  ngOnInit(): void {
    this.deptId = this.dep.id;
    this.deptName = this.dep.name;
  }

  addDept(){
    const dept = {name: this.deptName};
    this.service.addDepartment(dept).subscribe(
      (res:any) => {
        alert('Department added successfully');
      },
      (err:any) => {
        alert(err.error.message);
      }
      );
  }

  updateDept(){
    const dept = {id: this.deptId, name: this.deptName};
    this.service.updateDepartment(dept).subscribe(
      (res:any) => {
      alert('Department updated successfully');
      },
      (err) =>{
        alert(err.error.message);
      });
  }

}
