import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { FullPersona, FlatPersona } from '../Classes/FlatPersona';
import { Recipe } from '../Classes/Recipe';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit, OnDestroy {
  @ContentChildren(PaginationComponent) pagers: QueryList<PaginationComponent<Recipe>>;

  private persona: FullPersona;
  private statNames = FlatPersona.STATNAMES;
  private elemNames = FlatPersona.ELEMNAMES;
  private Math = Math;
  private transmutationsHeader = ['Black Kogatana', 'Black Robe', 'Black Rock', 'Black Card'];
  private subscription: SubscriptionLike;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(({ personaData }) => {
      this.persona = personaData.get(+this.route.snapshot.paramMap.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
