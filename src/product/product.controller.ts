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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() productDto: Product,
  ): Promise<Product> {
    return this.productService.update(id, productDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productService.remove(id);
  }
}
