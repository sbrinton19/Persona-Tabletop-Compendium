import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FullShadow } from './Classes/FlatShadow';
import { ShadowService } from './Services/shadow.service';

@Injectable()
export class ShadowResolver implements Resolve<Map<number, FullShadow>> {
  constructor(private shadowService: ShadowService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<number, FullShadow>> {
    return this.shadowService.getFullShadow(+route.paramMap.get('id')).asObservable().pipe(first());
  }
}
