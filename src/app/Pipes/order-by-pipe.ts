import { Pipe, PipeTransform } from '@angular/core';
import { Persona } from '../Classes/Persona';
@Pipe({
  name: 'orderBy'
})

// This isn't really being used as actual pipe anymore so much as a repository for pipe-like
// functionality

export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, orderField, orderType: boolean, idx?: number): Array<any> {
    array.sort( ( a: any, b: any ) => {
      let ae = a[ orderField ];
      let be = b[ orderField ];
      if (orderField === 'arcana') {
        ae = Persona.getArcanaName(ae);
        be = Persona.getArcanaName(be);
      }
      if (orderField === 'stats'
      || orderField === 'elems'
      || orderField === 'personaSources'
      || orderField === 'arcanaSources') {
        ae = ae[idx];
        be = be[idx];
      }

      if ( ae === undefined && be === undefined ) {
        return 0;
      }
      if ( ae === undefined && be !== undefined ) {
        return orderType ? 1 : -1;
      }
      if ( ae !== undefined && be === undefined ) {
        return orderType ? -1 : 1;
      }
      if ( ae === be ) {
        return 0;
      }
      try {
        ae = ae as number;
        be = be as number;
        return orderType ? (ae > be ? -1 : 1) : (be > ae ? -1 : 1);
      } catch (exception) {
        return orderType ? (ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1) :
        (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
      }
    });
    return array;
  }
}
