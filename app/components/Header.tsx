import React from 'react'
import { useEffect, useState } from "react";
import { logout, me } from  "../actions/actions";;
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
    <main className=' w-98'>
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
    </main>
  )
}

export default Header