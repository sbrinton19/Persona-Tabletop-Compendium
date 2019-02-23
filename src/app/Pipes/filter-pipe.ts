import { Pipe, PipeTransform } from '@angular/core';
import { FlatPersona } from '../Classes/FlatPersona';
import { Recipe } from '../Classes/Recipe';
import { FlatItem } from '../Classes/FlatItem';
import { FlatSkill } from '../Classes/FlatSkill';
import { FlatActivity } from '../Classes/FlatActivity';
@Pipe({
  name: 'filterStr'
})


export class FilterPipe implements PipeTransform {
  transform(array: Array<any>, filter: string, fieldInfo: string, tuple = false): Array<any> {
    if (array.length === 0) {
      return array;
    }
    let array0 = array[0];
    if (tuple) {
      array0 = array0[0];
    }
    if (array0 instanceof FlatPersona) {
      return this.transformPersona(array, filter, fieldInfo);
    } else if (array0 instanceof Recipe) {
      return this.transformRecipe(array, filter, fieldInfo);
    } else if (array0 instanceof FlatItem) {
      return this.transformItem(array, filter, fieldInfo);
    } else if (array0 instanceof FlatSkill) {
      return this.transformSkill(array, filter, fieldInfo);
    } else if (array0 instanceof FlatActivity) {
      return this.transformActivity(array, filter, fieldInfo);
    } else {
      console.warn('Filtering an unexpected array type return unmodified array');
      return array;
    }
  }

  private transformPersona(array: Array<FlatPersona>, filter: string, fieldInfo: string): Array<FlatPersona> {
    return array.filter(p => p[fieldInfo].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  private transformItem(array: Array<FlatItem>, filter: string, fieldInfo: string): Array<FlatItem> {
    return array.filter(i => i[fieldInfo].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  private transformRecipe(array: Array<Recipe>, filter: string, personaName: string): Array<Recipe> {
    return array.filter(recipe => {
      let match = false;
      recipe.sources.forEach(p =>  {
        if (!match) {
          match = p.name.toLocaleLowerCase().indexOf(filter.toLowerCase()) !== -1 && p.name !== personaName;
        }
      });
      if (!match) {
        match = recipe.result.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 && recipe.result.name !== personaName;
      }
      return match;
    });
  }

  private transformSkill(array: Array<FlatSkill>, filter: string, fieldInfo: string): Array<FlatSkill> {
    return array.filter(s => s[fieldInfo].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  private transformActivity(array: Array<[FlatActivity, boolean]>, filter: string, fieldInfo: string): Array<[FlatActivity, boolean]> {
    array.forEach(tuple => {
      const activity = tuple[0];
      tuple[1] = activity[fieldInfo].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
    return array;
  }
}
