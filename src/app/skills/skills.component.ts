import { Component, OnInit, OnDestroy } from '@angular/core';
import { SkillService } from '../Services/skill.service';
import { FlatSkill } from '../Classes/FlatSkill';
import { SubscriptionLike } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';
import { getDisplayElements, getElementName } from '../Enums/Element';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatSkill> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Element', FilterType.SelectFilter, 'element', '', true),
    new TableHeader(1, 2, 'Cost', FilterType.NoFilter, 'cost', '', true),
    new TableHeader(1, 2, 'Skill Description', FilterType.NoFilter, 'description', '', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  loading = true;
  private subscription: SubscriptionLike;

  constructor(private skillService: SkillService) {
    const elementMap: [string, any][] = [['Any Element', -1]];
    getDisplayElements().forEach(element => elementMap.push([getElementName(element), element]));
    this.selectOptions.set('element', elementMap);
  }

  public ngOnInit() {
    this.getFlatSkills();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFlatSkills(): void {
    this.subscription =
      this.skillService.getFlatSkillList().subscribe(flatSkills => {
        this.dataSource.data = flatSkills;
        this.loading = false;
      });
  }
}
