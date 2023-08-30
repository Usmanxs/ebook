"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  getdistribor,
  searchProduct,
  getSectors,
  getAreaBySector,
} from "@/actions/actions";
import { Button } from "@/components/ui/button";

interface Distributor {
  name: string;
  code: number;
}

interface Sector {
  seccd: number;
  name: string;
  code: number;
}

interface Area {
  id: number;
  name: string;
  seccd: number;
}

export default function Home() {
  const [selectedDistributor, setSelectedDistributor] = useState<number | "">(
    ""
  );
  const [distributorOptions, setDistributorOptions] = useState<Distributor[]>(
    []
  );
  const [filteredSectors, setFilteredSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<number | "">("");
  const [seccd, setSeccd] = useState<number | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<number | "">("");

  useEffect(() => {
    getdistribor().then((backdistributor: any) => {
      const distributorData: Distributor[] = backdistributor.map((s: any) => ({
        name: s.name,
        code: s.dist_code,
      }));
      setDistributorOptions(distributorData);
    });
  }, []);

  useEffect(() => {
    if (selectedDistributor !== "") {
      const selectedSectors = getSectors().then((backendSectors: any) => {
        const filteredSectorData: Sector[] = backendSectors.filter(
          (s: any) => s.dist_code === selectedDistributor
        );
        setFilteredSectors(filteredSectorData);
      });
    } else {
      setFilteredSectors([]);
    }
  }, [selectedDistributor]);

  useEffect(() => {
    if (seccd) {
      getAreaBySector({ seccd }).then((areaData) => {
        setAreas(areaData);
      });
    }
  }, [seccd]);

  const handleDistributorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedDistributorCode = parseInt(event.target.value, 10);
    setSelectedDistributor(selectedDistributorCode);

    const selectedSectors = getSectors().then((backendSectors: any) => {
      const filteredSectorData: Sector[] = backendSectors.filter(
        (s: any) => s.dist_code === selectedDistributorCode
      );
      setFilteredSectors(filteredSectorData);
    });
  };

  const handleSectorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSectorCode = parseInt(event.target.value, 10);
    setSelectedSector(selectedSectorCode);
    setSelectedArea("");

    const selectedSectors = getSectors().then((backendSectors: any) => {
      const filteredSectorData: Sector[] = backendSectors.filter(
        (s: any) => s.dist_code === selectedDistributor
      );
      const selectedSector = filteredSectorData.find(
        (sector) => sector.seccd === selectedSectorCode
      );
      if (selectedSector) {
        setSeccd(selectedSector.seccd);
      }
    });
  };

  const handleAreaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };
  return (
    <main className=" mt-44 m-8 flex justify-center  flex-col ">
      <div>
        <div className="py-4 ">
          <label htmlFor="distributor" className="text-gray-600 font-medium">
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

        {filteredSectors.length > 0 && (
          <div className="py-4">
            <label htmlFor="sector" className="text-gray-600 font-medium">
              Select Sector:
            </label>
            <select
              id="sector"
              onChange={handleSectorChange}
              value={selectedSector}
              className="p-2 border rounded w-full"
            >
              <option value="">Select...</option>
              {filteredSectors.map((sector) => (
                <option key={sector.seccd} value={sector.seccd}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {seccd && areas.length > 0 && (
          <div className="py-4">
            <label htmlFor="area" className="text-gray-600 font-medium">
              Select Area:
            </label>
            <select
              id="area"
              onChange={handleAreaChange}
              value={selectedArea}
              className="p-2 border rounded w-full"
            >
              <option value="">Select...</option>
              {areas.map((area) => (
                <option key={area.id} value={area.seccd}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button className="w-full mt-4">Submit</Button>
      </div>
    </main>
  );
}
