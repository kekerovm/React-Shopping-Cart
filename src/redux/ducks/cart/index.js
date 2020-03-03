import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const ADD_TO_CART = "cart/ADD_TO_CART"
const REMOVE_FROM_CART = "cart/remove_from_cart"

const initialState = {
  cart: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const exists =
        state.cart.filter(product => product.id === action.payload.id).length >
        0
      if (exists) {
        const item = state.cart.find(
          product => product.id === action.payload.id
        )
        item.quantity = item.quantity + 1

        return {
          ...state,
          cart: state.cart.map(p => (item.id === p.id ? item : p))
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        }
      }
    case REMOVE_FROM_CART:
      if (state.cart.find(item => item.id === action.payload).quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload)
        }
      } else {
        return {
          ...state,
          cart: state.cart.map(item => {
            if (item.id === action.payload) {
              item.quantity = item.quantity - 1
              return item
            } else {
              return item
            }
          })
        }
      }
    default:
      return state
  }
}

function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: product
  }
}

function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    payload: id
  }
}

export function useCart() {
  const dispatch = useDispatch()
  const add = product => dispatch(addToCart(product))
  const remove = id => dispatch(removeFromCart(id))
  const cart = useSelector(appState => appState.cartState.cart)
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)

  return { add, cart, total, remove }
}
