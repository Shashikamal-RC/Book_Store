import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.component.html',
  styleUrls: ['./choose-payment.component.scss']
})
export class ChoosePaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmDialogService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  goToOrderDetails = () => {
    this.router.navigate(['confirmorder/summary'])
  }

  confirmOrder = () => {
    this.confirmDialogService.confirm({
        message: `Are you sure that you want confirm order?`,
        accept: () => {
            //Actual logic to perform a confirmation
            this.messageService.add({severity: 'success', summary: 'Order confirm', detail: 'We will notify you on further details'});
            this.router.navigate(['home'])
        }
    });
  }

}
