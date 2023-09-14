// Import statements...
import { useState, useEffect } from "react";
import {
  getSectors,
  getAreaBySector,
  getCustumer,
} from "../actions/actions";
import { useRouter } from "next/navigation";

import {
  Text,
  Paper,
  Button,
  Select,
  Text as MantineText,
} from "@mantine/core"; // Import statements...

interface OrderCreateProps {
  dist_code: number;
  onCustomerNameChange:any;
}

interface Sector {
  seccd: number;
  name: string;
}

interface Area {
  areacd: number;
  name: string;
}

interface Customer {
  id: number;
  name: string;
}

export default function OrderCreate({ dist_code,  onCustomerNameChange }: OrderCreateProps) {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSectors() {
      try {
        const result = await getSectors({ dist_code });
        if (Array.isArray(result)) {
          setSectors(result);
        } else {
          console.error(
            "Error fetching sectors. Received unexpected data:",
            result
          );
        }
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    }

    if (dist_code) {
      fetchSectors();
    }
  }, [dist_code]);

  useEffect(() => {
    async function fetchAreas() {
      if (selectedSector !== null) {
        try {
          const result = await getAreaBySector({
            seccd: selectedSector,
            dist_code,
          });
          if (Array.isArray(result)) {
            setAreas(result);
            // Reset selected area and customer when the sector changes
            setSelectedArea(null);
            setSelectedCustomer(null);
          } else {
            console.error(
              "Error fetching areas. Received unexpected data:",
              result
            );
          }
        } catch (error) {
          console.error("Error fetching areas:", error);
        }
      }
    }

    if (selectedSector !== null) {
      fetchAreas();
    }
  }, [selectedSector, dist_code]);

  useEffect(() => {
    async function fetchCustomers() {
      if (selectedArea !== null) {
        try {
          const customerData = await getCustumer({
            areacd: selectedArea,
            dist_code,
          });

          // Check if the data is an array
          if (Array.isArray(customerData)) {
            const formattedCustomers: Customer[] = customerData.map((item) => ({
              id: item.ID,
              name: item.name,
              // Include other properties as needed
            }));
            setCustomers(formattedCustomers);
          } else {
            // Handle the case where an error message is received
            console.error("Error fetching customers:", customerData.message);
            // You can set customers to an empty array or handle the error differently
            setCustomers([]);
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      }
    }

    fetchCustomers();
  }, [selectedArea, dist_code]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      selectedSector === null ||
      selectedArea === null ||
      selectedCustomer === null
    ) {
      alert(
        "Please select a sector, area, and customer before creating an order."
      );
    } else {
      
      // Access the selected sector's name
      // Access the selected customer's name
       const sectorName = sectors.find((sector) => sector.seccd === selectedSector)?.name;
      const areaName = areas.find((area) => area.areacd === selectedArea)?.name;
      const customerName = customers.find((customer) => customer.id === selectedCustomer)?.name;
      onCustomerNameChange(customerName,customers);
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
            onChange={(value) => {
              const newSector = value !== "" ? Number(value) : null;
              setSelectedSector(newSector);
              // Automatically reset the selected area and customer when sector changes
              setSelectedArea(null);
              setSelectedCustomer(null);
            }}
            data={sectors.map((sector) => ({
              value: String(sector.seccd),
              label: sector.name,
            }))}
          />
          <div className="w-full h-4"></div>
          <Select
            required
            label="Select Area"
            placeholder="Select an area"
            value={selectedArea !== null ? String(selectedArea) : ""}
            onChange={(value) => {
              const newArea = value !== "" ? Number(value) : null;
              setSelectedArea(newArea);
              setSelectedCustomer(null);
            }}
            data={areas.map((area) => ({
              value: String(area.areacd),
              label: area.name,
            }))}
            disabled={!selectedSector}
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
              value: String(customer.id),
              label: customer.name,
            }))}
            disabled={!selectedArea} // Make sure it's enabled when selectedArea is not null
          />

          <div className="w-full h-4"> </div>
          <Button
            variant="primary"
            type="submit"
            className="bg-black text-white"
            disabled={
              selectedSector === null ||
              selectedArea === null ||
              selectedCustomer === null
            }
          >
            Create Order
          </Button>
        </form>
      </Paper>
    </main>
  );
}
