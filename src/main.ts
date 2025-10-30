import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CardChipDelete } from './custom';

import data from './data.json';
import { CardChipDeleteModel, Properties } from './model';

@Component({
  selector: 'app-root',
  imports: [CardChipDelete],
  template: `
    <h1>{{name}}</h1>
    <app-card-chip-delete 
      [(data)]="list" 
      [key]="resolveKey"
      [chipText]="resolveChipText"
      [messageText]="resolveMessageText"
      (accept)="optimisticUpdate($event)" 
      />
  `,
})
export class App implements CardChipDeleteModel.ICardChipDelete<Properties.Prop> {

  name = 'Generic Component';

  list = signal<Properties.PropListArray>(data.sort(Properties.sortProps));

  resolveKey(utiliza_un_nombre_descriptivo: Properties.Prop): CardChipDeleteModel.ResolvePropsAvailable {
    return utiliza_un_nombre_descriptivo.prop;
  }
  resolveChipText(
    utiliza_un_nombre_descriptivo: Properties.Prop
  ): CardChipDeleteModel.ResolvePropsAvailable {
    return utiliza_un_nombre_descriptivo.prop2;
  }
  resolveMessageText(
    utiliza_un_nombre_descriptivo: Properties.Prop
  ): CardChipDeleteModel.ResolvePropsAvailable {
    return utiliza_un_nombre_descriptivo.prop3.prop4;
  }

  optimisticUpdate(utiliza_un_nombre_descriptivo: Properties.Prop) {
    try {
      console.log(utiliza_un_nombre_descriptivo.prop3.prop4);
      throw new Error('optimistic simulation')
    } catch (error) {
      this.list.update(
        (v)=>[...v,utiliza_un_nombre_descriptivo].sort(Properties.sortProps)
      )
    }
  }
}

bootstrapApplication(App);
