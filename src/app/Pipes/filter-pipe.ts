import { Pipe, PipeTransform } from '@angular/core';
import { Recipe, FlatPersona } from '../Classes/FlatPersona';
import { FlatItem } from '../Classes/Item';
@Pipe({
  name: 'filterStr'
})


export class FilterPipe implements PipeTransform {
  transform(array: Array<any>, filter: string, personaName?: string): Array<any> {
    if (array.length === 0) {
      return array;
    }
    if (array[0] instanceof FlatPersona) {
      return this.transformPersona(array, filter);
    }
    if (array[0] instanceof Recipe) {
      return this.transformRecipe(array, filter, personaName);
    }
    if (array[0] instanceof FlatItem) {
      return this.transformItem(array, filter);
    }
  }

  private transformPersona(array: Array<FlatPersona>, filter: string): Array<FlatPersona> {
    return array.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  private transformItem(array: Array<FlatItem>, filter: string): Array<FlatItem> {
    return array.filter(i => i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  private transformRecipe(array: Array<Recipe>, filter: string, personaName: string): Array<Recipe> {
    return array.filter(recipe => {
      let match = false;
      recipe.sources.forEach(p =>  {
        if (!match) {
          match = p.personaName.toLocaleLowerCase().indexOf(filter.toLowerCase()) !== -1 && p.personaName !== personaName;
        }
      });
      if (!match) {
        match = recipe.result.personaName.toLowerCase().indexOf(filter.toLowerCase()) !== -1 && recipe.result.personaName !== personaName;
      }
      return match;
    });
  }
}
