import { Product } from "./product";



export class ShoppingCartItem{
    
    item:string;
    price:number;
    imageUrl:string;
    quantity:number;
    $key:string;

    
    get totalPrice(){
        return this.price * this.quantity
    }
}