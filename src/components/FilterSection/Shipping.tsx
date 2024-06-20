type ComponentProps = {
  selectedShipping: boolean,
  setSelectedShipping: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Shipping({ selectedShipping, setSelectedShipping }: ComponentProps) {
  function handleChange() {
    setSelectedShipping(!selectedShipping);
  }
  return (
    <>
      <section>
        <h3>Shipping</h3>
      </section>
      <div className="checkbox_label_div">
        <input
          checked={selectedShipping}
          onChange={handleChange}
          type="checkbox"
          name="free_shipping"
          id=""
        />
        <label htmlFor="free_shipping">Free Shipping</label>
      </div>
    </>
  );
}
