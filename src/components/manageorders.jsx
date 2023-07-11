import { useOutletContext } from "react-router"

export default function ManageOrders() {
    const {token, orders, setOrders} = useOutletContext();

    return (
        <div>
        <h1>Manage Orders</h1>
          {orders && orders.length
          ? orders.map((order) => {
             return (
               <div id="admin-orders" key={order.id}>
                <div className="order-id">Id: {order.id}</div>
                <div className="order-user">User Id: {order.userId}</div>
                <div className="order-status">Status: {order.orderStatus}</div>
                <div className="order-price">Total: {order.totalPrice}</div>  
                <button>Update</button>
               </div>
              )
            })
         : null}
        </div>
    )
}