import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullItem } from '../Classes/FlatItem';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ItemType } from '../Enums/ItemType';
import { OriginType } from '../Enums/OriginType';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
  item: FullItem;
  private subscription: SubscriptionLike;
  ItemType = ItemType;
  OriginType = OriginType;
  readonly damageAnalysis: string[] = ['Modifier', 'Min Damage', 'Avg Damage', 'Max Damage'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ itemData }) => {
      this.item = itemData.get(+this.route.snapshot.paramMap.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkFlag(value: number, flag: number): boolean {
    return !!(value & flag);
  }

}
