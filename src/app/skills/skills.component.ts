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
  private displayList: FlatSkill[];
  private subscriptions: SubscriptionLike;
  private flatSkillList: FlatSkill[];
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
      this.flatSkillList = skills;
      this.displayList = this.flatSkillList;
    });
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.flatSkillList, field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatSkill[]): void {
    this.displayList = filteredData;
  }
}
