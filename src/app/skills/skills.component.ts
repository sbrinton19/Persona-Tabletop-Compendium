import { Component, OnInit } from '@angular/core';
import { SkillService } from '../skill.service';
import { Skill } from '../Classes/Skill';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';
import { Persona } from '../Classes/Persona';

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
    this.displayList = pipe.transform(this.skillList, field, this.sortOrder, idx);
  }

  filterStr(filter): void {
    if (filter === '' && this.displayList.length !== this.skillList.length) {
      this.displayList = this.skillList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.skillList, filter);
  }

  getSourceHtml(source: Persona) {
    return `<a href='/persona/${source.id}'>${source.name}</a><br>`;
  }


}
