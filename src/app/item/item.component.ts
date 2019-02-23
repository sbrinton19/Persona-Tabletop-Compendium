import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullItem } from '../Classes/FlatItem';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  private item: FullItem;
  private subscription: SubscriptionLike;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ itemData }) => {
      this.item = itemData.get(+this.route.snapshot.paramMap.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
