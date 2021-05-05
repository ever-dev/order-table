import { Customer, TCustomer } from "./customer";

export type TOrderDetails = {
  value: number;
  date: Date;
};

export type TShippingDetails = {
  date: Date;
};

export enum EOrderStatus {
  Open = "open",
  Shipped = "shipped",
  Cancelled = "cancelled",
}

export type TOrder = {
  orderNumber: number;
  customer: TCustomer;
  orderDetails: TOrderDetails;
  shippingDetails: TShippingDetails;
  status: EOrderStatus;
};

export class Order implements TOrder {
  orderNumber: number;
  customer: Customer;
  orderDetails: TOrderDetails;
  shippingDetails: TShippingDetails;
  status: EOrderStatus;

  public constructor(params: any) {
    this.orderNumber = params.order_number;
    this.customer = new Customer(params.customer);
    this.orderDetails = {
      value: params.order_details.value,
      date: new Date(params.order_details.date),
    };
    this.shippingDetails = {
      date: new Date(params.shipping_details.date),
    };
    this.status = params.status;
  }

  get id() {
    return this.orderNumber;
  }
}
