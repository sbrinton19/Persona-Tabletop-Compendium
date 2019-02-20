import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatPersona } from '../Classes/FlatPersona';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { PersonaService } from '../persona.service';
import { SubscriptionLike } from 'rxjs';
import { SkillService } from '../skill.service';
@Component({
  selector: 'app-personae',
  templateUrl: './personae.component.html',
  styleUrls: ['./personae.component.css'],
})
export class PersonaeComponent implements OnInit, OnDestroy {
  private displayList: FlatPersona[];
  private flatPersonaeList: FlatPersona[];
  private subscriptions: SubscriptionLike;
  private statList = FlatPersona.STATNAMES;
  private elemList = FlatPersona.ELEMNAMES;
  private sortOrder = false;

  constructor(private personaService: PersonaService, private skillService: SkillService) { }

  ngOnInit() {
    this.getFlatPersonae();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getFlatPersonae(): void {
    this.subscriptions = this.personaService.getFlatPersonaList().subscribe(resp => {
      this.flatPersonaeList = resp;
      this.displayList = this.flatPersonaeList;
    });
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.flatPersonaeList, field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatPersona[]): void {
    this.displayList = filteredData;
  }
}
