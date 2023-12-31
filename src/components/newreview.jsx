import { useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { createReview } from "../api";

export default function CreateReview() {
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);

    const {user, token} = useOutletContext();

    const { productId } = useParams();

    const navigate = useNavigate();

    async function handleReview(event) {
        event.preventDefault();
        try {
          if (user) {
            const result = await createReview(token, productId, message, rating);
            console.log(result);
            navigate("/")
        }
        } catch (err) {
          console.error(err)  
        }
    }

    return(
        <div>
            <h1>Leave A Review</h1>
            <form onSubmit={handleReview} id="new-review">
              <input
                placeholder="Message"
                onChange={(event) => setMessage(event.target.value)}
                value={message}
                minLength={15}
              />
              <input
                placeholder="Rating"
                onChange={(event) => setRating(event.target.value)}
                value={rating}
              />
              <button>Leave Review</button>  
            </form>
        </div>
    )
}