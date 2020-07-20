import { ProductService } from './../product.service';
import { Product } from './../product/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertifyService } from '../alertify-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  constructor(
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.products = this.productService.getProductsList();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this.alertifyService.error('Ürün başarıyla silindi.');
        this.reloadData();
      },
      (error) => console.log(error)
    );
  }

  updateProduct(id: number) {
    this.router.navigate(['/product-update', id]);
  }
}
