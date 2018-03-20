import { Component, OnInit } from '@angular/core';
import { Persona } from '../Classes/Persona';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { PersonaService } from '../persona.service';
import { FilterPipe } from '../Pipes/filter-pipe';
@Component({
  selector: 'app-personae',
  templateUrl: './personae.component.html',
  styleUrls: ['./personae.component.css'],
})
export class PersonaeComponent implements OnInit {
  fullPersonaeList: Persona[];
  displayList: Persona[];
  statList = Persona.STATNAMES;
  elemList = Persona.ELEMNAMES;
  sortOrder = false;
  sortField = 'level';
  sortIndex = 0;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.getPersonae();
  }

  getPersonae(): void {
    this.personaService.getPersonaeList().subscribe(personae => this.fullPersonaeList = personae);
    this.displayList = this.fullPersonaeList;
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.fullPersonaeList, field, this.sortOrder, idx);
  }

  filterStr(filter): void {
    if (filter === '' && this.displayList.length !== this.fullPersonaeList.length) {
       this.displayList = this.fullPersonaeList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.displayList, filter);
  }

}
