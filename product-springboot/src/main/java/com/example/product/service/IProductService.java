package com.example.product.service;

import java.util.List;

import com.example.product.model.Product;

public interface IProductService {

	Product createProduct(Product product);

	Product updateProduct(Product product);

	List<Product> getAllProduct();

	Product getProductById(long productId);

	void deleteProduct(long id);

}
