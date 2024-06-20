import { useState } from "react";
import Star from "../../components/ProductsRelated/Star";
import useAxiosPrivate from "../../utils/useAxiosPrivate";
import toast from "react-hot-toast";
import toastConfigs from "../../utils/toastConfig";
import DOMPurify from "dompurify";

type ComponentProps = {
  productId: string;
  userId: string;
  setReviewProductId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function ReviewInput({
  productId,
  userId,
  setReviewProductId,
}: ComponentProps) {
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState("");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newReview = {
      title: title,
      comment: comment,
      stars: stars,
      user: userId,
    };
    if (title === "" || comment === "") {
      toast.error(
        "Please fill both the title and the review to submit",
        toastConfigs
      );
      return;
    }
    try {
      const response = await axiosPrivate.post(
        `user_api/submit_rev/${productId}`,
        newReview
      );
      if (response.status !== 200)
        return toast.error("An error occured", toastConfigs);
      toast.success("Review submitted successfully", toastConfigs);
      setReviewProductId(undefined);
    } catch (err) {
      console.log(err);
      toast.error("An error occured", toastConfigs);
    }
  };

  function handleClick(x: number) {
    if (stars === x) {
      setStars(0);
    }
    {
      setStars(x);
    }
  }

  function handleRevTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const sanitizedTitle = DOMPurify.sanitize(e.target.value);
    setTitle(sanitizedTitle);
  }
  function handleRevComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const sanitizedComment = DOMPurify.sanitize(e.target.value);
    setComment(sanitizedComment);
  }

  return (
    <div className="review_input_div">
      <div>
        <form action="">
          <div>
            <label htmlFor="title"></label>
            <input
              onChange={(e) => handleRevTitle(e)}
              placeholder="Add a title"
              name="title"
              id="title"
              className="review__input review__input--title"
              type="text"
              value={title}
            />
          </div>
          <div>
            <label htmlFor="review"></label>
            <textarea
              onChange={(e) => handleRevComment(e)}
              placeholder="Add a review"
              name="review"
              className="review__input review__input--message"
              id="review"
              value={comment}
            />
          </div>
        </form>
      </div>
      <div className="stars_container">
        <div className="strs">
          <div onClick={() => handleClick(1)} className="star_container">
            <Star color={stars >= 1 ? undefined : "gray"}></Star>
          </div>
          <div onClick={() => handleClick(2)} className="star_container">
            <Star color={stars >= 2 ? undefined : "gray"}></Star>
          </div>
          <div onClick={() => handleClick(3)} className="star_container">
            <Star color={stars >= 3 ? undefined : "gray"}></Star>
          </div>
          <div onClick={() => handleClick(4)} className="star_container">
            <Star color={stars >= 4 ? undefined : "gray"}></Star>
          </div>
          <div onClick={() => handleClick(5)} className="star_container">
            <Star color={stars === 5 ? undefined : "gray"}></Star>
          </div>
        </div>
        <button
          className="review__submit_button"
          onClick={handleSubmit}
          type="submit"
        >
          Send Review
        </button>
      </div>
    </div>
  );
}
