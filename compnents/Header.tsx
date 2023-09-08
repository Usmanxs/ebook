import React from 'react'
import { useEffect, useState } from "react";
import { logout, me } from  "../app/actions/actions";;
import { useRouter } from "next/navigation";
import { ActionIcon,Paper } from "@mantine/core";
import { IconBook, IconDoorExit } from "@tabler/icons-react";
function Header() {
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
    <main className=' '>
  <Paper shadow="xl" radius="lg" p="xs" withBorder>
<span className=" flex flex-row ">

        @{user && user.username}
        <ActionIcon
          onClick={() => {
              logout();
              router.push("/login");
            }}
          variant="filled"
        >
          <IconDoorExit size="1rem"  color='black'/>
        </ActionIcon>
      </span>
            </Paper>
      <div className="m-4 text-center bg-black  w-98">
        <IconBook /> <span className="w-2 h-2 "></span> Welcome to Ebook
      </div>
    </main>
  )
}

export default Header