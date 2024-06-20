import { useEffect, useRef, useState } from "react";
import {ProductType} from '../../utils/types'

type ComponentProps = {
  category: ProductType[],
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>,
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>
}

export default function Price({
  category,
  setSelectedMinPrice,
  setSelectedMaxPrice,
}: ComponentProps) {
  const [prices, setPrices] = useState(() =>
    category.map((p) => p.priceCents).sort((a, b) => a - b)
  );

  const cheapest_prod_price = prices[0];
  const exp_product_price = prices[prices.length - 1];

  const [input1, setInput1] = useState(cheapest_prod_price);
  const [input2, setInput2] = useState(exp_product_price);

  const ref = useRef<HTMLDivElement>(null);

  // Update inputs when category changes
  useEffect(() => {
    const sortedPrices = category
      .map((p) => p.priceCents)
      .sort((a, b) => a - b);
    setPrices(sortedPrices);
    setInput1(sortedPrices[0]);
    setInput2(sortedPrices[sortedPrices.length - 1]);
  }, [category]);

  function convertPrice(cents: number) {
    if (cents === undefined || isNaN(cents)) {
      return "€ 0";
    }
    return `€ ${Math.round(cents / 100)}`;
  }

  function updateBarPosition() {
    const minPrice = input1 || cheapest_prod_price || 0;
    const maxPrice = input2 || exp_product_price || 0;
    const leftPercentage =
      ((minPrice - cheapest_prod_price) /
        (exp_product_price - cheapest_prod_price)) *
        100 +
      3;
    const rightPercentage =
      ((exp_product_price - maxPrice) /
        (exp_product_price - cheapest_prod_price)) *
        100 +
      3;
    // + 3 is for the style, to push the bar inside from the sides...
    if (ref.current) {
      ref.current.style.left = `${leftPercentage}%`;
      ref.current.style.right = `${rightPercentage}%`;
    }
  }
  useEffect(() => {
    updateBarPosition();
  }, [input1, input2, cheapest_prod_price, exp_product_price, category]);

  function handleInput1(e: React.ChangeEvent<HTMLInputElement>) {
    const numeric_value = parseInt(e.target.value, 10);
    if (numeric_value < input2) {
      setSelectedMinPrice(numeric_value);
      setInput1(numeric_value);
      updateBarPosition();
    }
  }
  function handleInput2(e: React.ChangeEvent<HTMLInputElement>) {
    const numeric_value = parseInt(e.target.value, 10);
    if (numeric_value > input1) {
      setSelectedMaxPrice(numeric_value);
      setInput2(numeric_value);
      updateBarPosition();
    }
  }

  return (
    <>
      <section>
        <h3>Price</h3>
      </section>
      <div className="price_slider_div">
        <input
          onChange={(e) => handleInput1(e)}
          value={input1 || 0}
          type="range"
          id="minPrice"
          min={cheapest_prod_price}
          max={exp_product_price}
          className="lower_bar"
        />
        {prices.length === 1 ? (
          ""
        ) : (
          <span ref={ref} className="bar_bw_thumbs"></span>
        )}

        <input
          onChange={(e) => handleInput2(e)}
          value={input2 || 0}
          type="range"
          id="maxPrice"
          min={cheapest_prod_price}
          max={exp_product_price}
          className="upper_bar"
        />
      </div>
      <div className="price_number_div">
        <input
          min={cheapest_prod_price}
          max={exp_product_price}
          value={convertPrice(input1)}
          type="text"
          readOnly
        />
        <input
          min={cheapest_prod_price}
          max={exp_product_price}
          value={convertPrice(input2)}
          type="text"
          readOnly
        />
      </div>
    </>
  );
}
