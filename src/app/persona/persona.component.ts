import { Component, OnInit, Input } from '@angular/core';
import { Persona, Recipe } from '../Classes/Persona';
import { ActivatedRoute } from '@angular/router';
import { getFusionsTo, getFusionsFrom } from '../Utils/FusionCalculator';
import { PersonaService } from '../persona.service';
import { FilterPipe } from '../Pipes/filter-pipe';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  @Input() persona: Persona;
  @Input() fusionsTo: Recipe[];
  fusionsToDisplay: Recipe[];
  @Input() fusionsFrom: Recipe[];
  fusionsFromDisplay: Recipe[];
  statNames = Persona.STATNAMES;
  elemNames = Persona.ELEMNAMES;
  toPageNum = 0;
  fromPageNum = 0;
  transmutationsHeader = ['Black Kogatana', 'Black Robe', 'Black Rock', 'Black Card'];
  constructor(private route: ActivatedRoute, private personaService: PersonaService) { }


  ngOnInit(): void {
    this.getPersonae();
    this.fusionsTo = getFusionsTo(this.persona);
    this.fusionsToDisplay = this.fusionsTo;
    this.fusionsFrom = getFusionsFrom(this.persona);
    this.fusionsFromDisplay = this.fusionsFrom;
  }

  getPersonae(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personaService.getPersonaeList().subscribe(personae => this.persona = personae.find(p => p.id === id));
  }

  filterToStr(filter): void {
    if (filter === '') {
       this.fusionsToDisplay = this.fusionsTo;
    }
    const pipe = new FilterPipe();
    this.fusionsToDisplay = pipe.transformRecipe(this.fusionsTo, filter, this.persona.name);
  }

  filterFromStr(filter): void {
    if (filter === '') {
       this.fusionsFromDisplay = this.fusionsFrom;
    }
    const pipe = new FilterPipe();
    this.fusionsFromDisplay = pipe.transformRecipe(this.fusionsFrom, filter, this.persona.name);
  }
}
