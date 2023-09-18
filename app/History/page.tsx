"use client";
import { Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OrderList from "../components/OrderList";
function page() {
  return (
    <div className="m-2 w-98">
    <Paper shadow="xl" radius="lg" p="xs" withBorder>
        <OrderList />
      </Paper>
    </div>
  );
}

export default page;
