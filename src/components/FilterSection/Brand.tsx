import {ProductType} from '../../utils/types'

type ComponentProps = {
  category: ProductType[],
  selectedBrands: string[],
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Brand({ category, selectedBrands, setSelectedBrands }: ComponentProps) {
  let brands: string[] = [];

  category.map((p) => {
    if (!brands.includes(p.brand)) {
      brands.push(p.brand);
    }
  });

  function handleChange(brand: string) {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  }

  return (
    <>
      <section>
        <h3>Brand</h3>
      </section>
      {brands.map((b) => (
        <div key={b} className="checkbox_label_div">
          <input
            checked={selectedBrands.includes(b)}
            onChange={() => handleChange(b)}
            type="checkbox"
            name="brand"
            id=""
          />
          <label htmlFor="brand">{b}</label>
        </div>
      ))}
    </>
  );
}
