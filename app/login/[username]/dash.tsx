
// import { getAreaBySector, getSectors, getdistribor, searchProduct } from "@/actions/actions";
// import {  useEffect, useState } from "react";

// const areas = ['Area A', 'Area B', 'Area C'];
// const sectors = {
//   'Area A': ['Sector 1', 'Sector 2', 'Sector 3'],
//   'Area B': ['Sector 4', 'Sector 5', 'Sector 6'],
//   'Area C': ['Sector 7', 'Sector 8', 'Sector 9'],
// };


// export default function Home() {
//   const [selectedArea, setSelectedArea] = useState<string | null>(null);
//   const [selectedSector, setSelectedSector] = useState<string | null>(null);
//   const [inputValue, setInputValue] = useState<string>('');

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
//         <h1 className="text-2xl font-semibold mb-4">Select Area, Sector, and Input</h1>
        
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Select an Area:</label>
//           <select
//             className="block w-full p-2 border rounded"
//             onChange={(e) => {
//               setSelectedArea(e.target.value);
//               setSelectedSector(null);
//             }}
//             value={selectedArea || ''}
//           >
//             <option value="">Select an area...</option>
//             {areas.map((area) => (
//               <option key={area} value={area}>
//                 {area}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedArea && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Select a Sector:</label>
//             <select
//               className="block w-full p-2 border rounded"
//               onChange={(e) => setSelectedSector(e.target.value)}
//               value={selectedSector || ''}
//             >
//               <option value="">Select a sector...</option>
//               {sectors[selectedArea].map((sector) => (
//                 <option key={sector} value={sector}>
//                   {sector}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {selectedSector && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Input Value:</label>
//             <input
//               type="text"
//               className="block w-full p-2 border rounded"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//           </div>
//         )}

//         {selectedSector && inputValue && (
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Table</h2>
//             <table className="w-full border-collapse border">
//               <thead>
//                 <tr>
//                   <th className="border p-2">Area</th>
//                   <th className="border p-2">Sector</th>
//                   <th className="border p-2">Input Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="border p-2">{selectedArea}</td>
//                   <td className="border p-2">{selectedSector}</td>
//                   <td className="border p-2">{inputValue}</td>
//                   <td className="border p-2">{selectedArea}</td>
//                   <td className="border p-2">{selectedSector}</td>
//                   <td className="border p-2">{inputValue}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { Input } from '@/components/ui/input';
// import { getAreaBySector, getSectors, getdistribor, searchProduct } from '@/actions/actions';
// import { v4 } from 'uuid';

// export default function dashboard() {
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState<any>([]);
//   const [sectors, setSectors] = useState<any>([]);
//   const [area, setArea] = useState<any>([]);
//   const [seccd, setSeccd] = useState(null);
//   const [cart, setCart] = useState<any>([]);
//   const [distributor, setDistributor] = useState<any>([]);

//   useEffect(() => {
//     if (loading) return;

//     if (search.length > 3) {
//       setLoading(true);
//       searchProduct(search).then((products) => {
//         setLoading(false);
//         setProducts(products);
//       });
//     } else {
//       setProducts([]);
//     }
//   }, [search]);
//   useEffect(() => {
//     getdistribor().then((backdistributor: any) => {
//       setDistributor(backdistributor.map((s: any) => ( { name: s.name, code:s.dist_code  })));
       
//     });

//   }, []);

//   useEffect(() => {
//     getSectors().then((backendSectors: any) => {
//       setSectors(backendSectors.map((s: any) => ({ seccd: s.seccd, name: s.name , code:s.dist_code  })));
//     });
//   }, []);

//   useEffect(() => {
//     if (seccd) {
//       getAreaBySector({ seccd }).then((area) => {
//         setArea(area);
//       });
//     }
//   }, [seccd]);
//    console.log(distributor)
//   console.log (sectors)
 
 
//   return (
//     <main className="m-4">
       
//       {sectors.length && (
//         <div className="py-4">
//           <label className="block mb-2 font-semibold">Sector:</label>
//           <select
//             onChange={(e) => setSeccd(JSON.parse(e.target.value).seccd)}
//             className="w-full p-2 border rounded"
//           >
//             {sectors.map((e: any) => {
//               return (
//                 <option value={JSON.stringify(e)} key={v4()}>
//                   {e.name}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//       )}

//       {seccd && area.length && (
//         <div className="py-4">
//           <label className="block mb-2 font-semibold">Area:</label>
//           <select className="w-full p-2 border rounded">
//             {area.map((e: any) => {
//               return <option key={v4()}>{e}</option>;
//             })}
//           </select>
//         </div>
//       )}

//       <div className="bg-gray-200 p-4 rounded">
//         <div className="font-semibold mb-2">Cart</div>
//         {cart.length &&
//           cart.map((cp: any) => {
//             return <div key={v4()}>{cp.name}</div>;
//           })}
//       </div>

//       <div className="w-full h-10"></div>

//       <div className="flex items-center">
//         <Input
//           placeholder="Search Medicine"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border rounded"
//         />
//         {loading && <div className="ml-5 w-4 h-4 bg-black animate-spin"></div>}
//       </div>

//       <ul className="mt-4">
//         {products.map((p: any) => {
//           return (
//             <li className="bg-red-100 m-2 p-2 rounded" key={p.ID}>
//               {p.name} - {p.tp} - {p.rp} -{' '}
//               <button
//                 onClick={() => {
//                   setCart([...cart, p]);
//                 }}
//                 className="p-2 bg-black text-white rounded"
//               >
//                 + cart
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </main>
//   );
// }

