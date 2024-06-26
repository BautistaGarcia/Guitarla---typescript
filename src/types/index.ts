
/* AL CREAR ARCHIVOS TYPES.D.TS NO HACE FALTA IMPORTAR
 A LOS DIFERENTES ARCHIVOS DONDE SE USE */




export type Guitar = {
    //--> type script type function
    // aca indicamos que tipo de dato queremos que sea cada uno de los objetos
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    // si no cumple las indicaciones de arriba se mostrara en el codigo
}

export type CartItem = Guitar & {// esta sintaxis es para heredar de Guitarra sus atributos y guardarlos en otra variable
    quantity: number;
}