import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductService, UtilsService } from '../service';

@Injectable()
export class ProductDetailResolve implements Resolve<any> {

  constructor(private productService: ProductService,
              private utils: UtilsService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.productService.productDetailResolve(route.params['productId']).catch(this.utils.handleError);
  }
}
