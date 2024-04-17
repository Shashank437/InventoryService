// products.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { RateProduct } from './product.rate.dto';
import axios from 'axios';
import 'dotenv/config';
import { UpdateProduct } from './product.update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async rateProduct(id: string, rateProduct: RateProduct): Promise<Product> {
    const product: Product = await this.findOne(id);
    let { rating } = rateProduct;
    rating += product.rating;
    if (rating > 0) rating /= 2;
    product.rating = rating;

    const updatedProduct = new this.productModel(product);
    return updatedProduct.save();
  }

  async create(product: Product): Promise<ProductDocument> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: UpdateProduct): Promise<ProductDocument> {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async getProductHistory(id: string): Promise<any> {
    const response = await axios({
      method: 'GET',
      url: `${process.env.ORDER_URL}/history/product/${id}`,
    }).catch(() => {
      throw new ForbiddenException('API not available');
    });

    return response.data;
  }

  async updateQuantity(
    productDetails: UpdateProduct,
    itr: number,
  ): Promise<void> {
    if (productDetails.productIds) {
      productDetails.productIds.forEach((productId) => {
        this.productModel.findByIdAndUpdate(productId, {
          $inc: { quantity: itr },
        });
      });
    }
  }
}
