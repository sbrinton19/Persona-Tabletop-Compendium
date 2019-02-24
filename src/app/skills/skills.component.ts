import { Component, OnInit, OnDestroy } from '@angular/core';
import { SkillService } from '../skill.service';
import { FlatSkill } from '../Classes/FlatSkill';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {
  private sortOrder = false;
  private displayList: Array<[FlatSkill, boolean]> = [];
  private subscriptions: SubscriptionLike;
  private readonly orderByPipe = new OrderByPipe();

  constructor(private skillService: SkillService) { }

  public ngOnInit() {
    this.getFlatSkills();
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getFlatSkills(): void {
    this.subscriptions = this.skillService.getFlatSkillList().subscribe(skills => {
      skills.forEach(skill => this.displayList.push([skill, true]));
    });
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.displayList, field, this.sortOrder, idx, true);
  }

  onFiltered(filteredData: [string, Array<[FlatSkill, boolean]>]): void {
    this.displayList = filteredData[1];
  }
}
