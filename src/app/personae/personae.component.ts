import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatPersona } from '../Classes/FlatPersona';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { PersonaService } from '../persona.service';
import { FilterPipe } from '../Pipes/filter-pipe';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SkillService } from '../skill.service';
@Component({
  selector: 'app-personae',
  templateUrl: './personae.component.html',
  styleUrls: ['./personae.component.css'],
})
export class PersonaeComponent implements OnInit, OnDestroy {
  private displayList: FlatPersona[];
  private flatPersonaList: FlatPersona[];
  private subscriptions: ISubscription[] = [];
  private statList = FlatPersona.STATNAMES;
  private elemList = FlatPersona.ELEMNAMES;
  private sortOrder = false;

  constructor(private personaService: PersonaService, private skillService: SkillService) { }

  ngOnInit() {
    this.getFlatPersonae();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  getFlatPersonae(): void {
    this.subscriptions.push(this.personaService.getFlatPersonaeList().subscribe(resp => {
      this.flatPersonaList = resp;
      this.displayList = this.flatPersonaList;
    }));
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.flatPersonaList, field, this.sortOrder, idx);
  }

  filterStr(filter): void {
    if (filter === '' && this.displayList.length !== this.flatPersonaList.length) {
       this.displayList = this.flatPersonaList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.flatPersonaList, filter);
  }


}
