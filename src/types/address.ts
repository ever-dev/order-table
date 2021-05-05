export type TAddress = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
};

export class Address implements TAddress {
  line1: string = "";
  line2: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";

  constructor(params: any) {
    this.line1 = params.line1;
    this.line2 = params.line2;
    this.city = params.city;
    this.state = params.state;
    this.zip = params.zip;
  }

  get addressString() {
    return this.line1;
  }
}
