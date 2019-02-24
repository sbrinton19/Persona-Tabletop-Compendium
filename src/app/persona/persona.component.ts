import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { FullPersona, FlatPersona } from '../Classes/FlatPersona';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { SubscriptionLike } from 'rxjs';
import { FilterType } from '../Enums/FilterType';
import { TableHeader } from '../Classes/TableHeader';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit, OnDestroy {
  @ViewChildren(PaginationComponent) pagers: QueryList<PaginationComponent<any>>;

  private persona: FullPersona;
  private statNames = FlatPersona.STATNAMES;
  private elemNames = FlatPersona.ELEMNAMES;
  private Math = Math;
  private transmutationsHeader = ['Black Kogatana', 'Black Robe', 'Black Rock', 'Black Card'];
  private recipeToHeaders: TableHeader[] = [
    new TableHeader(1, 2, '#', FilterType.NoFilter, ''),
    new TableHeader(1, 2, 'Cost', FilterType.NoFilter, 'cost'),
  ];
  private recipeFromHeaders: TableHeader[] = [
    new TableHeader(1, 2, '#', FilterType.NoFilter, ''),
    new TableHeader(1, 2, 'Cost', FilterType.NoFilter, 'cost'),
    new TableHeader(1, 1, 'Fuse with', FilterType.StringFilter, 'sources'),
    new TableHeader(1, 1, 'Result', FilterType.StringFilter, 'result'),
  ];
  private subscription: SubscriptionLike;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ personaData }) => {
      this.persona = personaData.get(+this.route.snapshot.paramMap.get('id'));
      this.recipeToHeaders.push(new TableHeader(6, 1, 'Ingredients', FilterType.StringFilter, this.persona.name));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
