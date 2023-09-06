"use client";
import { useState, useEffect } from "react";
import { Button, TextInput, Table, Loader, ScrollArea,Text as MantineText } from "@mantine/core";
import { searchProduct } from "../app/actions/actions";

interface ProductProps {
  dist_code: number; // Pass dist_code as a prop from the parent component
}

function Products({ dist_code }: ProductProps) {
  const [search, setSearch] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // Fetch products based on dist_code and search query
    if (search.trim() !== "") {
      searchProduct(dist_code, search) 
      .then((result: any) => {
        setLoader(true)
        setProducts(result);
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoader(false)
      });
    }
  });
  const AddToCart = () => {
    // Check if a sector, area, and customer have been selected
  };
  return (
    <div>
      <div className="w-full h-4"> </div>
      <div>
        <div className=" m-2">
        
            <div className="flex  justify-center">
              <TextInput
                className="w-full"
                placeholder="Search Medicine"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                 {loader && <Loader color="dark" variant="dots"></Loader>}
            </div>

            <div className="overflow-x-auto ">
            <ScrollArea h={500} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
              <Table striped highlightOnHover withColumnBorders miw={450}>
                <thead>
                  <tr>
                    <th className="border-gray-500 p-3">Product Name</th>
                    <th className="border-gray-500  p-3">Price</th>
                    <th className="border-gray-500  p-3">Retail Price</th>
                    <th className="border-gray-500 p-3">Available</th>
                    <th className="border-gray-500 p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p: any) => (
                    <tr key={p.ID}>
                      <td className="border-b p-3">{p.name}</td>
                      <td className="border-b p-3">{p.tp}</td>
                      <td className="border-b p-3">{p.rp}</td>
                      <td className="border-b p-3">{p.active}</td>
                      <td className="border-b p-3">
                        <Button
                          compact
                          uppercase
                          onClick={() => {
                            setCart([...cart, p]);
                          }}
                          className="p-2 bg-black text-white"
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

            {/* ... Other form fields ... */}
        
        </div>
      </div>
    </div>
  );
}

export default Products;
