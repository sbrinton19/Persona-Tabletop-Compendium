import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Persona, Recipe } from '../Classes/Persona';
import { ActivatedRoute } from '@angular/router';
import { getFusionsTo, getFusionsFrom } from '../Utils/FusionCalculator';
import { PersonaService } from '../persona.service';
import { FilterPipe } from '../Pipes/filter-pipe';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  @ContentChildren(PaginationComponent) pagers: QueryList<PaginationComponent<Recipe>>;

  @Input() persona: Persona;
  toRecipes: Recipe[];
  fromRecipes: Recipe[];
  statNames = Persona.STATNAMES;
  elemNames = Persona.ELEMNAMES;
  Math = Math;
  transmutationsHeader = ['Black Kogatana', 'Black Robe', 'Black Rock', 'Black Card'];
  constructor(private route: ActivatedRoute, private personaService: PersonaService) { }


  ngOnInit(): void {
    this.getPersonae();
    this.toRecipes = getFusionsTo(this.persona);
    this.fromRecipes = getFusionsFrom(this.persona);
  }

  getPersonae(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personaService.getPersonaeList().subscribe(personae => this.persona = personae.find(p => p.id === id));
  }
}
