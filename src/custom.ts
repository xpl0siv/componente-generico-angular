import { Component, ElementRef, computed, input, linkedSignal, output, signal, viewChild } from '@angular/core';

export type ResolvePropsAvailable = string | number;
export type ResolveProps<T> = (
  utiliza_un_nombre_descriptivo: T
) => string | number;

export interface ICardChipDelete<T> {
  /**
   * Utilizado para establecer el track en el `@for`
   * @param utiliza_un_nombre_descriptivo
   */
  resolveKey(utiliza_un_nombre_descriptivo: T): ResolvePropsAvailable;
  /**
   * Utilizado para mostrar el valor en la chip
   * @param utiliza_un_nombre_descriptivo
   */
  resolveChipText(utiliza_un_nombre_descriptivo: T): ResolvePropsAvailable;
  /**
   * Utilizado para mostrar el mensaje de confirmación
   * @param utiliza_un_nombre_descriptivo T
   */
  resolveMessageText(utiliza_un_nombre_descriptivo: T): ResolvePropsAvailable;
}

@Component({
  selector: 'app-card-chip-delete',
  template: `
   <dialog #dialog closedby="none">
      <form method="dialog">
        <p #message>&nbsp;</p>
        <button (click)="cancel()" autofocus>Cancelar</button>
        <button (click)="accepted()">Aceptar</button>
      </form>
    </dialog>

    @for (entity of currentData(); track resolveKey()(entity)) {
      @let text = resolveChipText()(entity);
      <button (click)="modalConfirm(entity)">
        <span>{{text}}</span>
        <span>&nbsp;&times;</span>
      </button>
    }
   
  `,
})
export class CardChipDelete<T> {

  dialog = viewChild('dialog', { read: ElementRef<HTMLDialogElement> });
  message = viewChild('message', { read: ElementRef<HTMLParagraphElement> });

  data = input.required<Array<T>>();
  currentData = linkedSignal<Array<T>,Array<T>>({
    source: ()=>this.data(),
    computation: ()=>{
      return this.data()
    }
  });

  entityToRemove = signal<T>({} as T);

  resolveKey = input.required<(entity: T) => string | number>();
  resolveChipText = input.required<(entity: T) => string | number>();
  resolveMessageText = input.required<(entity: T) => string | number>();
  accept = output<T>();

  cancel() {

  }

  accepted() {
    const diff = this.resolveKey();
    this.currentData.update(
      (data) => 
        {
          return data.filter(
            (entityToRemove)=>{
              return diff(entityToRemove)!==diff(this.entityToRemove())
            }
          )
        }
      )
    this.accept.emit(this.entityToRemove());
  }


  modalConfirm(entity: T) {
    this.dialog()?.nativeElement.showModal();
    const span = this.message()?.nativeElement as HTMLParagraphElement;
    span.innerText = '' + this.resolveMessageText()(entity);



    this.entityToRemove.set(entity);
    
    //accept.emit(entity)
  }
}
