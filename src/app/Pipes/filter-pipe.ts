import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../Classes/Recipe';
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
    if (array0 instanceof Recipe) {
      if (fieldInfo === 'result' || fieldInfo === 'sources') {
        return this.transformFromRecipe(array, filter, fieldInfo);
      } else {
        return this.transformToRecipe(array, filter, fieldInfo);
      }
    } else if (tuple) {
      return this.transformAnyTuple(array, filter, fieldInfo);
    } else {
      console.warn('Filtering an unexpected array type return unmodified array');
      return array;
    }
  }

  private transformAnyTuple(array: any[], filter: string, fieldInfo: string): any[] {
    array.filter(tuple => {
      const obj = tuple[0];
      tuple[1] = obj[fieldInfo].toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
    return array;
  }

  private transformFromRecipe(array: Array<[Recipe, boolean]>, filter: string, fieldInfo: string): Array<[Recipe, boolean]> {
    array.forEach (tuple => {
      const recipe = tuple[0];
      let name: string;
      if (fieldInfo === 'sources') {
        name = recipe.sources[1].name;
      } else if (fieldInfo === 'result') {
        name = recipe.result.name;
      }
      tuple[1] = name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
    return array;
  }

  private transformToRecipe(array: Array<[Recipe, boolean]>, filter: string, personaName: string): Array<[Recipe, boolean]> {
    array.forEach (tuple => {
      let match = false;
      const recipe = tuple[0];
      recipe.sources.forEach(p =>  {
        if (!match) {
          match = p.name.toLocaleLowerCase().indexOf(filter.toLowerCase()) !== -1 && p.name !== personaName;
        }
      });
      if (!match) {
        match = recipe.result.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 && recipe.result.name !== personaName;
      }
      tuple[1] = match;
    });
    return array;
  }
}
