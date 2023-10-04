import React, { useState, useEffect } from "react";
import { Button, Table, ScrollArea } from "@mantine/core";

interface CartProps {
  cart: any[];
  updateCartItem: (itemIndex: number, updatedItem: any) => void;
  deleteCartItem: (itemIndex: number) => void;
  Allprice: any;
}
const Cart: React.FC<CartProps> = ({
  cart,
  updateCartItem,
  deleteCartItem,
  Allprice,
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
   
    const newTotalPrice = cart.reduce((total, item) => {
      const { productPrice, quantity, discount} = item;
      const totalPrice = productPrice * quantity;
      const discountedPrice =  totalPrice - (totalPrice * discount) / 100 ;
  
      return total + discountedPrice;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);
  Allprice(totalPrice)
  
  return (
    <div>
      <h1 className="flex text-center ">Cart</h1>
      <ScrollArea mah={600}>
        <Table striped highlightOnHover miw={350}>
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
                <td>  <input
                    className="w-12"
                    type="number"
                    value={item.productPrice}
                    onChange={(e) => {
                      const updatedItem = {
                        ...item,
                        productPrice: Number(e.target.value),
                      };
                      updateCartItem(index, updatedItem);
                    }}
                  /></td>
                <td>
                  <input
                    className="w-12"
                    type="number"
                    value={item.quantity}
                    min={1}

                    onChange={(e) => {
                      const updatedItem = {
                        ...item,
                        quantity: Number(e.target.value),
                      };
                      updateCartItem(index, updatedItem);
                    }}
                  />
                </td>
                <td>
                  <input
                    className="w-12"
                    min={0}
                    max={100}
                    type="number"
                    value={item.discount}
                    onChange={(e) => {
                      const updatedItem = {
                        ...item,
                        discount: Number(e.target.value),
                      };
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
                      const updatedItem = {
                        ...item,
                        bonus: Number(e.target.value),
                      };
                      updateCartItem(index, updatedItem);
                    }}
                  />
                </td>
                <td>{calculateTotal(item)}</td>
                <td>
                  <Button
                    variant="light"
                    compact
                    onClick={() => deleteCartItem(index)}
                    color="red"
                  >
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
            <td>{totalPrice}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;

function calculateTotal(item: any) {
  const { productPrice , quantity, discount } = item;
  const totalPrice = productPrice * quantity;
  const discountedPrice = totalPrice - discount;
  const totalPriceWithBonus = discountedPrice ;
  return totalPriceWithBonus.toFixed(2);
}
