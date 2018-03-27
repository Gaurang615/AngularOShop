import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product)
  {
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products');
  }

  getProduct(productID){
    return this.db.object('/products/'+productID);
  }

  updatetProduct(productID,product){
    return this.db.object('/products/'+productID).update(product);
  }
  
  deleteProduct(productID){
    return this.db.object('/products/'+productID).remove();
  }

}
