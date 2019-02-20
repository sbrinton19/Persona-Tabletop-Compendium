import { Component, OnInit, ContentChildren, OnDestroy, QueryList } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { VendorItemReference } from '../Classes/ItemReference';
import { FullActivity } from '../Classes/FlatActivity';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderByPipe } from '../Pipes/order-by-pipe';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {
  @ContentChildren(PaginationComponent) pagers: QueryList<PaginationComponent<VendorItemReference>>;

  private activity: FullActivity;
  private subscription: SubscriptionLike;
  private sortOrder = false;
  private readonly orderByPipe = new OrderByPipe();

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
