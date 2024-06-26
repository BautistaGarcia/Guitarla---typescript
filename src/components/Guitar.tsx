import type { Guitar } from "../types"
/* hace falta importar la especificacion del objeto con un type luego del import */

type GuitarProps = {
    // hay que especificar que el item que usa addToCart() para la funcion
    // tiene que cumplir con los requisitos indicados anteriormente
    // void unicamente indica que la funcion no tiene un return o no devuelve nada
    guitar: Guitar,
    addToCart: (item: Guitar) => void
}

export default
    // aca seteamos el typo de datos que queremos para guitar y
    // para la funcion addToCart para un codigo limpio y legible
    function Guitar({ guitar, addToCart }: GuitarProps) {

    const { name, image, description, price } = guitar


    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}
