import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlatArmor } from '../Classes/FlatItem';
import { ItemService } from '../item.service';
import { OrderByPipe } from '../Pipes/order-by-pipe';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-armors',
  templateUrl: './armors.component.html',
  styleUrls: ['./armors.component.css']
})
export class ArmorsComponent implements OnInit, OnDestroy {
  private displayList: FlatArmor[];
  private flatArmorsList: FlatArmor[];
  private subscription: SubscriptionLike;
  private sortOrder = false;
  private readonly orderByPipe = new OrderByPipe();

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getFlatArmors();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFlatArmors(): void {
    this.subscription = this.itemService.getFlatArmorList().subscribe(flatArmors => {
      this.flatArmorsList = flatArmors;
      this.displayList = this.flatArmorsList;
    });
  }

  orderBy(field: string, idx = 0): void {
    this.sortOrder = !this.sortOrder;
    this.displayList = this.orderByPipe.transform(this.flatArmorsList, field, this.sortOrder, idx);
  }

  onFiltered(filteredData: FlatArmor[]): void {
    this.displayList = filteredData;
  }
}
