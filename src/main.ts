import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  CardChipDelete,
  ICardChipDelete,
  ResolvePropsAvailable,
} from './custom';
export interface PropList {
  prop: string;
  prop2: number;
  prop3: {
    prop4: string;
  };
}

export type PropListArray = PropList[];

@Component({
  selector: 'app-root',
  imports: [CardChipDelete],
  template: `
    <h1>Generic Component</h1>
    <app-card-chip-delete 
      [data]="list" 
      (accept)="a($event)" 
      [resolveKey]="resolveKey"
      [resolveChipText]="resolveChipText"
      [resolveMessageText]="resolveMessageText"
      />
  `,
})
export class App implements ICardChipDelete<PropList> {
  resolveKey(utiliza_un_nombre_descriptivo: PropList): ResolvePropsAvailable {
    return utiliza_un_nombre_descriptivo.prop;
  }
  resolveChipText(
    utiliza_un_nombre_descriptivo: PropList
  ): ResolvePropsAvailable {
    return utiliza_un_nombre_descriptivo.prop2;
  }
  resolveMessageText(
    utiliza_un_nombre_descriptivo: PropList
  ): ResolvePropsAvailable {
    return utiliza_un_nombre_descriptivo.prop3.prop4;
  }

  name = 'Angular';
  list: PropListArray = [
    {
      prop: '1',
      prop2: 123,
      prop3: {
        prop4: 'hola',
      },
    },
  ];
  a($event: PropList) {
    alert($event.prop3.prop4);
  }
}

bootstrapApplication(App);
