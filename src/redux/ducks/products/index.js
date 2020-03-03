import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_PRODUCTS = "products/GET_PRODUCTS"

const initialState = {
  products: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload }
    default:
      return state
  }
}

function getProducts() {
  return dispatch => {
    axios.get("/products").then(resp => {
      dispatch({
        type: GET_PRODUCTS,
        payload: resp.data
      })
    })
  }
}

export function useProducts() {
  const dispatch = useDispatch()
  const products = useSelector(appState => appState.productState.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return { products }
}
