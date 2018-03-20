import { Pipe, PipeTransform } from '@angular/core';
import { Persona, Recipe } from '../Classes/Persona';
@Pipe({
  name: 'filterStr'
})


export class FilterPipe implements PipeTransform {
  transform(array: Array<any>, filter: string, personaName?: string): Array<any> {
    if (array.length === 0) {
      return array;
    }
    if (array[0] instanceof Persona) {
      return this.transformPersona(array, filter);
    }
    if (array[0] instanceof Recipe) {
      return this.transformRecipe(array, filter, personaName);
    }
  }

  private transformPersona(array: Array<Persona>, filter: string): Array<Persona> {
    return array.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
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
}
