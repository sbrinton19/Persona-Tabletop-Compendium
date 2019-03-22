import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatPersona } from '../Classes/FlatPersona';
import { PersonaService } from '../Services/persona.service';
import { SubscriptionLike } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { TableHeader } from '../Classes/TableHeader';
import { FilterType } from '../Enums/FilterType';
import { getDisplayArcana, getArcanaName } from '../Enums/Arcana';

@Component({
  selector: 'app-personae',
  templateUrl: './personae.component.html',
  styleUrls: ['./personae.component.scss']
})
export class PersonaeComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<FlatPersona> = new MatTableDataSource([]);
  tableHeaders: TableHeader[] = [
    new TableHeader(1, 2, 'Level', FilterType.NoFilter, 'level', '', true),
    new TableHeader(1, 1, 'Name', FilterType.StringFilter, 'name', '', true),
    new TableHeader(1, 1, 'Arcana', FilterType.SelectFilter, 'arcana', '', true),
  ];
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  private subscription: SubscriptionLike;

  constructor(private personaService: PersonaService) {
    FlatPersona.STATNAMES.forEach((stat, index) => this.tableHeaders.push(
      new TableHeader(1, 2, stat, FilterType.NoFilter, `stats[${index}]`, 'mobile-hidden-2', true)));
    FlatPersona.ELEMNAMES.forEach((elem, index) => this.tableHeaders.push(
      new TableHeader(1, 2, elem, FilterType.NoFilter, `elems[${index}]`, 'mobile-hidden-3', true)));
    const arcanaMap: [string, any][] = [['Any Arcana', -1]];
    getDisplayArcana().forEach(arcana => arcanaMap.push([getArcanaName(arcana), arcana]));
    this.selectOptions.set('arcana', arcanaMap);
  }

  ngOnInit() {
    this.getFlatPersonae();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFlatPersonae(): void {
    this.subscription =
      this.personaService.getFlatPersonaList().subscribe(flatPersonae => this.dataSource.data = flatPersonae);
  }
}
