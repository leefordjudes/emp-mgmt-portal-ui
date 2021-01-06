import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:3000/api/payment-detail';
  formData:PaymentDetail = new PaymentDetail();
  list: PaymentDetail[];

  postPaymentDetail() {
    return this.http.post(this.baseUrl+'/create', this.formData);
  }

  putPaymentDetail() {
    return this.http.put(this.baseUrl+`/${this.formData.id}/update`, this.formData);
  }

  deletePaymentDetail(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}/delete`); 
    // .subscribe(res => {
    //   this.refreshList();
    // });
  }

  refreshList() {
    this.http.get(this.baseUrl+'/list').toPromise().then(res => this.list = res as PaymentDetail[]);
  }
}
