import { faker } from "@faker-js/faker";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  getDbProcducts,
  getProductHandler,
  updateDB,
} from "~/server/controller/product";
import { array, string, z } from "zod";

export const productRouter = createTRPCRouter({
  getProduct: publicProcedure.query(async () => getProductHandler()),

  getDbProduct: publicProcedure.query(async () => getDbProcducts()),
  updateDb: publicProcedure
    .input(array(string()))
    .mutation(async ({ input }) => updateDB(input)),
});
