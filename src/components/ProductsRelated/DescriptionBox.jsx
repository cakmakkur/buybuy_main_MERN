import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const DESCRIPTION_URL = import.meta.env.VITE_URL_DESCRIPTION;

export default function DescriptionBox({ id }) {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    fetch(`${DESCRIPTION_URL + "/" + id}`)
      .then((res) => res.text())
      .then((html) => {
        // const sanitisedHtml = DOMPurify.sanitize(html);
        setHtml(html);
      })
      .catch((err) => console.log("Couldn\t get the reviews" + err));
  }, [id]);

  return (
    <div
      className="ind_cmm_p_st"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
