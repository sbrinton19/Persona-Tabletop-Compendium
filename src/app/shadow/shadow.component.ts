import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullShadow, FlatShadow } from '../Classes/FlatShadow';
import { getDisplayElemResists, ElemResist } from '../Enums/ElemResist';
import { FlatSkill } from '../Classes/FlatSkill';
import { SkillService } from '../Services/skill.service';
import { SubscriptionLike } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DropReference } from '../Classes/ItemReference';
import { ItemService } from '../Services/item.service';
import { FlatItem } from '../Classes/FlatItem';
import { SingleRowTableHeader, EditTableHeader } from '../Classes/TableHeader';
import { getDisplayArcana, Arcana, getArcanaName } from '../Enums/Arcana';
import { PersonaService } from '../Services/persona.service';
import { LoadFromDialogComponent } from '../load-from-dialog/load-from-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ShadowService } from '../Services/shadow.service';

@Component({
  selector: 'app-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShadowComponent implements OnInit, OnDestroy {
  
  statSource: MatTableDataSource<number[]> = new MatTableDataSource([]);
  statTableHeaders: SingleRowTableHeader[] = [];
  
  elemSource: MatTableDataSource<ElemResist[]> = new MatTableDataSource([]);
  elemTableHeaders: SingleRowTableHeader[] = [];
  elemSelectOptions: ElemResist[] = getDisplayElemResists();
  
  skillList: FlatSkill[];
  skillSource: MatTableDataSource<FlatSkill> = new MatTableDataSource([]);
  skillTableHeaders: EditTableHeader[] = [
    new EditTableHeader('Element', 'element', 'select', false),
    new EditTableHeader('Name', 'name', 'string', false),
    new EditTableHeader('Effect', 'description', 'string', false),
    new EditTableHeader('Cost', 'cost', 'number', false),
  ];
  skillConversion: (input: FlatSkill[]) => FlatSkill[] = function(input) {
    return input;
  }

  itemList: FlatItem[];
  negotSource: MatTableDataSource<DropReference> = new MatTableDataSource([]);
  dropSource: MatTableDataSource<DropReference> = new MatTableDataSource([]);
  negotTableHeadersEdit: EditTableHeader[] = [
    new EditTableHeader('Item', 'name', 'string', false),
    new EditTableHeader('Low', 'low', 'number', true),
    new EditTableHeader('High', 'high', 'number', true),
  ];
  negotTableHeaders: EditTableHeader[] = [
    new EditTableHeader('Win Difference', 'roll', 'string', false),
    new EditTableHeader('Item', 'name', 'string', false),
  ];
  negotConversion: (input: FlatItem[], negotiates: DropReference[]) => DropReference[] = function(input, negotiates) {
    const newNegots: DropReference[] = [];        
    input.forEach(item => {
      if (negotiates.some(negot => negot.id === item.id)) {
        newNegots.push(negotiates.find(negot => negot.id === item.id));
      } else {
        newNegots.push(new DropReference(item.id, item.name, 0, 0))
      }
    });
    return newNegots;
  }
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  
  readonly Arcana = getDisplayArcana();
  oldShadow: FullShadow;
  shadow: FullShadow;
  oldPersonaId = -1;
  progress = 0;
  isEdit: boolean;
  private subscriptions: SubscriptionLike[] = [];
  
  constructor(private route: ActivatedRoute, private skillService: SkillService,
    private itemService: ItemService, private personaService: PersonaService,
    private shadowService: ShadowService, public dialog: MatDialog) {
    this.isEdit = this.route.snapshot.data['isEdit'];
    FlatShadow.STATNAMES.forEach((stat, index) => {
      this.statTableHeaders.push(
        new SingleRowTableHeader(stat, `stats[${index}]`, 'number')
      );
    });
    FlatShadow.ELEMNAMES.forEach((elem, index) => {
      this.elemTableHeaders.push(
        new SingleRowTableHeader(elem, `elems[${index}]`, 'select')
      );
    });
  }

  ngOnInit() {
    const val = this.route.snapshot.paramMap.get('id');
    if (this.isEdit && !val) {
      this.shadow = FullShadow.emptyConstructor();
      this.oldShadow = this.shadow.clone();
      this.statSource.data = [ this.shadow.stats ];
      this.elemSource.data = [ this.shadow.elems ];
      this.skillSource.data = this.shadow.shadowSkills;
      this.negotSource.data = this.shadow.negotiates;
      this.dropSource.data = this.shadow.drops;
    }
    else {
      this.progress = -100;
      this.subscriptions.push(
        this.route.data.subscribe(({ shadowData }) => {
          this.shadow = shadowData.get(+this.route.snapshot.paramMap.get('id'));
          this.oldShadow = this.shadow.clone();
          this.statSource.data = [ this.shadow.stats ];
          this.elemSource.data = [ this.shadow.elems ];
          this.skillSource.data = this.shadow.shadowSkills;
          this.negotSource.data = this.shadow.negotiates;
          this.dropSource.data = this.shadow.drops;
          this.progress += 100;
        })
      );
    }
    this.subscriptions.push(
      this.skillService.getFlatSkillList().subscribe(skills => {
        this.skillList = skills;
        this.progress += 50;
      })
    );
    this.subscriptions.push(
      this.itemService.getFlatItemList().subscribe(items => {
        this.itemList = items;
        this.progress += 50;
      })
    );
    this.subscriptions.push(this.personaService.getFullPersona(-1).subscribe(fullPersona => {
      if (fullPersona.get(this.shadow.personaId)) {
        const loaded = FullShadow.fromFullPersona(fullPersona.get(this.shadow.personaId));
        if (loaded) {
          this.shadow = loaded;
          this.skillSource.data = this.shadow.shadowSkills;
          this.negotSource.data = this.shadow.negotiates;
          this.dropSource.data = this.shadow.drops;
          this.oldPersonaId = this.shadow.personaId;
        }
      } else {
        this.shadow.personaId = this.oldPersonaId;
        const alertDialogRef = this.dialog.open(AlertDialogComponent, {
          width: '20vw',
          data: {title: 'No Persona Found', message: 'No Persona was found for the given ID'}
        });
      }
      this.progress = 100;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getArcanaName(arcana: Arcana): string {
    return getArcanaName(arcana);
  }

  loadDialog(): void {
    const loadDialogRef = this.dialog.open(LoadFromDialogComponent, {
      width: '20vw',
      data: {sourceType: 'Persona', id: this.shadow.personaId}
    });
    loadDialogRef.afterClosed().subscribe(result => {
      this.progress = 0;
      this.oldPersonaId = this.shadow.personaId;
      this.shadow.personaId = result;
      this.personaService.getFullPersona(result);
    });
  }

  changesToSave(): boolean {
    return !this.oldShadow.isEqual(this.shadow);
  }

  saveDialog(): void {
    if (!this.shadow.validateFields()) {
      this.dialog.open(AlertDialogComponent, {
        width: '20vw',
        data: {title: 'Invalid Shadow', message: 'Shadow contains invalid values and cannot be saved'}
      });
      return;
    }
    this.shadowService.addFullShadow(this.shadow);
    this.oldShadow = this.shadow.clone();
  }

  valChecker(): void {
    console.log(this.shadow);
    this.isEdit = !this.isEdit;
  }
}
