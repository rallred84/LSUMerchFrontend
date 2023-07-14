import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts, createReview } from "../api";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { addToCart } from "../components/utils/cartFunctions";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { inCartToast } from "../routes/root";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3c1053",
          color: "white",
          textTransform: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease-in-out",
          fontSize: "16px",

          "&:hover": {
            backgroundColor: "#d29f13",
          },
        },
      },
    },
  },
});

export default function Products() {
  const { productId } = useParams();
  const { cart, setCart, user, setUser, token, theme } = useOutletContext();
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({});

  const [reviewForm, setReviewForm] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const showReviewForm = async () => {
    setReviewForm(!reviewForm)
  };

  async function handleReview(event) {
    event.preventDefault();
    try {
      if (user) {
        const result = await createReview(token, productId, message, rating);
        console.log(result);
        navigate('/all-products')
    }
    } catch (err) {
      console.error(err)  
    }
  }

  const singleProduct = async () => {
    try {
      setLoading(true);
      const products = await getAllProducts(productId);

      const product = products.find((product) => product.id == productId);
      console.log(product)
      setProduct(product);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleProduct();
  }, [productId]);

  if (loading) {
    return;
    <> Loading...</>;
  }

  return (
    <div id="product-pg">
      <h1 className="single-product-name">{product.name}</h1>
      <div className="product-details">
        <div className="single-product-image">
          <img src={product.imageURL} alt={product.name} />
        </div>
        <div className="product-info">
          <div className="product-description">{product.description}</div>
          <div className="single-product-price">Price: {product.price}</div>
          <div className="product-page-btn">
            <ThemeProvider theme={theme}>
              <ButtonGroup orientation="vertical">
                <Button
                  onClick={(e) =>
                    addToCart(
                      e,
                      product,
                      user,
                      setUser,
                      cart,
                      setCart,
                      token,
                      inCartToast
                    )
                  }
                  className="product-btn"
                >
                  Add to Cart
                </Button>{" "}
                <br />
                <Link to="/">
                  <Button className="single-product-btn">
                    Back to Products
                  </Button>{" "}
                </Link>
                <br />
                {user?.id && (
                <>
                <Button onClick={showReviewForm} className="review-product-btn">
                    Review Product
                </Button>{" "}
                  </>
                )}
              </ButtonGroup>
            </ThemeProvider>
            {reviewForm && (
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
            )}
            {product.reviews.length > 0 && (
            <>
            <div>
              <h1>Reviews</h1>
              {product.reviews && product.reviews.length
              ? product.reviews.map((review) => {
                return(
                  <div key={review.id}>
                    <div className="review-creator">{review.creatorName}</div>
                    <div className="review-date">Posted: {review.date}</div>
                    <div className="review-message">{review.message}</div>
                    <div className="review-rating">Rating: {review.rating}</div>
                  </div>
                )
              })
            : null}
            </div>
            </>
            ) 
          }
          </div>
        </div>
      </div>
    </div>
  );
}
