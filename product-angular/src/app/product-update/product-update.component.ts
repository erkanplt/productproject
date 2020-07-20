import { ProductService } from './../product.service';
import { Product } from './../product/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../alertify-service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  id: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertifyService: AlertifyService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = new Product();
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe(
      (data) => {
        console.log('başarılı');
        this.product = data;
      },
      (error) => console.log(error)
    );
  }

  updateProduct() {
    this.productService.updateProduct(this.id, this.product).subscribe(
      (data) => {
        this.alertifyService.warning(
          this.product.name + ' başarıyla güncellendi.'
        );
      },
      (error) => console.log(error)
    );
    // this.product = new Product();
  }

  onSubmit() {
    this.updateProduct();
  }
}
