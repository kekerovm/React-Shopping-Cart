import React from "react"
import { useCart } from "../hooks"

export default props => {
  const { cart, total, remove, add } = useCart()

  return (
    <div className="cart">
      <h1>Cart</h1>
      <div className="list">
        {cart.map(product => (
          <div className="product cart">
            <img src={product.img.thumb} />
            <p>{product.title}</p>
            <p>{product.price}</p>
            <p>quantity: {product.quantity}</p>
            <button onClick={e => remove(product.id)}>-</button>
            <button onClick={e => add(product.id)}>+</button>
          </div>
        ))}
      </div>
      <div className="total">
        <h2>Total: ${total}</h2>
      </div>
    </div>
  )
}
