import React from "react"
import "../styles/App.css"

import Product from "./Products"
import Cart from "./Cart"

export default props => {
  return (
    <div className="wrapper">
      <Product />
      <Cart />
    </div>
  )
}
