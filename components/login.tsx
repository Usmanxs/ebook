"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react';

interface LoginCardProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loginError: boolean;
  handleLogin: () => void;
}

export function LoginCard({
  username,
  setUsername,
  password,
  setPassword,
  loginError,
  handleLogin,
}: LoginCardProps) {
  return (
    <Card className=" m-4 p-2">
      {/* ... Other card content ... */}
      <CardContent className="grid gap-4">
        {/* ... Other card content ... */}
        <div className="grid gap-2 mt-4">
          <Label htmlFor="username">USERNAME</Label>
          <Input
            id="username"
            type="tex"
            placeholder="ENTER YOUR USERNAME "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
