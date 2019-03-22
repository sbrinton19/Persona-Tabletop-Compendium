import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FullItem } from './Classes/FlatItem';
import { ItemService } from './Services/item.service';

@Injectable()
export class ItemResolver implements Resolve<Map<number, FullItem>> {
  constructor(private itemService: ItemService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<number, FullItem>> {
    return this.itemService.getFullItem(+route.paramMap.get('id')).asObservable().pipe(first());
  }
}
