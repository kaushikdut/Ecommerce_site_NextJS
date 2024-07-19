import { CiSearch } from "react-icons/ci";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { PiShoppingCartSimple } from "react-icons/pi";

function Navbar() {
  return (
    <div className="flex h-36 w-full flex-col">
      <div className="flex h-[40%] w-full items-center justify-end gap-x-4 px-5 text-xs font-medium text-gray-700">
        <p>Help</p>
        <p>Order & Returns</p>
        <p>Hi, John</p>
      </div>
      <div className="flex h-full w-full items-center justify-between px-6">
        <div>
          <h1 className="text-lg font-bold md:text-2xl">ECOMMERCE</h1>
        </div>
        <div className="flex gap-x-4 text-xs font-semibold md:text-lg">
          <h3>Categories</h3>
          <h3>Sale</h3>
          <h3>Clearance</h3>
          <h3>New stock</h3>
          <h3>Trending</h3>
        </div>
        <div className="flex h-full items-center gap-x-6">
          <CiSearch className="h-7 w-7" />
          <PiShoppingCartSimple className="h-6 w-6" />
        </div>
      </div>
      <div className="flex h-[40%] w-full items-center justify-center bg-gray-100">
        <LiaAngleLeftSolid />
        <p className="mx-4 text-xs font-medium">
          Get 10% off on Business sign up
        </p>
        <LiaAngleRightSolid />
      </div>
    </div>
  );
}

export default Navbar;
