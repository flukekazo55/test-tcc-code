import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-masterdata-barcode',
  templateUrl: './masterdata-barcode.component.html',
  styleUrl: './masterdata-barcode.component.css',
})
export class MasterdataBarcodeComponent implements OnInit {
  selectedProduct: Product | null = null;

  products: Product[] = [];

  addForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductService) {
    this.addForm = this.fb.group({
      productCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    const resAPI = await this.service.getAllProducts();

    if (resAPI?.status === 200) {
      this.products = resAPI.result;
    } else {
      this.products = [];
    }
  }

  async addProduct() {
    this.addForm.markAllAsTouched();

    if (this.addForm.valid) {
      let payload = this.addForm.value;
      payload.productCode = payload.productCode.replace(/[^A-Za-z0-9]/g, '');
      const resAPI = await this.service.createProduct(payload);

      if (resAPI?.status === 201) {
        this.addForm.reset();
        this.getAll();
      }
    }
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  async deleteProduct() {
    if (this.selectedProduct) {
      const resAPI = await this.service.deleteProduct(
        this.selectedProduct.productId
      );
      this.getAll();
    }
  }

  getProductCode(productCode: string): string {
    const cleaned = productCode.replace(/[^A-Za-z0-9]/g, '');
    return cleaned.match(/.{1,4}/g)?.join('-') || '';
  }

  getImg(productBarcode: string): string {
    return `data:image/png;base64,${productBarcode}`;
  }
}
