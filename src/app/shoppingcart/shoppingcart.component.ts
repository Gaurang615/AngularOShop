import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})

export class ShoppingcartComponent implements OnInit {
  cart$;

  constructor(private CarService:ShoppingCartService) { 

  }

  async ngOnInit() {
    this.cart$= await this.CarService.getCart();
  }

  clearCart(){
   this.CarService.clearCart(); 
  }
}
