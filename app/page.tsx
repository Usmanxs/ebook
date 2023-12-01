"use client";
import { useEffect, useState } from "react";
import { logout, me } from "./actions/actions";
import { useRouter } from "next/navigation";
import { ActionIcon, Paper, Loader, Button } from "@mantine/core";
import { IconBook, IconDoorExit, IconHistoryToggle } from "@tabler/icons-react";
import OrderCreate from "./components/OrderCreate";
import SearchProducts from "./components/SearchProducts";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState<any>();
  const router = useRouter();
  // when the page loads if already logged in send to home page
  useEffect(() => {
    me().then((result) => {
      setLoader(true);
      if (result.success && result.user) {
        setUser(result.user);
        setLoader(false);
      } else {
        router.push("/login");
        setLoader(false);
      }
    });
  }, []);
  const [customerName, setCustomerName] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const handleCustomerNameChange = (name: any) => {
    setCustomerName(name);
  };
  const handleCustomerIdChange = (name: any) => {
    setCustomerId(name);
  };

  return (
    <main>
      {loader && (
        <Loader
          className="fixed top-0 right-10 bg-white"
          color="dark"
          variant="dots"
        ></Loader>
      )}
      <div className="m-4">
        <Paper shadow="xl" radius="lg" withBorder>
        <div className=" flex justify-between p-4 ">
            
            @{user && user.username}
            <ActionIcon
              onClick={() => {
                logout();
                router.push("/login");
              }}
              variant="filled"
            >

              <IconDoorExit size="1.2rem" color="black" />
            </ActionIcon>
          </div>
         
        
          
        </Paper>
              
        <div className="m-2"></div>
        <Paper shadow="xl" radius="lg" p="xs" withBorder>
        
          {customerName == null && (
            <OrderCreate
              dist_code={user ? user.dist_code : 0}
              onCustomerNameChange={handleCustomerNameChange}
              onCustomerId={handleCustomerIdChange}
            />
          )}
          {customerName !== null && (
            <SearchProducts
              dist_code={user && user.username ? user.dist_code : 0}
              user_id={user.user_id}
              customerName={customerName}
              accountId={customerId}
              onCustomerNameChange={handleCustomerNameChange}
            />
          )}
        </Paper>
      </div>
    </main>
  );
}
