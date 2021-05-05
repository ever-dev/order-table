import { Address, TAddress } from "./address";

export type TCustomer = {
  firstName: string;
  lastName: string;
  address: TAddress;
};

export class Customer implements TCustomer {
  firstName: string;
  lastName: string;
  address: Address;

  constructor(params: any) {
    this.firstName = params.first_name;
    this.lastName = params.last_name;
    this.address = new Address(params.address);
  }

  get fullName() {
    return `${this.lastName}, ${this.firstName}`;
  }
}
