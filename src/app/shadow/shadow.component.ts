import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullShadow, FlatShadow } from '../Classes/FlatShadow';
import { getDisplayElemResists, ElemResist } from '../Enums/ElemResist';
import { FlatSkill } from '../Classes/FlatSkill';
import { SkillService } from '../Services/skill.service';
import { SubscriptionLike } from 'rxjs';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DropReference } from '../Classes/ItemReference';
import { ItemService } from '../Services/item.service';
import { FlatItem } from '../Classes/FlatItem';
import { SingleRowTableHeader, EditTableHeader } from '../Classes/TableHeader';
import { getDisplayArcana, Arcana, getArcanaName } from '../Enums/Arcana';
import { PersonaService } from '../Services/persona.service';
import { LoadFromDialogComponent } from '../load-from-dialog/load-from-dialog.component';
import { AlertDialogComponent, AlertDialogData } from '../alert-dialog/alert-dialog.component';
import { ShadowService } from '../Services/shadow.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  skillComparator: (tType: FlatSkill, uType: FlatSkill) => boolean = function(tType, uType) {
    return tType.id === uType.id;
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
  dropComparator: (tType: FlatItem, uType: DropReference) => boolean = function(tType, uType) {
    return tType.id === uType.id;
  }
  selectOptions: Map<string, [string, any][]> = new Map<string, [string, any][]>();
  
  readonly Arcana = getDisplayArcana();
  oldShadow: FullShadow;
  shadow: FullShadow;
  oldPersonaId = -1;
  progress = 0;
  isEdit: boolean;
  private saveDialogRef: MatDialogRef<AlertDialogComponent, AlertDialogData>;
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
          loaded.id = this.shadow.id;
          this.shadow = loaded;
          this.skillSource.data = this.shadow.shadowSkills;
          this.negotSource.data = this.shadow.negotiates;
          this.dropSource.data = this.shadow.drops;
          this.oldPersonaId = this.shadow.personaId;
        }
      } else {
        this.shadow.personaId = this.oldPersonaId;
        this.dialog.open(AlertDialogComponent, {
          width: '20vw',
          data: {title: 'No Persona Found', message: 'No Persona was found for the given ID'}
        });
      }
      this.progress = 100;
    }));
    this.subscriptions.push(this.shadowService.addFullShadow(undefined).subscribe(result => {
      if (this.saveDialogRef) {
        this.saveDialogRef.close();
        this.saveDialogRef = null;
      }
      let title: string;
      let message: string;
      if (result.result) {
        if (this.shadow.id === -1) {
          title = 'Saved Shadow';
          message = `Successfully Saved as id number ${result.id}`;
          this.shadow.id = result.id;
          this.oldShadow.id = this.shadow.id;
        } else {
          title = 'Saved Shadow';
          message = `Successfully Overwrote shadow with id number ${result.id}`;
          this.shadow.id = result.id;
          this.oldShadow.id = this.shadow.id;
        }
      } else {
        title = 'Failure';
        message = 'The shadow failed to be saved';
      }
      this.dialog.open(AlertDialogComponent, {
        width: '20vw',
        data: {title: title, message: message}
      });
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

  saveShadow(asNew: boolean): void {
    if (!this.shadow.validateFields()) {
      this.dialog.open(AlertDialogComponent, {
        width: '20vw',
        data: {title: 'Invalid Shadow', message: 'Shadow contains invalid values and cannot be saved'}
      });
      return;
    }
    if (this.shadow.id === -1) {
      this.savingDialog();
    } else if (asNew) {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '20vw',
        data: {
          title: 'Save As New',
          message: `This will save the current shadow as a new Shadow. 
          If successful, further editing will affect the new shadow and not this original shadow
          Do you wish to continue?`,
          negativeButton: 'No',
          positiveButton: 'Yes'
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.shadow.id = -1;
          this.savingDialog();
        }
      });
    } else {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '20vw',
        data: {
          title: 'Overwrite Shadow?',
          message: 'This will overwrite the data for this shadow with the current data. Do you wish to proceed?',
          negativeButton: 'No',
          positiveButton: 'Yes'
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.savingDialog();
        }
      });
    }
  }

  savingDialog(): void {
    this.saveDialogRef = this.dialog.open(AlertDialogComponent, {
      width: '20vw',
      data: {title: 'Saving Shadow', message: 'Attempting to Save Shadow, please wait', loading: true}
    });
    this.shadowService.addFullShadow(this.shadow);
    this.oldShadow = this.shadow.clone();
  }

  changeEditState(): void {
    if (this.isEdit && this.changesToSave()) {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '20vw',
        data: {
          title: 'Discard Changes',
          message: 'There are unsaved changes, do you wish to discard them?',
          negativeButton: 'No',
          positiveButton: 'Yes'
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.shadow = this.oldShadow.clone();
          this.skillSource.data = this.shadow.shadowSkills;
          this.negotSource.data = this.shadow.negotiates;
          this.dropSource.data = this.shadow.drops;
          this.isEdit = !this.isEdit;
        }
      });
    } else {
      this.isEdit = !this.isEdit;
    }
  }

  valChecker(): void {
    console.log(this.shadow);
    this.isEdit = !this.isEdit;
  }
}
