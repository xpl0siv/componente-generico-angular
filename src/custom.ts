import { Component, ElementRef, computed, input, linkedSignal, model, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-card-chip-delete',
  template: `
   <dialog #dialog closedby="none">
      <form method="dialog">
        <p #message>&nbsp;</p>
        <button autofocus>Cancelar</button>
        <button (click)="accepted()">Aceptar</button>
      </form>
    </dialog>

    @for (entity of data(); track key()(entity)) {
      @let text = chipText()(entity);
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
  data = model.required<Array<T>>();
  entityToRemove = signal<T>({} as T);
  key = input.required<(entity: T) => string | number>();
  chipText = input.required<(entity: T) => string | number>();
  messageText = input.required<(entity: T) => string | number>();
  accept = output<T>();

  accepted() {
    const diff = this.key();
    this.data.update(
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
    span.innerText = '' + this.messageText()(entity);
    this.entityToRemove.set(entity);
  }
}
