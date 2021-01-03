import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly apiUrl = 'http://localhost:3000/api';
  readonly photosUrl = 'http://localhost:3000/api/photos';
  constructor(private http: HttpClient) {}

  getDeptList():Observable<[]>{
    return this.http.get<any>(this.apiUrl+'/department/list');
  }

  addDepartment(val: any) {
    return this.http.post(this.apiUrl+'/department/create', val);
  }
  
  updateDepartment(val: any) {
    return this.http.put(this.apiUrl+`/department/${val.id}/update`, {name: val.name});
  }
  
  deleteDepartment(val: any) {
    return this.http.delete(this.apiUrl+`/department/${val.id}/delete`);
  }

  getEmpList():Observable<[]>{
    return this.http.get<any>(this.apiUrl+'/employee/list');
  }

  addEmployee(val: any) {
    return this.http.post(this.apiUrl+'/employee/create', val)
  }
  
  updateEmployee(val: any) {
    return this.http.put(this.apiUrl+`/employee/${val.id}/update`, val)
  }
  
  deleteEmployee(val: any) {
    return this.http.delete(this.apiUrl+`/employee/${val.id}/delete`)
  }

  uploadPhoto(val: any) {
    return this.http.post(this.apiUrl+'/employee/save-file', val)
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/employee/department-names')
  }
}
