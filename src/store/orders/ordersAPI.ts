// A mock function to mimic making an async request for data
export async function fetchOrders(): Promise<any[]> {
  const res = await fetch(
    "https://gist.githubusercontent.com/ryanjn/07512cb1c008a5ec754aea6cbbf4afab/raw/eabb4d324270cf0d3d17a79ffb00ff3cfaf9acc3/orders.json"
  );

  if (res.ok) {
    return res.json();
  } else {
    throw res;
  }
}
