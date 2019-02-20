import { Pipe, PipeTransform } from '@angular/core';
import { FlatPersona } from '../Classes/FlatPersona';
import { Recipe } from '../Classes/Recipe';
import { FlatItem } from '../Classes/FlatItem';
import { FlatSkill } from '../Classes/FlatSkill';
import { FlatActivity } from '../Classes/FlatActivity';
import { getAvailableTimes, getAvailableTimeName } from '../Enums/AvailableTime';
@Pipe({
  name: 'filterStr'
})


export class FilterPipe implements PipeTransform {
  transform(array: Array<any>, filter: string, fieldInfo?: string): Array<any> {
    if (array.length === 0) {
      return array;
    }
    if (array[0] instanceof FlatPersona) {
      return this.transformPersona(array, filter);
    } else if (array[0] instanceof Recipe) {
      return this.transformRecipe(array, filter, fieldInfo);
    } else if (array[0] instanceof FlatItem) {
      return this.transformItem(array, filter);
    } else if (array[0] instanceof FlatSkill) {
      return this.transformSkill(array, filter);
    } else if (array[0] instanceof FlatActivity) {
      return this.transformActivity(array, filter, fieldInfo);
    } else {
      console.warn('Filtering an unexpected array type return unmodified array');
      return array;
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

  private transformSkill(array: Array<FlatSkill>, filter: string): Array<FlatSkill> {
    return array.filter(s => s.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  private transformActivity(array: Array<FlatActivity>, filter: string, fieldInfo: string): Array<FlatActivity> {
    return array.filter(activity => {
      if (fieldInfo === 'Location') {
        return activity.locationName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      } else { // Available Time
        const availTimes = getAvailableTimes(activity.availableTimes);
        let stringTimes = '';
        availTimes.forEach(time => {
          stringTimes += getAvailableTimeName(time) + ' ';
        });
        return stringTimes.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      }
    });
  }
}
