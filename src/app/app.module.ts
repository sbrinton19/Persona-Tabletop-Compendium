import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonaeComponent } from './personae/personae.component';
import { AppRoutingModule } from './/app-routing.module';
import { OrderByPipe } from './Pipes/order-by-pipe';
import { PersonaComponent } from './persona/persona.component';
import { PersonaService } from './persona.service';
import { PersonaResolver } from './persona.resolver';
import { ItemService } from './item.service';
import { FilterPipe } from './Pipes/filter-pipe';
import { SkillsComponent } from './skills/skills.component';
import { SkillService } from './skill.service';
import { SkillResolver } from './skill.resolver';
import { ItemsComponent } from './items/items.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { ArmorsComponent } from './armors/armors.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SkillComponent } from './skill/skill.component';
import { WebsocketService } from './websocket.service';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaeComponent,
    OrderByPipe,
    FilterPipe,
    PersonaComponent,
    SkillsComponent,
    ItemsComponent,
    WeaponsComponent,
    ArmorsComponent,
    AccessoriesComponent,
    PaginationComponent,
    SkillComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    PersonaService,
    ItemService,
    SkillService,
    WebsocketService,
    PersonaResolver,
    SkillResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
