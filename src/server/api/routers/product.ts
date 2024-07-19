import { faker } from "@faker-js/faker";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createProduct, getProductHandler } from "~/server/controller/product";
import { string, z } from "zod";

export const productRouter = createTRPCRouter({
  getProduct: publicProcedure.query(async () => getProductHandler()),

  selectedProduct: publicProcedure
    .input(string())
    .mutation(async ({ input }) => createProduct(input)),
});
