import React, { useState, useEffect, useContext } from 'react';
import { PizzaTarjeta } from '../../component/pizzatarjeta/PizzaTarjeta';
import { CartContext } from '../../context/CartContext';



export const Cart = () => {
  const { cart, handleIncrement, handleDecrement } = useContext(CartContext)
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcularTotal();
  }, [cart]);

  const calcularTotal = () => {
    let totalPizzas = 0;
    cart.forEach(pizza => {
      const price = pizza.price || 0;
      const count = pizza.count || 0;
      totalPizzas += price * count;
    });
    setTotal(totalPizzas);
  };

  if (!cart || cart.length === 0) {
    return <div>
    <p style={{margin:'3rem', fontSize:'30px'}}>No hay pizzas en el carrito.</p> 
    <img src='/cebolla.jpg' alt='cebolla-triste' style={{width:'400px', marginLeft:'5rem'}} /> 
    </div>
    ;
  };



  return (
    
    <div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop:'6rem', height:'100%'}}>
        {cart.length === 0 ? (
          <p style={{margin:'3rem', width: '800px'}}>No hay pizzas en el carrito.</p>
        ) : (
          cart.map(pizza => (
            <PizzaTarjeta 
              key={pizza.id}
              pizza={pizza}
              increment={handleIncrement}
              decrement={handleDecrement}
            />
          ))
        )}
      </div>
      <h4 style={{margin:'5rem', fontWeight: 'bold', width: '800px',paddingBottom:'3rem'}}>Total: ${total}</h4>
    </div>
  );
};

export default Cart;
