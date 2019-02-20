import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { ActivityService } from '../activity.service';
import { FlatActivity } from '../Classes/FlatActivity';
import { RestrictionService } from '../restriction.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  private displayList: FlatActivity[];
  private flatActivityList: FlatActivity[];
  private subscription: SubscriptionLike;
  private sortOrder = false;
  private readonly orderByPipe = new OrderByPipe();

  constructor(private activityService: ActivityService, private restrictionService: RestrictionService) { }

  ngOnInit() {
    this.getFlatActivities();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFlatActivities(): void {
    this.subscription = this.activityService.getFlatActivityList().subscribe(flatActivities => {
      const flattened = [];
      flatActivities.forEach(act => flattened.push(act));
      this.flatActivityList = flattened;
      this.displayList = this.flatActivityList;
    });
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.flatActivityList, field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatActivity[]): void {
    this.displayList = filteredData;
  }
}
