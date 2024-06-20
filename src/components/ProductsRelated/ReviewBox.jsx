import Star from "/src/components/ProductsRelated/Star";

export default function ReviewBox({ review }) {
  const stars = Array.from({ length: review.stars }, (_, index) => (
    <Star key={index} />
  ));

  function getInitialLetter(name) {
    return name[0];
  }

  return (
    <div id="reviews_section" className="review_div">
      <div className="review_div_creds">
        <div className="review_div_creds_1">
          {getInitialLetter(review.user)}
        </div>
        <div className="review_div_creds_2">
          <div>{review.title}</div>
          <div>
            {
              <>
                {stars}
                <h5>{review.date}</h5>
              </>
            }
          </div>
        </div>
      </div>
      <div className="ind_pr_1_b">{review.comment}</div>
    </div>
  );
}
