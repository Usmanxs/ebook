"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getAreaBySector, getSectors, getdistribor, searchProduct } from "@/actions/actions";
import { LoginCard } from "@/components/login";
import { SelectInput } from "@/components/SelectInput";
import { v4 } from "uuid";

export default function login() {
  

  return (
     

    <main className="w-full h-full">
    <div className="mt-44 ">
        <div className="flex justify-center ">

    <LoginCard/>
        </div>
        </div> 
    </main>
  );
}
