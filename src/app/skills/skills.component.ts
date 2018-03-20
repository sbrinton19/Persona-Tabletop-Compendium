import { Component, OnInit } from '@angular/core';
import { SkillService } from '../skill.service';
import { Skill } from '../Classes/Skill';
import { OrderByPipe } from '../Pipes/order-by-pipe';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillList: Skill[];
  sortOrder = false;
  displayList: Skill[];

  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.skillService.getSkillList().subscribe(skills => this.skillList = skills);
    this.displayList = this.skillList;
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.skillList, field, this.sortOrder, idx)
  }
}
