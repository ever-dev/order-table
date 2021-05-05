import { Order } from "./../../types/order";

export const mockData = [
  {
    order_number: 100000,
    customer: {
      first_name: "John",
      last_name: "Doe",
      address: {
        line1: "123 Main Street",
        line2: "",
        city: "Boston",
        state: "MA",
        zip: "02215",
      },
    },
    order_details: {
      value: 137.11,
      date: "Mon Feb 01 2021 00:00:00 GMT+0000 (GMT)",
    },
    shipping_details: {
      date: "Wed Feb 03 2021 00:00:00 GMT+0000 (GMT)",
    },
    status: "open",
  },
  {
    order_number: 100005,
    customer: {
      first_name: "Mary",
      last_name: "Smith",
      address: {
        line1: "555 Broadway",
        line2: "",
        city: "New York",
        state: "NY",
        zip: "12345",
      },
    },
    order_details: {
      value: 157.12,
      date: "Sun Mar 01 2021 00:00:00 GMT+0000 (GMT)",
    },
    shipping_details: {
      date: "Tue Mar 03 2021 00:00:00 GMT+0000 (GMT)",
    },
    status: "shipped",
  },
  {
    order_number: 1000101,
    customer: {
      first_name: "Dakota",
      last_name: "Finley",
      address: {
        line1: "999 South Bend Road",
        line2: "",
        city: "Charleston",
        state: "MSC",
        zip: "38672",
      },
    },
    order_details: {
      value: 98.99,
      date: "Tue Jan 10 2021 00:00:00 GMT+0000 (GMT)",
    },
    shipping_details: {
      date: "Wed Jan 13 2021 00:00:00 GMT+0000 (GMT)",
    },
    status: "cancelled",
  },
].map((item) => new Order(item));

export const mockColumns = [
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
    format: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  },
];
