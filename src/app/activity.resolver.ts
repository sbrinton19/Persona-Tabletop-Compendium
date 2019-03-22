import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { FullActivity } from './Classes/FlatActivity';
import { ActivityService } from './Services/activity.service';

@Injectable()
export class ActivityResolver implements Resolve<Map<number, FullActivity>> {
  constructor(private activityService: ActivityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<number, FullActivity>> {
    return this.activityService.getFullActivity(+route.paramMap.get('id')).asObservable().pipe(first());
  }
}
