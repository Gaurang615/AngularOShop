import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Subscribable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products:Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items:Product[]=[];
  itemCount:number;

  constructor(private productService:ProductService) {
    this.subscription=this.productService.getAll().
    subscribe(p => {
     this.products=p;
      this.initiliseeDataTable(p);
    });
   }

  private initiliseeDataTable(p: Product[]) {
    this.tableResource = new DataTableResource(p);
    this.tableResource.query({ offset: 0 }).
      then(items => this.items = items);
    this.tableResource.count().
      then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params).
    then(items => this.items = items);

  }

   filter(query : string){
      let filteredProducts=(query) ? 
      this.products.filter(p=> p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())):
      this.products;

      this.initiliseeDataTable(filteredProducts);
   }
  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
