import React, { useState, useEffect } from "react";
import { Button, Table,ScrollArea } from "@mantine/core";

interface CartProps {
  cart: any[];
  updateCartItem: (itemIndex: number, updatedItem: any) => void;
  deleteCartItem: (itemIndex: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateCartItem, deleteCartItem }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Calculate the total price whenever the cart or item details change
    const newTotalPrice = cart.reduce((total, item) => {
      const { tp, quantity, discount, bonus } = item;
      const totalPrice = tp * quantity;
      const discountedPrice = totalPrice - discount;
      const totalPriceWithBonus = discountedPrice + bonus;
      return total + totalPriceWithBonus;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [cart]); return (
    <div>
      <h1 className="text-cente ">Cart</h1>
      <ScrollArea  mah={600}>

      <Table striped highlightOnHover miw={450}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Bonus</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.tp}</td>
              <td>
                <input
                className="w-12"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                      const updatedItem = { ...item, quantity: Number(e.target.value) };
                      updateCartItem(index, updatedItem);
                  }}
                />
              </td>
              <td>
                <input
                     className="w-12"
                  type="number"
                  value={item.discount}
                  onChange={(e) => {
                      const updatedItem = { ...item, discount: Number(e.target.value) };
                      updateCartItem(index, updatedItem);
                    }}
                    />
              </td>
              <td>
                <input
                     className="w-12"
                  type="number"
                  value={item.bonus}
                  onChange={(e) => {
                      const updatedItem = { ...item, bonus: Number(e.target.value) };
                      updateCartItem(index, updatedItem);
                    }}
                    />
              </td>
              <td>{calculateTotal(item)}</td>
              <td>
                <Button variant="light" compact onClick={() => deleteCartItem(index)} color="red">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
</ScrollArea>
 <Table>
 <thead>
          <tr>
            <th> Total Products</th>
            <th>Total Price</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cart.length}</td>
            <td>{totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
        </Table>    
    </div>
  );
};

export default Cart;

function calculateTotal(item: any) {
    const { tp, quantity, discount, bonus } = item;
    const totalPrice = tp * quantity;
    const discountedPrice = totalPrice - discount;
  const totalPriceWithBonus = discountedPrice + bonus;
  return totalPriceWithBonus.toFixed(2);
}
