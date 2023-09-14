"use client";
import { useEffect, useState } from "react";
import { logout, me } from "./actions/actions";
import { useRouter } from "next/navigation";
import { useFullscreen } from "@mantine/hooks";

import OrderCreate from "./components/OrderCreate";
import {  Paper } from '@mantine/core';
import Header from "@/app/components/Header";
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
      <div className="m-4">
        <Header />
      <div className="m-2"></div>
     < Paper shadow="xl" radius="lg" p="xs" withBorder>
        <OrderCreate dist_code={user ? user.dist_code : 0} />
     </Paper>
   
      </div>
    </main>
  );
}
