import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  productDialog:boolean = false;
  products: any[] = [];
  product: any;
  selectedProducts: any[] = [];
  submitted:boolean = false;
  statuses:any[] = [];

  Delete: string = "";
  searchText: string = "";
  

  constructor(
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.statuses = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];

    this.product = {
      name: '',
      description: '',
      inventoryStatus: '',
      category: '',
      price: '',
      quantity: ''
    }
  }
  
  createNewDetails = () => {
    //
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts.includes(val));
              this.selectedProducts = [];
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }

  deleteProduct(product: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => val.id !== product.id);
              this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  editProduct = (item: any) => {
    //
  }
  
}
