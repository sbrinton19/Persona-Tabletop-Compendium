import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { ActivityService } from '../activity.service';
import { FlatActivity } from '../Classes/FlatActivity';
import { RestrictionService } from '../restriction.service';
import { AvailableTime, getDisplayAvailableTimes, getAvailableTimeName } from '../Enums/AvailableTime';
import { AvailableWeekDay, getAvailableWeekDayName, getDisplayAvailableWeekDays } from '../Enums/AvailableWeekDay';
import { ActivityType, getActivityTypeName, getDisplayActivityTypes } from '../Enums/ActivityType';
import { getDisplayLocations, Location, getLocationName } from '../Enums/Location';
import { StringFilterComponent } from '../string-filter/string-filter.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  @ViewChildren(StringFilterComponent) stringFilter: QueryList<StringFilterComponent<FlatActivity>>;
  private displayList: Array<[FlatActivity, boolean]> = [];
  private subscription: SubscriptionLike;
  private sortOrder = false;
  private filterMap = new Map<string, number>();
  private readonly orderByPipe = new OrderByPipe();
  private readonly Locations = getDisplayLocations();
  private readonly AvailableTimes = getDisplayAvailableTimes();
  private readonly AvailableWeekDays = getDisplayAvailableWeekDays();
  private readonly ActivityTypes = getDisplayActivityTypes();

  constructor(private activityService: ActivityService, private restrictionService: RestrictionService) { }

  ngOnInit() {
    this.getFlatActivities();
    this.filterMap.set('location', -1);
    this.filterMap.set('availableTimes', -1);
    this.filterMap.set('availableWeekDays', -1);
    this.filterMap.set('type', -1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getFlatActivities(): void {
    this.subscription = this.activityService.getFlatActivityList().subscribe(flatActivities =>
      flatActivities.forEach(act => this.displayList.push([act, true])));
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.displayList, field, this.sortOrder, idx, true);
  }

  filterBy(field: string, value: number): void {
    this.filterMap.set(field, +value);
    this.stringFilter.first.reapplyFilter();
  }

  onFiltered(filteredData: [string, Array<[FlatActivity, boolean]>]): void {
    this.reapplyFilterMap(filteredData[1]);
    this.displayList = filteredData[1];
  }

  getLocationName(location: Location): string {
    return getLocationName(location);
  }

  getAvailableTimeName(avail: AvailableTime): string {
    return getAvailableTimeName(avail);
  }

  getAvailableWeekDayName(avail: AvailableWeekDay): string {
    return getAvailableWeekDayName(avail);
  }

  getTypeName(type: ActivityType): string {
    return getActivityTypeName(type);
  }

  private reapplyFilterMap(filtered: Array<[FlatActivity, boolean]>): void {
    filtered.forEach(tuple => {
      const activity = tuple[0];
      this.filterMap.forEach((value, key) => {
        if (tuple[1]) {
          tuple[1] = this.checkFilter(key, value, activity);
        }
      });
    });
  }

  private checkFilter(field: string, value: number, activity: FlatActivity): boolean {
    if (value === -1) {
      return true;
    }
    if (field === 'location') {
      return activity[field] === value;
    }
    return (activity[field] & +value) === +value;
  }
}
