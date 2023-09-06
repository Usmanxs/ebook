"use server";
import db from "@/utils/db";
import { cookies } from "next/headers";

export const getDistributers = () => {
  return db.distributor.findMany();
};

export const login = async ({
  username,
  password,
  dist_code,
}: {
  username: string;
  password: string;
  dist_code: number;
}) => {
  const user = await db.user.findFirst({
    where: {
      username,
      password,
      dist_code,
    },
    select: {
      user_id: true,
      username: true,
      dist_code: true,
      email: true,
      mobile: true,
      description: true,
    },
  });

  if (!user)
    return {
      error: "Incorrect Username or Password or Distributor Wrong !",
    };

  cookies().set({
    name: "user_id",
    value: String(user.user_id),
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  cookies().set({
    name: "dist_code",
    value: String(user.dist_code),
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true, user };
};

export const me = async () => {
  const user_id = Number(cookies().get("user_id")?.value);

  if (!user_id) return { error: "User not found !" };

  const user = await db.user.findFirst({
    where: { user_id },
    select: {
      user_id: true,
      username: true,
      dist_code: true,
      email: true,
      mobile: true,
      description: true,
    },
  });

  if (!user) return { error: "User not found !" };

  return { success: true, user };
};

export const logout = async () => {
  cookies().set({
    name: "user_id",
    value: "",
    httpOnly: true,
    maxAge: 60,
  });

  cookies().set({
    name: "dist_code",
    value: "",
    httpOnly: true,
    maxAge: 60,
  });

  return { success: true };
};

export async function getSectors({ dist_code }: { dist_code: number }) {
  try {
    return db.sector.findMany({ where: { dist_code } });
  } catch (e) {
    return { message: "There was an error." };
  }
}
export async function getAreaBySector({
  seccd,
  dist_code,
}: {
  seccd: number;
  dist_code: number;
}) {
  try {
    return db.area.findMany({ where: { seccd, dist_code } });
  } catch (e) {
    return { message: "There was an error." };
  }
}

export async function getCustumer({
  areacd,
  dist_code,
}: {
  areacd: number;
  dist_code: number;
}) {
  try {
    return db.account.findMany({ where: { areacd, dist_code } });
  } catch (e) {
    return { message: "There was an error." };
  }
}
export async function searchProduct(dist_code: number, name: string) {
  try {
    return db.product.findMany({
      take : 10,
      where: {
        dist_code,
        name: { contains: name },
      },
    });
  } catch (e) {
    return { message: "There was an error." };
  }
}
