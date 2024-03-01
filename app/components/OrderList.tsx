import React, { useEffect, useState } from "react";
import { fetchOrders, getCustumer, getUser } from "../actions/actions";
import { useRouter } from "next/navigation";
import { IconBackspace } from "@tabler/icons-react";
import { Loader, Table, Button, ScrollArea } from "@mantine/core";


interface Order {
  id: number;
  user_id: number;
  dist_code: number;
  accountId: number;
  cart: any;
  totalProducts: number;
  totalPrice: number;
  createdAt: string;
}

function ProductTable({ products }: { products: any[] }) {

  return (
    <ScrollArea h={300}>
    <Table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Discount</th>
          <th>Bonus</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any, index: number) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.tp}</td>
            <td>{product.quantity}</td>
            <td>{product.discount}</td>
            <td>{product.bonus}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </ScrollArea>
  );
}
function formatDateTime(dateTimeString: string): string {
  const inputDate = new Date(dateTimeString);

  const timePart = inputDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const datePart = inputDate.toLocaleDateString([], {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return `${timePart} ${datePart}`;
}
function OrderList() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false)
  const [selectedorder, setSelectedorder] = useState<any>()

  useEffect(() => {
    // Fetch orders when the component mounts
    async function fetchData() {
      const result = await fetchOrders();

      if (result.success) {
        const ordersWithFormattedData = result.orders.map((order: any) => ({
          ...order,
          createdAt: formatDateTime(order.createdAt),
          cart: JSON.parse(order.cart),
        }));

        setOrders(ordersWithFormattedData);
        setLoading(false);
      } else {
        console.error(result.error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  const openPopup = (order: any) => {
    setSelectedorder(order)
    setShowPopup(true)

  }

  return (
    <div className=" m-2 ">
      <Button
        className="bg-black m-2"
        onClick={() => {
          router.push("/");
        }}
      >
        {" "}
        <IconBackspace />
      </Button>
      <div className="flex  justify-center">
        <h1 className="text-center  m-2">Order List</h1>
      </div>
      {loading ? (
        <div className="flex justify-center">
          Loading
          <Loader color="dark" variant="dots" />
        </div>

      ) : (
        <ScrollArea h={700}>
          <Table striped highlightOnHover miw={250}>
            <thead>
              <tr>
            
                <th className="text-xs">Total Products</th>
                <th className="text-xs">Total Price</th>
                <th className="text-xs">Customer ID</th>
                <th className="text-xs">Created At</th>
                <th className="text-xs">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  
                  <td className="text-xs ">{order.totalProducts}</td>
                  <td className="text-xs">{order.totalPrice}</td>
                  <td className="text-xs">{order.accountId}</td>

                  <td className="text-xs">{order.createdAt}</td>
                  <Button
                    className="bg-black mt-2 text-xs"
                    onClick={() => {
                      openPopup(order)
                    }}
                  >
                    Details
                  </Button>
                </tr>
                  ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}

      {showPopup && (<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Button
          
            className="bg-black m-2"
            onClick={() => {
              setShowPopup(false)
            }}
          >
         <IconBackspace />
          </Button>
          <h2 className="text-xl font-semibold text-center m-2">Customer id : {selectedorder.accountId}</h2>
          <ProductTable products={selectedorder.cart} />

        </div></div>)}
    </div>
  );
}

export default OrderList;
