"use client";

import { useEffect, useState } from "react";
import Pagination from "../_components/pagination";
import { api } from "~/trpc/react";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

interface Product {
  id: number;
  category: string;
}

function Main() {
  const product = api.product.getProduct.useSuspenseQuery()[0];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const noOfPages: number[] = Array.from(
    { length: Math.ceil((product?.length ?? 0) / 6) },
    (_, index) => index + 1,
  );

  const handleCheckboxChange = (ele: Product) => {
    const isSelected = selectedCategories.includes(ele.category);
    setSelectedCategories(
      isSelected
        ? selectedCategories.filter((cat) => cat !== ele.category)
        : [...selectedCategories, ele.category],
    );
  };
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      redirect("/login");
    }
  }, []);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts && savedProducts.length > 0) {
      setSelectedCategories(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      localStorage.setItem("products", JSON.stringify(selectedCategories));
    }
  }, [selectedCategories]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-y-8 py-8">
      <div className="flex h-auto w-[510px] flex-col items-center gap-y-7 rounded-3xl border border-black border-opacity-25 py-10">
        <h1 className="text-3xl font-semibold">Please mark your interests!</h1>
        <p className="text-sm font-medium">We will keep you notified</p>
        <div className="flex w-[400px] flex-col gap-y-4">
          <p className="text-lg font-medium">My saved Interests!</p>
          <div className="flex select-none flex-col gap-y-5">
            {product?.slice(currentPage * 6 - 6, currentPage * 6).map((ele) => (
              <div key={ele.id} className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  id={`category-${ele.id}`}
                  checked={selectedCategories.includes(ele.category)}
                  onChange={() => handleCheckboxChange(ele)}
                  className="h-[24px] w-[24px] appearance-none rounded-sm bg-gray-300 accent-black checked:appearance-auto"
                />
                <label
                  htmlFor={`category-${ele.id}`}
                  className="text-sm font-medium"
                >
                  {ele.category}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {product?.length > 0 && (
        <Pagination
          noOfPages={noOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Main;
