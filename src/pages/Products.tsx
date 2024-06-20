import FilterSidebar from "../components/ProductsRelated/FilterSidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import QuickCategoryNav from "../components/Nav/QuickCategoryNav";
import { useQueryContext } from "../global_variables/QueryContext";
import tune_icon from "/src/assets/tune.png";
import ProductThumbnail from "../components/ProductsRelated/ProdThumbnail";
import bg_pianoKeys_pic from "/src/assets/title_pic_piano.png";
import filterLogo from "/src/assets/filter_logo.svg";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductType, ReviewDetails } from "../utils/types";

type ProdWithRevDetailsType = ProductType & ReviewDetails;
type CategoryType = ProdWithRevDetailsType[] | undefined;

export default function Products() {
  const { id } = useParams();
  //category = array of all the product objects that match the selected category
  const [category, setCategory] = useState<ProdWithRevDetailsType[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<
    ProdWithRevDetailsType[]
  >([]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedReview, setSelectedReview] = useState<number[]>([]);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const quickCategoryRef = useRef<HTMLDivElement | null>(null);
  const sortOptionsDivRef = useRef<HTMLDivElement | null>(null);

  const { query } = useQueryContext();

  const PRODUCT_URL = import.meta.env.VITE_URL_PRODUCT;
  const RATING_URL = import.meta.env.VITE_URL_RATING;

  useEffect(() => {
    window.scrollTo(0, 0);
    //resetting filters with category change
    setSelectedBrands([]);
    setSelectedColor([]);
    setSelectedReview([]);
    setSelectedMinPrice(0);
    setSelectedMaxPrice(0);
    setSelectedShipping(false);

    // scroll automatically down past <quick category buttons> in the mobile size.
    if (window.innerWidth < 690) {
      setTimeout(() => {
        quickCategoryRef?.current?.scrollIntoView({ behavior: "smooth" });
      }, 450);
    }
  }, [category]);

  useEffect(() => {
    if (isSortOpen) {
      sortOptionsDivRef?.current?.classList.add("sort_options_div--open");
    } else {
      sortOptionsDivRef?.current?.classList.remove("sort_options_div--open");
    }
  }, [isSortOpen]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${PRODUCT_URL + "/" + id}`);
        const data = await response.json();
        const newData = await Promise.all(
          data.map(async (p: ProductType) => {
            try {
              const res = await fetch(`${RATING_URL + "/" + p.id}`);
              const reviewDetails = await res.json();
              return { ...p, reviewDetails };
            } catch (err) {
              console.log(err);
              return { ...p, reviewDetails: {} };
            }
          })
        );
        setCategory(newData);
        setIsLoading(false);
      } catch {
        console.log("Error fetching the products category...");
      }
    }
    fetchProducts();
  }, [id]);

  useEffect(() => {
    let updatedFilteredCategory = [...category];

    if (query) {
      updatedFilteredCategory = updatedFilteredCategory.filter(
        (p: ProductType) =>
          p.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    if (selectedBrands.length > 0) {
      updatedFilteredCategory = updatedFilteredCategory.filter((p) =>
        selectedBrands.includes(p.brand)
      );
    }

    if (selectedColor.length > 0) {
      updatedFilteredCategory = updatedFilteredCategory.filter((p) =>
        selectedColor.includes(p.color)
      );
    }

    if (selectedReview.length > 0) {
      updatedFilteredCategory = updatedFilteredCategory.filter((p) =>
        selectedReview.includes(Math.floor(p.reviewDetails?.average))
      );
    }

    if (selectedMinPrice) {
      updatedFilteredCategory = updatedFilteredCategory.filter((p) => {
        return p.priceCents >= selectedMinPrice;
      });
    }

    if (selectedMaxPrice) {
      updatedFilteredCategory = updatedFilteredCategory.filter(
        (p) => p.priceCents <= selectedMaxPrice
      );
    }

    if (selectedShipping) {
      updatedFilteredCategory = updatedFilteredCategory.filter(
        (p) => Boolean(Number(p.shippingCostCents)) !== selectedShipping
      );
    }

    setFilteredCategory(updatedFilteredCategory);

    return () => setFilteredCategory([]);
  }, [
    category,
    query,
    selectedBrands,
    selectedMinPrice,
    selectedMaxPrice,
    selectedColor,
    selectedShipping,
    selectedReview,
  ]);

  const handleSort = (sortType: string) => {
    let newSorted = [...filteredCategory];
    if (sortType === "az") {
      newSorted.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setFilteredCategory(newSorted);
    }
    if (sortType === "za") {
      newSorted.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      setFilteredCategory(newSorted);
    }
    if (sortType === "ce") {
      newSorted.sort((a, b) => {
        const priceA = a.priceCents;
        const priceB = b.priceCents;

        if (priceA < priceB) {
          return -1;
        }
        if (priceA > priceB) {
          return 1;
        }
        return 0;
      });
      setFilteredCategory(newSorted);
    }
    if (sortType === "ec") {
      newSorted.sort((a, b) => {
        const priceA = a.priceCents;
        const priceB = b.priceCents;

        if (priceA < priceB) {
          return 1;
        }
        if (priceA > priceB) {
          return -1;
        }
        return 0;
      });
      setFilteredCategory(newSorted);
    }
    if (sortType === "rating") {
      newSorted.sort((a, b) => {
        const ratingA = a.reviewDetails.average;
        const ratingB = b.reviewDetails.average;

        if (ratingA < ratingB) {
          return 1;
        }
        if (ratingA > ratingB) {
          return -1;
        }
        return 0;
      });
      setFilteredCategory(newSorted);
    }
  };

  return (
    <>
      <div className="products_title_div">
        <img src={bg_pianoKeys_pic} alt="" />
        <QuickCategoryNav />
      </div>
      <div className="prod_main_div">
        <FilterSidebar
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedMinPrice={selectedMinPrice}
          setSelectedMinPrice={setSelectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
          selectedReview={selectedReview}
          setSelectedReview={setSelectedReview}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          category={category}
        />
        <div ref={quickCategoryRef}>
          <div className="upper_config_buttons">
            <div
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="sort_filter_button"
            >
              <img src={tune_icon} alt="sort icon" /> <span>Sort</span>
            </div>
            <div
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="sort_filter_button filter_sidebar--mobile"
            >
              <img src={filterLogo} alt="filter icon" /> <span>Filter</span>
            </div>
          </div>
          {isSortOpen ? (
            <div
              onClick={() => setIsSortOpen(false)}
              className="overlay_sort"
            ></div>
          ) : (
            ""
          )}
          <div className="sort_options">
            <div ref={sortOptionsDivRef} className="sort_options_div">
              <ul>
                <li onClick={() => handleSort("az")}>Alphabetical (A-Z)</li>
                <li onClick={() => handleSort("za")}>Alphabetical (Z-A)</li>
                <li onClick={() => handleSort("ce")}>Price ascending</li>
                <li onClick={() => handleSort("ec")}>Price descending</li>
              </ul>
            </div>
          </div>
          <div className="prod_div">
            {isLoading ? (
              <>
                <ClipLoader
                  loading={isLoading}
                  color={"rgb(255, 122, 19)"}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <i>Loading...</i>
              </>
            ) : (
              filteredCategory.map((p) => (
                <ProductThumbnail prod={p} key={Math.random()} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
