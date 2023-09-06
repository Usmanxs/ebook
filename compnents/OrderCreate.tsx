// OrderCreate.tsx

import { useState, useEffect } from "react";
import {
  getSectors,
  getAreaBySector,
  getCustumer,
} from "../app/actions/actions";
import { useRouter } from "next/router";

import {
  Text,
  Paper,
  Button,
  Select,
  Text as MantineText,
} from "@mantine/core";

interface OrderCreateProps {
  dist_code: number; // Pass dist_code as a prop from the parent component
}
type Sector = {
  seccd: number;
  name: string;
  // other properties...
};
type SelectedAreaType = number | null;

export default function OrderCreate({ dist_code }: OrderCreateProps) {
  const [sectors, setSectors] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]); // Added customers state
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  useEffect(() => {
    // Fetch sectors based on dist_code
    getSectors({ dist_code }) // Pass the dist_code as a parameter
      .then((result: any) => {
        setSectors(result);
      })
      .catch((error) => {
        console.error("Error fetching sectors:", error);
      });
  }, [dist_code]);

  useEffect(() => {
    // Fetch areas based on selected sector (seccd) and dist_code
    if (selectedSector !== null) {
      getAreaBySector({ seccd: selectedSector, dist_code }) // Pass both seccd and dist_code
        .then((result: any) => {
          setAreas(result);
        })
        .catch((error) => {
          console.error("Error fetching areas:", error);
        });
    }
  }, [selectedSector, dist_code]); // Add both selectedSector and dist_code to the dependency array

  useEffect(() => {
    // Fetch customers based on selected area (areacd)
    if (selectedArea !== null) {
      getCustumer({ areacd: selectedArea, dist_code })
        .then((result: any) => {
          setCustomers(result);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        });
    }
  }, [selectedArea]);

  const handleCreateOrder = () => {
    // Check if a sector, area, and customer have been selected
    if (
      selectedSector === null ||
      selectedArea === null ||
      selectedCustomer === null
    ) {
 
      alert( "working on it!")
    } else {
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
            value={selectedSector !== null ? String(selectedSector) : ""}
            onChange={(value) =>
              setSelectedSector(value !== "" ? Number(value) : null)
            }
            data={sectors.map((sector) => ({
              value: sector.seccd.toString(), // Ensure that value is a string
              label: sector.name,
            }))}
          />
          <div className="w-full h-4"></div>
          <Select
            required
            label="Select Area"
            placeholder="Select an area"
            value={selectedArea !== null ? String(selectedArea) : ""}
            onChange={(value) =>
              setSelectedArea(value !== "" ? Number(value) : null)
            }
            data={areas.map((area) => ({
              value: area.areacd.toString(), // Ensure that value is a string
              label: area.name,
            }))}
          />

          <div className="w-full h-4"></div>
          <Select
            required
            label="Select Customer"
            placeholder="Select a customer"
            value={
              selectedCustomer !== null ? String(selectedCustomer) : undefined
            }
            onChange={(value) =>
              setSelectedCustomer(value !== undefined ? Number(value) : null)
            }
            data={customers.map((customer) => ({
              value: customer.id,
              label: customer.name,
            }))}
          />

          <div className="w-full h-4"> </div>

          <Button
            variant="primary"
            type="submit"
            className="bg-black text-white  "
          >
            Create Order
          </Button>
        </form>
      </Paper>
    </main>
  );
}
