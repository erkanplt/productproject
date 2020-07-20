package com.example.product.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.product.exception.ResourceNotFoundException;
import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;

@Service
@Transactional
public class ProductService implements IProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		Optional<Product> productDb = this.productRepository.findById(product.getId());

		if (productDb.isPresent()) {
			Product productUpdate = productDb.get();
			productUpdate.setId(product.getId());
			productUpdate.setName(product.getName());
			productUpdate.setPrice(product.getPrice());
			productUpdate.setDescription(product.getDescription());
			productRepository.save(productUpdate);
			return productUpdate;
		} else {
			throw new ResourceNotFoundException("Kayıt bulunamadı: " + product.getId());
		}

	}

	@Override
	public List<Product> getAllProduct() {
		return this.productRepository.findAll();
	}

	@Override
	public Product getProductById(long productId) {
		Optional<Product> productDb = this.productRepository.findById(productId);

		if (productDb.isPresent()) {
			return productDb.get();
		} else {
			throw new ResourceNotFoundException("Kayıt bulunamadı: " + productId);
		}

	}

	@Override
	public void deleteProduct(long productId) {
		Optional<Product> productDb = this.productRepository.findById(productId);

		if (productDb.isPresent()) {
			this.productRepository.delete(productDb.get());
		} else {
			throw new ResourceNotFoundException("Kayıt bulunamadı: " + productId);
		}

	}

}
