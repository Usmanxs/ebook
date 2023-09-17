"use client";
import React, { useState, useEffect } from "react";
import { Button, TextInput, Table, Loader, ScrollArea } from "@mantine/core";
import { searchProduct ,pushOrder} from "../actions/actions";
import { IconShoppingBagCheck, IconBackspace,} from "@tabler/icons-react";
import Cart from "./Cart";

interface ProductProps {
  user_id:number
  dist_code: number; // Pass dist_code as a prop from the parent component
  customerName:String;
  onCustomerNameChange:any;
  accountId:any;
 
}


function Products({  dist_code ,customerName , onCustomerNameChange ,accountId,user_id}: ProductProps) {

  const [search, setSearch] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [openCart,setOpenCart] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [discount, setDiscount] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [orderpopup ,setOrderpopup]=useState(false)
  const [totalPrice,setTotalPrice]=useState<number>(0);
 
  const openPopup = (product: any) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  // Function to close the pop-up dialog
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
    setQuantity(1);
    setDiscount(0);
    setBonus(0);
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
    if (selectedProduct) {
      // Check if the product is already in the cart
      const existingCartItemIndex = cart.findIndex((item) => item.ID === selectedProduct.ID);
  
      if (existingCartItemIndex !== -1) {
        // Product already exists in the cart, update its details
        const updatedCart = [...cart];
        const existingCartItem = updatedCart[existingCartItemIndex];
  
        // Update quantity, discount, and bonus
        existingCartItem.quantity += quantity;
        existingCartItem.discount += discount;
        existingCartItem.bonus += bonus;
  
        setCart(updatedCart);
      } else {
        // Product is not in the cart, add it
        const cartItem = {
          ...selectedProduct,
          quantity,
          discount,
          bonus,
        };
  
        // Add the product to the cart
        setCart([...cart, cartItem]);
      }
  
      // Close the pop-up dialog
      closePopup();
    }}
  const updateCartItem = (itemIndex: number, updatedItem: any) => {
    // Update the cart item at the specified index
    const updatedCart = [...cart];
    updatedCart[itemIndex] = updatedItem;
    setCart(updatedCart);
  };

  const deleteCartItem = (itemIndex: number) => {
    // Remove the cart item at the specified index
    const updatedCart = cart.filter((_, index) => index !== itemIndex);
    setCart(updatedCart);
  };

  const handleCart = () => {
    setOrderpopup(true)
  
  }
  const totalProducts= cart.length;
  const Allprice = (e:any)=>{
    setTotalPrice(e)
    
  }
  const handleSubmit = async () => {
    try {
      await pushOrder({
        user_id,
        dist_code,
        accountId,
        cart,
        totalProducts,
        totalPrice,
      });
      
    } catch (error) {
      // Handle the error
      console.error('Error pushing order to database:', error);
    }
    setOrderpopup(false)
  };
 


  return (
    <div>
      <div className="w-98 h-6">     <div className="p-2 flex justify-center"> {customerName}</div></div>
      {openCart==false&&<div>

       <div className="flex  justify-between m-5">
        <Button className="bg-black m-2" onClick={() => onCustomerNameChange(null)}> <IconBackspace/></Button>
    
        <div><Button className="bg-black m-2" onClick={() => {setOpenCart(true)}}><IconShoppingBagCheck> </IconShoppingBagCheck>{cart.length}</Button>
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
            <ScrollArea h={600} >
              <Table striped highlightOnHover miw={450}>
                <thead>
                  <tr>
                    <th className="border-gray-500 p-3">Product Name</th>
                    <th className="border-gray-500 p-3">Price</th>
                    <th className="border-gray-500 p-3">Stock</th>
                    <th className="border-gray-500 p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p: any) => (
                    <tr key={p.ID}>
                      <td className="border-b p-3">{p.name}</td>
                      <td className="border-b p-3">{p.tp}</td>
                      <td className="border-b p-3">{p.balance}</td>
                      <td className="border-b p-3">
                        <Button
                          compact
                          uppercase
                          onClick={() => openPopup(p)} // Open the pop-up dialog
                          className=" bg-black text-white"
                          >
                          ADD
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Add to Cart</h2>
            <p className="flex justify-between gap-2">Product:<span> {selectedProduct?.name}</span></p>
            <p className="flex justify-between">Price: <span>{selectedProduct?.tp}</span></p>
           <br />
            <p className="flex justify-between m-2 ">Quantity:   
        

            <input   className="w-12 "
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              />
             
              </p>
            <p className="flex justify-between m-2">Discount
          <span> <input 
          className="w-12"
          type="number"
          placeholder="Discount"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
            /></span></p>
            <p className="flex justify-between m-2"> Bonus<span>
            <input
              className="w-12"
              type="number"
              placeholder="Bonus"
              value={bonus}
              onChange={(e) => setBonus(Number(e.target.value))}
              /></span></p>
            <div className="flex justify-center mt-2">
              <Button  className="bg-black m-2"  uppercase onClick={closePopup}>Cancel</Button>
              <Button  className="bg-black m-2"   uppercase onClick={addToCart}>Submit</Button>
            </div>
          </div>
        </div>
      )}
   
      </div>}
      {/* Pop-up dialog */}
        
        
      {openCart== true && <div >
      <div className="flex  justify-between m-5">   
      <Button className="bg-black m-2" onClick={() => {setOpenCart(false)}}> <IconBackspace/></Button>
      <Button className="flex justify-end m-2 bg-black"  onClick={handleCart}>Confirm</Button>
      </div>
        <Cart cart={cart} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} Allprice={Allprice}/>
      </div>}

      { orderpopup &&<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Confirm the Order</h2>
     
      <p className="flex justify-between gap-2">
        Total Products:<span> {totalProducts}</span>
      </p>
      <p className="flex justify-between">
        Total Price: <span>{totalPrice}</span>
      </p>
      <br />

      <Button className="bg-black m-2" uppercase onClick={()=>{setOrderpopup(false)}}>
        Cancel
      </Button>
      <Button className="bg-black m-2" uppercase onClick={()=>{handleSubmit()}}>
        
        Submit
      </Button>
    </div>
  </div>}
    </div>
  );
}

export default Products;
