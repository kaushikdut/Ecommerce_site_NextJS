import { faker } from "@faker-js/faker";
import { createTRPCRouter, publicProcedure } from "../api/trpc";
import { object, string, z } from "zod";
import { db } from "../db";

export const getProductHandler = () => {
  const newProducts = [];
  for (let i = 0; i < 100; i++) {
    const data = {
      id: faker.number.int({ min: 100000000, max: 999999999 }),
      category: faker.commerce.department(),
    };

    newProducts.push(data);
  }
  return newProducts;
};

export const createProduct = async (input: string) => {
  const existingProduct = await db.product.findUnique({
    where: { category: input },
  });

  if (!existingProduct && input) {
    await db.product.create({
      data: {
        category: input,
      },
    });

    return {
      message: "successfully added",
    };
  }
};
