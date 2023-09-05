// OrderCreate.tsx

import { useState, useEffect } from "react";
import {
  getSectors,
  getAreaBySector,
  getCustumer,
  searchProduct,
} from "../app/actions/actions";
import { useRouter } from "next/router";

import {
  Text,
  Paper,
  Autocomplete,
  Button,
  Input, Table ,
  Select,
  Text as MantineText,
} from "@mantine/core";

interface OrderCreateProps {
  dist_code: number; // Pass dist_code as a prop from the parent component
}

export default function OrderCreate({ dist_code }: OrderCreateProps) {
  const [sectors, setSectors] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]); // Added customers state
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Fetch sectors based on dist_code
    getSectors()
      .then((result: any) => {
        setSectors(result);
      })
      .catch((error) => {
        console.error("Error fetching sectors:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch areas based on selected sector (seccd)
    if (selectedSector !== null) {
      getAreaBySector({ seccd: selectedSector })
        .then((result: any) => {
          setAreas(result);
        })
        .catch((error) => {
          console.error("Error fetching areas:", error);
        });
    }
  }, [selectedSector]);

  useEffect(() => {
    // Fetch customers based on selected area (areacd)
    if (selectedArea !== null) {
      getCustumer({ areacd: selectedArea })
        .then((result: any) => {
          setCustomers(result);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        });
    }
  }, [selectedArea]);

  useEffect(() => {
    // Fetch products based on dist_code and search query
    if (search.trim() !== "") {
      searchProduct(dist_code, search)
        .then((result: any) => {
          setProducts(result);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  });

  const handleCreateOrder = () => {
    // Check if a sector, area, and customer have been selected
    if (
      selectedSector === null ||
      selectedArea === null ||
      selectedCustomer === null
    ) {
      alert("Please select a sector, an area, and a customer.");
      
    }
    else{
      return "wait working on it"
    }
    // You can perform order creation logic here
    // For example, you can send a request to your server to create the order

    // Redirect to a confirmation page or perform other actions as needed
  };

  const AddToCart = () => {
    // Check if a sector, area, and customer have been selected
    if (
      selectedSector === null ||
      selectedArea === null ||
      selectedCustomer === null
    ) {
      alert("Please select a sector, an area, and a customer.");
      return;
    }
  };

  return (
    <main>
      <Paper p="xl">
        <Text size="lg" weight={500}>
          Create Order
        </Text>
        <div className="w-full h-8"></div>
        <form onSubmit={handleCreateOrder}>
          <Select
            required
            label="Select Sector"
            placeholder="Select a sector"
            value={selectedSector}
            onChange={(value) => setSelectedSector(value)}
            data={sectors.map((sector) => ({
              value: sector.seccd,
              label: sector.name,
            }))}
          />
          <div className="w-full h-4"></div>
          <Select
            required
            label="Select Area"
            placeholder="Select an area"
            value={selectedArea}
            onChange={(value) => setSelectedArea(value)}
            data={areas.map((area) => ({
              value: area.areacd,
              label: area.name,
            }))}
          />
          <div className="w-full h-4"></div>
          <Select
            required
            label="Select Customer"
            placeholder="Select a customer"
            value={selectedCustomer}
            onChange={(value) => setSelectedCustomer(value)}
            data={customers.map((customer) => ({
              value: customer.id,
              label: customer.name,
            }))}
          />

          <div className="w-full h-4"> </div>

          
          <Button
            type="submit"
            variant="primary"
            className="bg-black text-white"
          >
            Create Order
          </Button>
          
        </form>
        <div className="w-full h-4"> </div>
        <div >
         
          <div className=" m-2">
          <form onSubmit={AddToCart}>
            <div className="flex  justify-center">
              <Input className="w-full"
                placeholder="Search Medicine"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
             
            </div>

            <div className="overflow-x-auto w-full flex ">
              < Table >
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
                        <button
                          onClick={() => {
                            setCart([...cart, p]);
                          }}
                          className="p-2 bg-black text-white"
                        >
                          + cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ Table >
            </div>
            
            {/* ... Other form fields ... */}
          </form>
          </div>
        </div>
      </Paper>
    </main>
  );
}
