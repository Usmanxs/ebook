"use client";
import React, { useState, useEffect } from "react";
import { Button, TextInput, Table, Loader, ScrollArea } from "@mantine/core";
import { searchProduct, pushOrder } from "../actions/actions";
import { IconShoppingBagCheck, IconBackspace } from "@tabler/icons-react";
import Cart from "./Cart";
import { useRouter } from "next/navigation";


interface ProductProps {
  user_id: number;
  dist_code: number; 
  customerName: String;
  onCustomerNameChange: any;
  accountId: any;
}

function Products({
  dist_code,
  customerName,
  onCustomerNameChange,
  accountId,
  user_id,
}: ProductProps) {
  const [search, setSearch] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null| number>(null);
  const [productPrice,setProductPrice ] =useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [bonus, setBonus] = useState<number>();
  const [orderpopup, setOrderpopup] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
   const router =useRouter()
  const openPopup = (product: any) => {
    setSelectedProduct(product);
    setProductPrice(product?.tp)
    window.addEventListener('keydown', e=>{productPrice});
    setShowPopup(true);
  };
  
  
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
    setQuantity(undefined);
    setDiscount(undefined);
    setBonus(undefined);
    setProductPrice(undefined)
    
  };



  useEffect(() => {
    // Fetch products based on dist_code and search query
    if (search.trim() !== "") {
      setLoader(true);
      searchProduct(dist_code, search)
        .then((result: any) => {
          setProducts(result);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoader(false);
        });
    }
  }, [search]);

  const addToCart = () => {
    if (selectedProduct && quantity!=null && discount!=null && bonus!=null) {
      
      const existingCartItemIndex = cart.findIndex(
        (item) => item.ID === selectedProduct.ID
      );

      if (existingCartItemIndex !== -1) {
        // Product already exists in the cart, update its details
        const updatedCart = [...cart];
        const existingCartItem = updatedCart[existingCartItemIndex];

        // Update quantity, discount, and bonus
        existingCartItem.productPrice
        existingCartItem.quantity += quantity;
        existingCartItem.discount += discount;
        existingCartItem.bonus += bonus;

        setCart(updatedCart);
      } else {

        const cartItem = {
          ...selectedProduct,
          productPrice,
          quantity,
          discount,
          bonus,
        };

        
        setCart([...cart, cartItem]);
      }

      // Close the pop-up dialog
      closePopup();
    }
  };
  const updateCartItem = (itemIndex: number, updatedItem: any) => {
    // Update the cart item at the specified index
    const updatedCart = [...cart];
    updatedCart[itemIndex] = updatedItem;
    setCart(updatedCart);
  };

  const deleteCartItem = (itemIndex: number) => {
    const updatedCart = cart.filter((_, index) => index !== itemIndex);
    setCart(updatedCart);
  };

  const handleCart = () => {
    setOrderpopup(true);
  };

  const totalProducts = cart.length;
  const Allprice = (e: any) => {
    setTotalPrice(e);
  };
  const handleSubmit = async () => {
    try {
      setLoader(true);
      await pushOrder({
        user_id,
        dist_code,
        accountId,
        cart,
        totalProducts,
        totalPrice,
      });
      setLoader(false);
     
      router.push('/History')    
      setOrderpopup(false);
    } catch (error) {
      alert(error);
      setLoader(false);
      console.error("Error pushing order to database:", error);
    }
  };
  

  return (
    <div>
      <div className="w-98 h-6">
        {" "}
        <div className="p-2 flex justify-center"> {customerName}</div>
      </div>
      {openCart == false && (
        <div>
          <div className="flex  justify-between m-5">
            <Button
              className="bg-black m-2"
              onClick={() => onCustomerNameChange(null)}
            >
              {" "}
              <IconBackspace />
            </Button>

            <div>
              <Button
                className="bg-black m-2"
                onClick={() => {
                  setOpenCart(true);
                }}
              >
                <IconShoppingBagCheck> </IconShoppingBagCheck>
                {cart.length}
              </Button>
            </div>
          </div>
          <div>
            <div className="m-2">
              <div className="flex justify-center">
                <TextInput
                  className="w-full"
                  placeholder="Search Medicine"

                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {loader && <Loader color="dark" variant="dots"></Loader>}
              </div>

              <div className="overflow-x-auto">
                <ScrollArea h={600}>
                  <Table striped highlightOnHover miw={350}>
                    <thead>
                      <tr>
                        <th className="border-gray-500 p-3">Action</th>
                        <th className="border-gray-500 p-3">Product Name</th>
                        <th className="border-gray-500 p-3">Price</th>
                        <th className="border-gray-500 p-3">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p: any) => (
                        <tr key={p.ID}>
                            <Button
                              compact
                              uppercase
                              onClick={() => openPopup(p )} 
                              className=" bg-black text-white m-2"
                            >
                              ADD
                            </Button>
                          <td className="border-b p-3">{p.name}</td>
                          <td className="border-b p-3">{p.tp}</td>
                          <td className="border-b p-3">{p.balance}</td>
                          <td className="border-b p-3">
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ScrollArea>
              </div>
            </div>
          </div>

          {showPopup &&  (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center m-2">Add to Cart</h2>
                <p className="flex justify-between gap-2 ">
                  Product:<span> {selectedProduct?.name}</span>
                </p>
                
                  <br />
                <p className="flex justify-between m-2">
                  Price: 
                  <input 
                  className="w-12 "
                  type="number"
                  min={0}
                value={productPrice}
                  autoFocus
                  required
                   onChange={(e) => setProductPrice(Number(e.target.value))}
                   />
                </p>
               <p className="flex justify-between m-2 ">
                  Quantity:
                 


                  <input
                    className="w-12 "
                    min={1}
                    type="number"
                    placeholder="1"
                    value={quantity}
                    
                   required
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </p>
              
                <p className="flex justify-between m-2">
                  Discount
                  <span>
                    {" "}
                    <input
                      className="w-12"
                      type="number"
                      min={0}
                      max={100}
                      placeholder="0%"
                     
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      required
                    />
                  </span>
                </p>
         
                <p className="flex justify-between m-2">
                  {" "}
                  Bonus
                  <span>
                    <input
                      className="w-12"
                      type="number"
                      placeholder="0"
                      min={0}
                      value={bonus}
                      onChange={(e) => setBonus(Number(e.target.value))}
                      required
                      
                    />
                  </span>
                </p>
           
                <div className="flex justify-center mt-2">
                  <Button
                    className="bg-black m-2"
                    uppercase
                    onClick={closePopup}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-black m-2"
                    uppercase
              
                    onClick={addToCart}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    

      {openCart == true && (
        <div>
          <div className="flex  justify-between m-5">
            <Button
              className="bg-black m-2"
              onClick={() => {
                setOpenCart(false);
              }}
            >
              {" "}
              <IconBackspace />
            </Button>
            <Button
              className="flex justify-end m-2 bg-black"
              onClick={handleCart}
            >
              Confirm
            </Button>
          </div>
          <Cart
            cart={cart}
            updateCartItem={updateCartItem}
            deleteCartItem={deleteCartItem}
            Allprice={Allprice}
          />
        </div>
      )}

      {orderpopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Confirm the Order</h2>

            <p className="flex justify-between gap-2">
              Total Products:<span> {totalProducts}</span>
            </p>
            <p className="flex justify-between">
              Total Price: <span>{totalPrice}</span>
            </p>
            <br />

            <Button
              className="bg-black m-2"
              uppercase
              onClick={() => {
                setOrderpopup(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-black m-2"
              uppercase
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
            {loader && <Loader color="dark" variant="dots"></Loader>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
