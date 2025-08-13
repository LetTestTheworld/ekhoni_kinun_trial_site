import axios from "axios";
import { useEffect, useState } from "react";

function CartOperations() {
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const addToCart = async (customer_username, product_slug, product_id, quantity, total_price) => {
    try {
      const { data } = await axios.post('/add-to-cart', { customer_username, product_slug, product_id, quantity, total_price });
      sessionStorage.setItem('respondedMessage', data.success);
      return data;
    } catch (error) {
      console.error("Order failed:", error);
      throw error;
    }
  };

  useEffect(() => {
    
    getCartItems()
  }, []);
  async function getCartItems() {
    const { data } = await axios.get('/cart-items')
    setCartItems(data.carts);
    setLoader(false);
  }

  async function deleteCartItem(cartId) {
    const { data } = await axios.delete(`/remove-item/${cartId}`);
    getCartItems()
    sessionStorage.setItem('respondedMessage', data.success);
    return data;
  }
  return { addToCart, cartItems, loader, deleteCartItem }; // Return the function
}

export default CartOperations;