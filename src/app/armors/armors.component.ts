import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item, Armor, FlatItem, FlatArmor } from '../Classes/Item';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { FilterPipe } from '../Pipes/filter-pipe';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { PersonaReference } from "../Classes/PersonaReference";

@Component({
  selector: 'app-armors',
  templateUrl: './armors.component.html',
  styleUrls: ['./armors.component.css']
})
export class ArmorsComponent implements OnInit, OnDestroy {
  armorsList: Item[];
  displayList: FlatItem[];
  flatArmorsList: FlatArmor[]
  private subscriptions: ISubscription[] = [];
  sortOrder = false;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getArmors();
    this.getFlatArmors();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  getArmors(): void {
    this.subscriptions.push(this.itemService.getArmorList().subscribe(armors => this.armorsList = armors));
  }

  getFlatArmors(): void {
    this.subscriptions.push(this.itemService.getFlatArmorList().subscribe(flatArmors => {
      this.flatArmorsList = flatArmors;
      this.displayList = this.flatArmorsList;
    }));
  }

  orderBy(field: string, idx = 0): void {
    const pipe = new OrderByPipe();
    this.sortOrder = !this.sortOrder;
    this.displayList = pipe.transform(this.flatArmorsList, field, this.sortOrder, idx);
  }

  filterStr(filter: string): void {
    if (filter === '' && this.displayList.length !== this.flatArmorsList.length) {
       this.displayList = this.flatArmorsList;
    }
    const pipe = new FilterPipe();
    this.displayList = pipe.transform(this.armorsList, filter);
  }

  getSourceHtml(source: PersonaReference) {
    return `<a href='/persona/${source.personaId}'>${source.personaName}</a><br>`;
  }

  getTransmuteHtml(source: number) {
    return `<a href='/persona/${source}'>${source}</a><br>`;
  }

}
