import {ProductType} from '../../utils/types'

type ComponentProps = {
  category: ProductType[],
  selectedColor: string[],
  setSelectedColor: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Color({ category, selectedColor, setSelectedColor }: ComponentProps) {
  let colors: string[] = [];

  category.map((p) => {
    if (!colors.includes(p.color)) {
      colors.push(p.color);
    }
  });

  function handleChange(color: string) {
    if (selectedColor.includes(color)) {
      setSelectedColor(selectedColor.filter((c: string) => c !== color));
    } else {
      setSelectedColor([...selectedColor, color]);
    }
  }

  return (
    <>
      <section>
        <h3>Color</h3>
      </section>
      {colors.map((c) => (
        <div key={c} className="checkbox_label_div">
          <input
            checked={selectedColor.includes(c)}
            onChange={() => handleChange(c)}
            type="checkbox"
            name="color"
            id=""
          />
          <label htmlFor="color">{c}</label>
        </div>
      ))}
    </>
  );
}
