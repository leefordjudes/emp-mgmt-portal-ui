import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selected:PaymentDetail) {
    this.service.formData = Object.assign({}, selected);
  }

  deletePaymentDetail(id: string) {
    this.service.deletePaymentDetail(id).subscribe(res => {
      this.toastr.info('Deleted successfully');
      this.service.refreshList();
    });
  }

}
