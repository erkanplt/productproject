import { AlertifyService } from './../alertify-service.service';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  product: Product = new Product();
  submitted = false;

  constructor(
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // gotoList() {
  //   this.router.navigate(['/products']);
  // }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

  save() {
    this.productService.createProduct(this.product).subscribe(
      (data) => {
        this.alertifyService.success(this.product.name + ' başarıyla eklendi.');
      },
      (error) => console.log(error)
    );
    // this.product = new Product();
    // this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
