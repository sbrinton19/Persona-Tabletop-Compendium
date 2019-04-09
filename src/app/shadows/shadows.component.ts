import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FlatShadow } from '../Classes/FlatShadow';
import { SubscriptionLike } from 'rxjs';
import { ShadowService } from '../Services/shadow.service';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';
import { getDisplayArcana, getArcanaName } from '../Enums/Arcana';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shadows',
  templateUrl: './shadows.component.html',
  styleUrls: ['./shadows.component.scss']
})
export class ShadowsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatShadow> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 2, 'Level', FilterType.NoFilter, 'level', '', true),
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Arcana', FilterType.SelectFilter, 'arcana', '', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  loading = true;
  subscription: SubscriptionLike;

  constructor(private shadowService: ShadowService, private router: Router) {
    FlatShadow.STATNAMES.forEach((stat, index) => this.tableHeaders.push(
      new TableHeader(1, 2, stat, FilterType.NoFilter, `stats[${index}]`, 'mobile-hidden-2', true)));
    FlatShadow.ELEMNAMES.forEach((elem, index) => this.tableHeaders.push(
      new TableHeader(1, 2, elem, FilterType.NoFilter, `elems[${index}]`, 'mobile-hidden-3', true)));
    const arcanaMap: [string, any][] = [['Any Arcana', -1]];
    getDisplayArcana().forEach(arcana => arcanaMap.push([getArcanaName(arcana), arcana]));
    this.selectOptions.set('arcana', arcanaMap);
  }

  ngOnInit() {
    this.getFlatShadows();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFlatShadows(): void {
    this.subscription =
      this.shadowService.getFlatShadowList().subscribe(flatShadows => {
        this.dataSource.data = flatShadows;
        this.loading = false;
      });
  }

  editShadow(): void {
    this.router.navigateByUrl('shadow/edit');
  }
}
