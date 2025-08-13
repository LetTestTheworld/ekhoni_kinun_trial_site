// operations/usePlaceOrder.js
import axios from "axios";
import UseUser from "../../common_component/UseUser";

function usePlaceOrder() {
  const username = UseUser().username;
  const placeOrder = async (shop_owner_username, product_slug, product_id, quantity, total_price, phone_number, city, upazila, address_to_deliver, zip_code) => {
    console.log(zip_code)
    try {
      const { data } = await axios.post('/place-order', {shop_owner_username, username, product_slug, product_id, quantity, total_price, phone_number, city, upazila, address_to_deliver, zip_code });
      sessionStorage.setItem('respondedMessage', data.success);
      return data;
    } catch (error) {
      console.error("Order failed:", error);
      throw error;
    }
  };

  return { placeOrder }; // Return the function
}

export default usePlaceOrder;