import { useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { editReview } from "../api";

export default function EditReview() {
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);

    const {user, token} = useOutletContext();

    const { productId } = useParams();

    const navigate = useNavigate();

    async function handleReview(event) {
        event.preventDefault();
        try {
          if (user) {
            const result = await editReview(token, productId, message, rating);
            console.log(result);
            navigate("/")
        }
        } catch (err) {
          console.error(err)  
        }
    }

    return(
        <div>
            <h1>Edit Review</h1>
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
              <button>Edit Review</button>  
            </form>
        </div>
    )
}