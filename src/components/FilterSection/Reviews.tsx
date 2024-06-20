import Star from "../../components/ProductsRelated/Star";

type ComponentProps = {
  selectedReview: number[],
  setSelectedReview: React.Dispatch<React.SetStateAction<number[]>>
}

export default function Review({ selectedReview, setSelectedReview }: ComponentProps) {
  function handleChange(n: number) {
    if (selectedReview.includes(n)) {
      setSelectedReview(selectedReview.filter((r) => r !== n));
    } else {
      setSelectedReview([...selectedReview, n]);
    }
    console.log(selectedReview);
  }
  return (
    <>
      <section>
        <h3>Reviews</h3>
      </section>
      <div className="checkbox_stars_div">
        <input
          onChange={() => handleChange(5)}
          type="checkbox"
          name="stars"
          id=""
        />
        <Star color={undefined} />
        <Star color={undefined} />
        <Star color={undefined} />
        <Star color={undefined} />
        <Star color={undefined} />
      </div>
      <div className="checkbox_stars_div">
        <input
          onChange={() => handleChange(4)}
          type="checkbox"
          name="stars"
          id=""
        />
        <Star color={undefined} />
        <Star color={undefined} />
        <Star color={undefined} />
        <Star color={undefined} />
      </div>
      <div className="checkbox_stars_div">
        <input
          onChange={() => handleChange(3)}
          value={3}
          type="checkbox"
          name="stars"
          id=""
        />
        <Star color={undefined} />
        <Star color={undefined} />
        <Star color={undefined} />
      </div>
    </>
  );
}
