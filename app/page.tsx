"use client";
import { useEffect, useState } from "react";
import { logout, me } from "./actions/actions";
import { useRouter } from "next/navigation";
import { ActionIcon,Paper ,Loader} from "@mantine/core";
import { IconBook, IconDoorExit } from "@tabler/icons-react";
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
  const handleCustomerNameChange = (name:any) => {
    setCustomerName(name);
  
   
  };
  return (
    <main>
           {loader && <Loader  color="dark" variant="dots"></Loader>}
     <div className="m-4">
      <Paper shadow="xl" radius="lg"  withBorder>
      <div className="m-4 w-98">
      <div className='flex justify-center '> Welcome to Ebook <IconBook /></div>
      </div>
<div className=" flex justify-between p-4 ">

        @{user && user.username}
        <ActionIcon
          onClick={() => {
              logout();
              router.push("/login");
            }}
          variant="filled"
        >
          <IconDoorExit  size="1.2rem"  color='black'/>
        </ActionIcon>
      </div>
            </Paper>
      <div className="m-2"></div>
     < Paper shadow="xl" radius="lg" p="xs" withBorder>
     { customerName==null&& <OrderCreate dist_code={user ? user.dist_code : 0}  onCustomerNameChange={handleCustomerNameChange} />}
        { customerName!==null && <SearchProducts dist_code={user ? user.dist_code : 0} customerName={customerName}   onCustomerNameChange={handleCustomerNameChange}/>}
     </Paper>
   
      </div>
    </main>
  );
}
