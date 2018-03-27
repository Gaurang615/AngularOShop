import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  categories$;
  product={};
  id;
  constructor(
    private activateRoute:ActivatedRoute,
    private categoryService:CategoryService, 
    private prodcutService:ProductService,
    private router:Router) { 
    this.categories$=categoryService.getAll();

   this.id = this.activateRoute.snapshot.paramMap.get('id'); 
   if (this.id) this.prodcutService.getProduct(this.id).take(1).subscribe(p => this.product =p);

  }

  save(product){
    if(this.id) this.prodcutService.updatetProduct(this.id,product);
    else this.prodcutService.create(product);
    
    
    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(! confirm("Are you sure you want to delete this product?")) return;
    
    this.prodcutService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
