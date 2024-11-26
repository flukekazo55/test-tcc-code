import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5149/api/products';

  constructor(private http: HttpClient) {}

  async createProduct(product: Product): Promise<ApiResponse<Product>> {
    const observable = this.http.post<ApiResponse<Product>>(this.baseUrl, product);
    const response = await lastValueFrom(observable);
    return response;
  }

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    const observable = this.http.get<ApiResponse<Product[]>>(this.baseUrl);
    const response = await lastValueFrom(observable);
    return response;
  }

  async getProductById(productId: number):  Promise<ApiResponse<Product>>{
    const observable = this.http.get<ApiResponse<Product>>(`${this.baseUrl}/${productId}`);
    const response = await lastValueFrom(observable);
    return response;
  }

  async deleteProduct(productId: number):  Promise<ApiResponse<string>> {
    const observable = this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${productId}`);
    const response = await lastValueFrom(observable);
    return response;
  }
}
