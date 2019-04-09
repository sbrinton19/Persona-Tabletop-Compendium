import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { ActivityService } from '../Services/activity.service';
import { FlatActivity } from '../Classes/FlatActivity';
import { RestrictionService } from '../Services/restriction.service';
import { getDisplayAvailableTimes, getAvailableTimeName } from '../Enums/AvailableTime';
import { getAvailableWeekDayName, getDisplayAvailableWeekDays } from '../Enums/AvailableWeekDay';
import { getActivityTypeName, getDisplayActivityTypes } from '../Enums/ActivityType';
import { getDisplayLocations, getLocationName } from '../Enums/Location';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatActivity> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Location', FilterType.SelectFilter, 'location', '', true),
    new TableHeader(1, 1, 'Available Times', FilterType.FlagSelectFilter, 'availableTimes', '', true),
    new TableHeader(1, 1, 'Available Weekdays', FilterType.FlagSelectFilter, 'availableWeekDays', '', true),
    new TableHeader(1, 1, 'Activity Type', FilterType.SelectFilter, 'type', 'mobile-hidden-1', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  loading = true;
  private subscription: SubscriptionLike;

  constructor(private activityService: ActivityService, private restrictionService: RestrictionService) {
    const locationMap: [string, any][] = [['Any Location', -1]];
    getDisplayLocations().forEach(location => locationMap.push([getLocationName(location), location]));
    this.selectOptions.set('location', locationMap);
    const availableTimesMap: [string, any][] = [['Any Time', -1]];
    getDisplayAvailableTimes().forEach(availableTime => availableTimesMap.push([getAvailableTimeName(availableTime), availableTime]));
    this.selectOptions.set('availableTimes', availableTimesMap);
    const availableWeekDaysMap: [string, any][] = [['Any Day', -1]];
    getDisplayAvailableWeekDays().forEach(availableWeekDay => availableWeekDaysMap.push([getAvailableWeekDayName(availableWeekDay), availableWeekDay]));
    this.selectOptions.set('availableWeekDays', availableWeekDaysMap);
    const activityTypeMap: [string, any][] = [['Any Type', -1]];
    getDisplayActivityTypes().forEach(activityType => activityTypeMap.push([getActivityTypeName(activityType), activityType]));
    this.selectOptions.set('type', activityTypeMap);
  }

  ngOnInit() {
    this.getFlatActivities();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getFlatActivities(): void {
    this.subscription =
      this.activityService.getFlatActivityList().subscribe(flatActivities => {
        this.dataSource.data = flatActivities;
        this.loading = false;
      });
  }
}
