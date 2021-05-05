import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "./core/hooks";
import {
  selectOrders,
  fetchOrdersAction,
  selectIsOrdersLoading,
} from "./store/orders/ordersSlice";
import Table from "./components/table";
import { Order } from "./types/order";

function App() {
  const orders = useAppSelector(selectOrders);
  const isOrdersLoading = useAppSelector(selectIsOrdersLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetch orders when the component is loaded
    dispatch(fetchOrdersAction());
  }, []);

  return (
    <div className="App">
      {isOrdersLoading || !orders ? (
        <span>Loading...</span>
      ) : (
        <Table
          title="Orders"
          data={orders}
          columns={[
            {
              caption: "Order Number",
              getter: (value: Order) => value.orderNumber,
            },
            {
              caption: "Customer Name",
              getter: (value: Order) => value.customer.fullName,
            },
            {
              caption: "Customer Address",
              getter: (value: Order) => value.customer.address.addressString,
            },
            {
              caption: "Order Value",
              getter: (value: Order) => value.orderDetails.value,
              format: (value: number) => `$${value}`,
            },
            {
              caption: "Order Date",
              getter: (value: Order) => value.orderDetails.date,
              format: (value: Date) => value.toISOString().substr(0, 10),
            },
            {
              caption: "Ship date",
              getter: (value: Order) => value.shippingDetails.date,
              format: (value: Date) => value.toISOString().substr(0, 10),
            },
            {
              caption: "Status",
              getter: (value: Order) => value.status,
              format: (value: string) =>
                value.charAt(0).toUpperCase() + value.slice(1),
            },
          ]}
        />
      )}
    </div>
  );
}

export default App;
