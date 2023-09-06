"use client";
import { useEffect, useState } from "react";
import { logout, me } from "./actions/actions";
import { useRouter } from "next/navigation";
import { ActionIcon } from "@mantine/core";
import { IconBook, IconDoorExit } from "@tabler/icons-react";
import OrderCreate from "../compnents/OrderCreate";
import Products from "@/compnents/Products";

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

  return (
    <main>
      <div className="flex p-4 justify-between bg-black">
        @{user && user.username}
        <ActionIcon
          onClick={() => {
            logout();
            router.push("/login");
          }}
          variant="filled"
        >
          <IconDoorExit size="1rem" />
        </ActionIcon>
      </div>
      <div className="m-4 text-center flex">
        <IconBook /> <span className="w-2 h-2"></span> Welcome to Ebook
      </div>

      <div className="">
        <OrderCreate dist_code={user ? user.dist_code : 0} />
        <Products dist_code={user ? user.dist_code : 0} />
      </div>
    </main>
  );
}
