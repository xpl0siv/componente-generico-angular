export namespace Properties {

    export interface Prop {
        prop: string;
        prop2: number;
        prop3: {
          prop4: string;
        };
    }

    export type PropListArray = Prop[];

    export function sortProps(a:Prop,b:Prop) {
        return a.prop2-b.prop2;
    }

}

export namespace CardChipDeleteModel {
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
    /**
     * Tratamiento de la lista en caso de error en la peticion
     * @param utiliza_un_nombre_descriptivo 
     */
    optimisticUpdate(utiliza_un_nombre_descriptivo: T): void;
    }
}