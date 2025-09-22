import { useState, useEffect } from "react";
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Loader2} from 'lucide-react'

const Cart = () => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const isLogin = useSelector((state) => state.login.isLogin)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + cur.product.price*cur.quantity, 0))
  }, [cart])

  useEffect(() => {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/getcart`,{}, {
        withCredentials: true
    })
    .then((res) => {
        setCart(res.data.cart)
        setLoading(false) 
    })
    .catch((err) => {
        console.log(err.message)
        setLoading(false)
    })
  }, []);

  const incrementQuantity = (id) => {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/addtocart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => (item.product._id===id) ? ({...item, quantity:item.quantity+1}) : item))
        setLoading(false)
    })
    .catch((err) => {
        console.log(err.message)
        setLoading(false)
    })
  };

  // Decrease quantity
  const decrementQuantity = (id) => {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/removefromcart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => item.product._id===id ? ({...item, quantity:item.quantity-1}) : item).filter((item) => item.quantity>0))
        setLoading(false)
    })
    .catch((err) => {
        console.log(err.message)
        setLoading(false)
    })
  };

  // Remove item from cart
  const removeItem = (id) => {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/deletefromcart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => item.product._id===id ? {...item, quantity:-1} : item).filter((item) => item.quantity!==-1))
        setLoading(false)
    })
    .catch((err) => {
        console.log(err)
        setLoading(false)
    })
  };

  const buyHandler = (e) => {
    
  }


  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* {loading && <div className = 'z-100 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed flex justify-center items-center'>
        <Loader2 className="w-10 h-10 animate-spin text-gray-600"/>
      </div>} */}
      {loading && (
        <>
          <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
          <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
        </>
      )}

      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(({product, quantity}) => (
            <div key={product._id} className="flex items-center gap-4 border-b pb-4 mb-4">
              <img src={product.photo} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">Price: ₹{product.price}</p>
                <p className="text-gray-500">{product.category} - {product.region}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => decrementQuantity(product._id)} 
                    className="bg-gray-300 px-2 py-1 rounded"
                  > - </button>

                  <span>{quantity}</span>

                  <button 
                    onClick={() => incrementQuantity(product._id)} 
                    className="bg-gray-300 px-2 py-1 rounded"
                  > + </button>
                </div>

                <button 
                  onClick={() => removeItem(product._id)} 
                  className="text-red-500 mt-2"
                >Remove</button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-lg">
            Total: ₹{total}
          </div>

          <button onClick={buyHandler} className="bg-yellow-500 text-white px-4 py-2 rounded mt-4">
            Proceed to Buy
          </button>
        </>
      )}
    </div>
  );
};

export default Cart