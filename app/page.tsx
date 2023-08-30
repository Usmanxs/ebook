"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getdistribor } from '@/actions/actions';

interface Distributor {
  name: string;
  code: number;
}

export default function Home() {
  const [selectedDistributor, setSelectedDistributor] = useState<number | ''>('');
  const [distributorOptions, setDistributorOptions] = useState<Distributor[]>([]);
  const router = useRouter();

  const handleDistributorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistributorCode = parseInt(event.target.value, 10);
    setSelectedDistributor(selectedDistributorCode);
  };

  const handleLogin = () => {
    if (selectedDistributor) {
      // Redirect to the login page with selected distributor code as query parameter
      router.push(`/login?distCode=${selectedDistributor}`, undefined, );
    }
  };

  useEffect(() => {
    getdistribor().then((backdistributor: any) => {
      const distributorData: Distributor[] = backdistributor.map((s: any) => ({ name: s.name, code: s.dist_code }));
      setDistributorOptions(distributorData);
    });
  }, []);

  return (
    <main className='flex justify-center mt-44'>

    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">Select Distributor</h1>
      <div className="py-4">
        <label htmlFor="distributor" className="block text-gray-600 font-medium mb-2">
          Select Distributor:
        </label>
        <select
          id="distributor"
          onChange={handleDistributorChange}
          value={selectedDistributor}
          className="p-2 border rounded w-full"
          >
          <option value="">Select...</option>
          {distributorOptions.map((dist) => (
            <option key={dist.code} value={dist.code}>
              {dist.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className={`w-full p-2 bg-slate-900 text-white rounded ${selectedDistributor ? '' : 'opacity-50 cursor-not-allowed'}`}
        disabled={!selectedDistributor}
        >
        Go to Login
      </button>
    </div>
        </main>
  );
}