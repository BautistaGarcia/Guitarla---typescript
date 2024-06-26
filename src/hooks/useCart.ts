import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import { Guitar, CartItem } from '../types'

/* hook CUSTOM del carrito */
export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) { // existe en el carrito
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else { // no existe en el carrito
            const newItem : CartItem = {...item, quantity : 1}
            // al guitar no tener la propiedad quantity debemos transformarlo a un nuevo objecto que tenga todo lo d item + la cantidad
            setCart([...cart, newItem])
        }
    }

    function removeFromCart(id : Guitar['id']) { // LookUp es una sintaxis para hacer dinamico el tipo de dato segun la propiedad que indiauemos 'id' de la funcion Guitar !
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function decreaseQuantity(id : Guitar['id']) { // LookUp es una sintaxis para hacer dinamico el tipo de dato segun la propiedad que indiauemos 'id' de la funcion Guitar !
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function increaseQuantity(id : Guitar['id']) { // LookUp es una sintaxis para hacer dinamico el tipo de dato segun la propiedad que indiauemos 'id' de la funcion Guitar !
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }


    // State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {//--> asi podemos devolver hooks/funciones a la vista con el mismo nombre
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}