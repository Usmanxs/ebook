"use client";

import { LoginCard } from "@/components/login";
import { SelectInput } from "@/components/SelectInput";
import { v4 } from "uuid";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserbyDistributor } from "@/actions/actions";

interface LoginPageProps {
  query: {
    distCode: string;
  };
}

export default function LoginPage({ query }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await getUserbyDistributor();

      if ("message" in result) {
        setLoginError(true);
        console.error(result.message);
        return;
      }

      const users = result as any[];
      console.log(result);
      const matchingUsers = users.filter(
        (u) => u.dist_code === parseInt(query.distCode)
      );

      const user = matchingUsers.find(
        (u) =>
          u.username === username && u.password === password && u.active === 1
      );

      if (user) {
        router.push("/dashboard");
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  return (
    <main className="w-full h-full">
      <div className="mt-44 ">
        <div className="flex justify-center flex-col">
          <div className="text-center text-xl">
            <h1>Login</h1>
          </div>
          <LoginCard
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loginError={loginError}
            handleLogin={handleLogin}
          />
        </div>
      </div>
    </main>
  );
}

LoginPage.getInitialProps = ({ query }: LoginPageProps) => {
  return { query };
};
