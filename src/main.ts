import { Component, signal } from '@angular/core';
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
      [(data)]="list" 
      [key]="resolveKey"
      [chipText]="resolveChipText"
      [messageText]="resolveMessageText"
      (accept)="optimisticUpdate($event)" 
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
  list = signal<PropListArray>([
    {
      prop: '1',
      prop2: 123,
      prop3: {
        prop4: 'hola1',
      },
    },
    {
      prop: '2',
      prop2: 555,
      prop3: {
        prop4: 'hola2',
      },
    },
    {
      prop: '3',
      prop2: 333,
      prop3: {
        prop4: 'hola3',
      },
    },
    {
      prop: '4',
      prop2: 222,
      prop3: {
        prop4: 'hola4',
      },
    },
  ]);

  optimisticUpdate($event: PropList) {
    try {
      console.log($event.prop3.prop4);
      throw new Error('optimistic simulation')
    } catch (error) {
      this.list.update(
        (v)=>[...v,$event].sort(
          (a,b)=>a.prop2 - b.prop2
        )
      )
    }
  }
}

bootstrapApplication(App);
