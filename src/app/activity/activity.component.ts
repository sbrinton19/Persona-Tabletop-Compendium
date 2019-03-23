import { Component, OnInit, ContentChildren, OnDestroy, QueryList } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { VendorItemReference } from '../Classes/ItemReference';
import { FullActivity } from '../Classes/FlatActivity';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { ActivityType } from '../Enums/ActivityType';
import { FilterType } from '../Enums/FilterType';
import { TableHeader } from '../Classes/TableHeader';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {
  @ContentChildren(PaginationComponent) pagers: QueryList<PaginationComponent<VendorItemReference>>;

  activity: FullActivity;
  private subscription: SubscriptionLike;
  sortOrder = false;
  readonly orderByPipe = new OrderByPipe();
  readonly ActivityType = ActivityType;
  readonly vendorHeaders = [
    new TableHeader(1, 2, 'ID', FilterType.NoFilter, 'id', '', false),
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', false),
    new TableHeader(1, 2, 'Cost', FilterType.NoFilter, 'cost', '', false),
    new TableHeader(1, 2, 'Restrictions', FilterType.NoFilter, 'restrictions', '', false),
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(({ activityData }) => {
      this.activity = activityData.get(+this.route.snapshot.paramMap.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.activity.vendors[idx].vendorItems = this.orderByPipe.transform(this.activity.vendors[idx].vendorItems, field, this.sortOrder, idx);
  }
}
