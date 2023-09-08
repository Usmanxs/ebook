'use client'
import { useEffect, useState } from "react";
import { logout, me } from "../actions/actions";
import { useRouter } from "next/navigation";
import {  Paper } from '@mantine/core';

import SearchProducts from "@/compnents/SearchProducts";
import Header from "@/compnents/Header";
function Products() {
    const [user, setUser] = useState<any>();
    const router = useRouter();
    useEffect(() => {
        me().then((result) => {
          if (result.success && result.user) {
            setUser(result.user);
          } else {
            router.push("/login");
          }
        });
      }, []);
 
    
  return (
    <> 
        <div className="m-4">
     <Header  />
     <div className="m-4"></div>
     <Paper shadow="xl" radius="lg" p="xs" withBorder>

        <SearchProducts dist_code={user ? user.dist_code : 0} />
        </Paper>
        </div>
    </>
  )
}

export default Products