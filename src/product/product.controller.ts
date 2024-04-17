// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, ProductDocument } from './product.schema';
import { RateProduct } from './product.rate.dto';
import { UpdateProduct } from './product.update.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() productDto: Product): Promise<Product> {
    return this.productService.create(productDto);
  }

  @Post('/rate/:id')
  async rateProduct(
    @Body() rateProduct: RateProduct,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.rateProduct(id, rateProduct);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const product: ProductDocument = await this.productService.findOne(id);
    product._id;
    return product;
  }

  @Get(':id/history')
  async getOrderHistory(@Param('id') id: string): Promise<any> {
    const orderDetails = await this.productService.getProductHistory(id);
    return orderDetails;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() productDto: UpdateProduct,
  ): Promise<Product> {
    return this.productService.update(id, productDto);
  }

  @Put('/quantity/increase')
  async increaseQuantity(@Body() productDto: UpdateProduct): Promise<void> {
    this.productService.updateQuantity(productDto, 1);
  }

  @Put('/quantity/decrease')
  async decreaseQuantity(@Body() productDto: UpdateProduct): Promise<void> {
    this.productService.updateQuantity(productDto, -1);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productService.remove(id);
  }
}
