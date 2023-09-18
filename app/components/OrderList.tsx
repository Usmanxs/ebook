import React, { useEffect, useState } from "react";
import { fetchOrders, getCustumer, getUser } from "../actions/actions";
import { useRouter } from "next/navigation";
import { IconBackspace } from "@tabler/icons-react";
import { Loader, Table, Button ,ScrollArea } from "@mantine/core";

// Define the type for an order
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
        <p>
          Loading
          <Loader color="dark" variant="dots" />
        </p>
      ) : (
        <ScrollArea h={700}>
          <Table striped highlightOnHover miw={450}>
            <thead>
              <tr>
                <th>UserId</th>
                <th>Customer ID</th>
                <th>Total Products</th>
                <th>Total Price</th>
                <th>Products</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.user_id}</td>
                  <td>{order.accountId}</td>
                  <td>{order.totalProducts}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <ProductTable products={order.cart} />
                  </td>
                  <td>{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
}

export default OrderList;
