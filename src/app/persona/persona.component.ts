import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { Recipe, FullPersona, FlatPersona } from '../Classes/Persona';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';
import { ISubscription } from 'rxjs/Subscription';

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
  private subscription: ISubscription;

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
