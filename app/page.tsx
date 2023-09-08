"use client";
import { useEffect, useState } from "react";
import { logout, me } from "./actions/actions";
import { useRouter } from "next/navigation";
import { useFullscreen } from "@mantine/hooks";

import OrderCreate from "../compnents/OrderCreate";

import Header from "@/compnents/Header";
export default function Home() {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  // when the page loads if already logged in send to home page
  useEffect(() => {
    me().then((result) => {
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        router.push("/login");
      }
    });
  }, []);
  const { toggle, fullscreen } = useFullscreen();

  return (
    <main>
      <div className="">
        <Header />
      
        <OrderCreate dist_code={user ? user.dist_code : 0} />
        {/* <Products dist_code={user ? user.dist_code : 0} /> */}
      </div>
    </main>
  );
}
