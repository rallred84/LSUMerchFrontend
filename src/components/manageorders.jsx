import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router";
import { getOrders, orderComplete } from "../api";
import { Button } from "@mui/material";

import '../css/ManageOrders.css'

export default function ManageOrders() {
    const {token, orders, setOrders, user, theme} = useOutletContext();
    // console.log(orders)

    useEffect(() => {
      if (user.isAdmin) {
        const fetchOrders = async () => {
          const fetchAllOrders = await getOrders(token);
          console.log(fetchAllOrders);
          setOrders(fetchAllOrders);
        };
        fetchOrders();
      }
    }, [user]);

    async function handleOrder(orderId) {
      const result = await orderComplete(token, orderId);
      console.log(result)
    }

    return (
        <div className="manage-orders-page">
        <h1>Manage Orders</h1>
          {orders && orders.length
          ? orders.map((order) => {
             return (
               <div className="admin-orders" key={order.id}>
                <div className="order-id">Id: {order.id}</div>
                <div className="order-user">User Id: {order.userId}</div>
                <div className="order-status">Status: {order.orderStatus}</div>
                <div className="order-price">Total: {order.totalPrice}</div>  
                {order.orderStatus === "Order Placed" && (
                <> 
                  <Button
                    onClick={() => {handleOrder(order.id)}}
                    variant="outlined"
                    theme={theme}
                  >
                  Complete
                  </Button>
                </> 
                )}
               </div>
              )
            })
         : null}
        </div>
    )
}