import { useRef, useEffect } from "react";

import { ProductType } from "../../utils/types";

import Brand from "../FilterSection/Brand";
import Color from "../FilterSection/Color";
import Price from "../FilterSection/Price";
import Review from "../FilterSection/Reviews";
import Shipping from "../FilterSection/Shipping";

import checkLogo from "/src/assets/check_logo.svg";

type ComponentProps = {
  category: ProductType[],
  selectedBrands: string[],
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>,
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>,
  selectedMinPrice: number,
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>,
  selectedMaxPrice: number,
  selectedColor: string[],
  setSelectedColor: React.Dispatch<React.SetStateAction<string[]>>,
  selectedShipping: boolean,
  setSelectedShipping: React.Dispatch<React.SetStateAction<boolean>>,
  selectedReview: number[],
  setSelectedReview: React.Dispatch<React.SetStateAction<number[]>>,
  isFilterOpen: boolean,
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function FilterSidebar({
  category,
  selectedBrands,
  setSelectedBrands,
  setSelectedMinPrice,
  selectedMinPrice,
  setSelectedMaxPrice,
  selectedMaxPrice,
  selectedColor,
  setSelectedColor,
  selectedShipping,
  setSelectedShipping,
  selectedReview,
  setSelectedReview,
  isFilterOpen,
  setIsFilterOpen,
}: ComponentProps) {
  // show filter in mobile mode
  const filterDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (filterDivRef) {
      if (isFilterOpen) {
        filterDivRef?.current?.classList.add("filter_div--open");
      } else {
        filterDivRef?.current?.classList.remove("filter_div--open");
      }
    }

  }, [isFilterOpen]);

  return (
    <div ref={filterDivRef} className="filter_div">
      {isFilterOpen ? (
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="sort_filter_button sort_filter_button--side_open"
        >
          <img src={checkLogo} alt="filter icon" /> <span>Apply Filter</span>
        </div>
      ) : (
        ""
      )}
      <Brand
        category={category}
        setSelectedBrands={setSelectedBrands}
        selectedBrands={selectedBrands}
      />
      <Price
        category={category}
        setSelectedMinPrice={setSelectedMinPrice}
        setSelectedMaxPrice={setSelectedMaxPrice}
      />
      <Color
        category={category}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Shipping
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
      />
      <Review
        selectedReview={selectedReview}
        setSelectedReview={setSelectedReview}
      />
    </div>
  );
}
