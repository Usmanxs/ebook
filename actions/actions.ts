"use server";

import db from "@/lib/db";

export async function searchProduct(name: string) {
  try {
    return db.product.findMany({
      // take: 3,
      where: { name: { contains: name } },
    });
  } catch (e) {
    return { message: "There was an error." };
  }
}

export async function getSectors() {
  try {
    return db.sector.findMany();
  } catch (e) {
    return { message: "There was an error." };
  }
}
export async function getdistribor() {
  try {
    return db.distributor.findMany();
  } catch (e) {
    return { message: "There was an error." };
  }
}
export async function getAreaBySector({ seccd }: { seccd: number }) {
  try {
    return db.area.findMany({ where: { seccd } });
  } catch (e) {
    return { message: "There was an error." };
  }
}
export async function  getUserbyDistributor(){
  try{
    return db.user.findMany();
  }catch (e){
    return{massage: "there was an error"}
  }
}