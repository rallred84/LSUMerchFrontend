import React, { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { editReview } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "../css/editReview.css";

export default function EditReview() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const { user, token } = useOutletContext();

  const { productId } = useParams();

  const navigate = useNavigate();

  async function handleReview(event) {
    event.preventDefault();
    try {
      if (user) {
        const result = await editReview(token, productId, message, rating);
        console.log(result);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="edit-review-container">
      <h1 className="edit-review-title">Edit Review</h1>
      <form onSubmit={handleReview} className="edit-review-form">
        <input
          className="edit-review-input"
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          minLength={15}
        />
        <div className="star-rating">
          <p className="star-label">Rating:</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <label htmlFor={`star${star}`} key={star} title={`${star} star`}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={(event) => setRating(Number(event.target.value))}
                />
                <FontAwesomeIcon
                  icon={rating >= star ? solidStar : regularStar}
                  className="star-icon"
                />
              </label>
            ))}
          </div>
        </div>
        <button className="edit-review-button" type="submit">
          Edit Review
        </button>
      </form>
    </div>
  );
}
