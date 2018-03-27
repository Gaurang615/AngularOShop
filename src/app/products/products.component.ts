import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { RouterEvent } from '@angular/router/src/events';
import "rxjs/add/operator/switchmap";
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: string;
  cart$: Observable<ShoppingCart>;

  constructor
    (private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.productService
    .getAll()
    .switchMap(p => {
      this.products = p;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.currentCategory = params.get('category');

      this.applyFilter();
    });

    this.cart$ = await this.cartService.getCart();
  }
  private applyFilter(){
    this.filteredProducts = (this.currentCategory) ?
    this.products.filter(p => p.category === this.currentCategory) :
    this.products;
  }
}
