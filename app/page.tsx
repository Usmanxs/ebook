"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getAreaBySector, getSectors, getdistribor, searchProduct } from "@/actions/actions";
import { LoginCard } from "@/components/login";
import { SelectInput } from "@/components/SelectInput";
import { v4 } from "uuid";

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [sectors, setSectors] = useState<any>([]);
  const [area, setArea] = useState<any>([]);
  const [seccd, setSeccd] = useState(null);
  const [cart, setCart] = useState<any>([]);
  const [distributor, setDistributor] = useState<any>([]); 
  useEffect(() => {
    if (loading) return;

    if (search.length > 3) {
      setLoading(true);
      searchProduct(search).then((products) => {
        setLoading(false);
        setProducts(products);
        // console.log(products);
      });
    } else {
      setProducts([]);
    }
  }, [search]);

  useEffect(() => {
    getSectors().then((backendSectors: any) => {
      setSectors(
        backendSectors.map((s: any) => ({ seccd: s.seccd, name: s.name }))
      );
    });
  }, []);

  useEffect(() => {
    if (seccd) {
      getAreaBySector({ seccd }).then((area) => {
        console.log(area);
      });
    }
  }, [seccd]);
  useEffect(() => {
    getdistribor().then((backdistributor: any) => {
      setDistributor(
        backdistributor.map((s: any) => ({ name: s.name }))
      );
    });
    console.log (distributor)
  }, []);

  const handleDistributorSelect = () => {
    
  };
  return (
     
    <main className="flex justify-center items-center h-screen">
    <div className="w-1/2 bg-white p-8 rounded shadow-md">
      <h1 className="text-2xl align-middle font-bold mb-4">Select Distributor</h1>
      
      <select className="w-full p-2 border rounded">
        <option value="" >Select your distributor</option>
        {distributor.map((dist:any, index:number) => (
          <option key={index} value={dist.name}>
            {dist.name}
          </option>
        ))}
      </select>
      
      <button
        className="mt-4 flex justify-center bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded"
        onClick={handleDistributorSelect}
      >
        Continue
      </button>
    </div>
  </main>
);
}