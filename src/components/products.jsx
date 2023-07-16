import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, Form } from "react-router-dom";
import { getAllProducts, createReview } from "../api";
import {
  Button,
  FilledInput,
  FormControl,
  Input,
  TextField,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { addToCart } from "../components/utils/cartFunctions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useOutletContext } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

library.add(faStar);

import "../css/products.css";

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
          margin: "8px 0",

          "&:hover": {
            backgroundColor: "#d29f13",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          containIntrinsicWidth: "100%",
          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#d29f13",
            color: "white",
            textTransform: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
          fontSize: "16px",
          transition: "background-color 0.3s ease-in-out",
          "&:hover": {
            color: "white",
            textTransform: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
      },
    },
  },
});

export default function Products() {
  const { productId } = useParams();
  const { cart, setCart, user, setUser, token } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const toggleReviewForm = () => {
    setShowReviewForm((prevShowReviewForm) => !prevShowReviewForm);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      if (user) {
        const result = await createReview(token, productId, message, rating);
        console.log(result);
        navigate("/all-products");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const singleProduct = async () => {
    try {
      setLoading(true);
      const products = await getAllProducts(productId);

      const product = products.find((product) => product.id == productId);
      console.log(product);
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
    return <div>Loading...</div>;
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
              <ButtonGroup
                orientation="horizontal"
                className="single-product-btn"
              >
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
                    <Button
                      onClick={toggleReviewForm}
                      className="review-product-btn"
                    >
                      Review Product
                    </Button>{" "}
                  </>
                )}
              </ButtonGroup>
            </ThemeProvider>
            {showReviewForm && (
              <FormControl fullWidth>
                <div className="review-form-container">
                  <h1 className="review-form-title">Leave A Review</h1>
                  <Form
                    color="secondary"
                    onSubmit={handleReviewSubmit}
                    className="review-form"
                    theme={theme}
                    autoComplete="off"
                    noValidate
                  >
                    <TextField
                      className="review-form-input"
                      placeholder="Message"
                      onChange={(event) => setMessage(event.target.value)}
                      value={message}
                      minLength={15}
                      color="secondary"
                      theme={theme}
                      multiline
                      rows={4}
                      fullWidth
                    />
                    <div className="star-rating">
                      <p className="star-label">Rating:</p>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <React.Fragment key={star}>
                            <Input
                              type="radio"
                              id={`star${star}`}
                              name="rating"
                              value={star}
                              checked={rating === star}
                              onChange={() => setRating(star)}
                              className="star-radio"
                            />
                            <label
                              htmlFor={`star${star}`}
                              title={`${star} star`}
                            >
                              <FontAwesomeIcon
                                icon={rating >= star ? solidStar : regularStar}
                                className="star-icon"
                                id={`star${star}`}
                                name="rating"
                                value={star}
                              />
                            </label>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <Button
                      theme={theme}
                      type="submit"
                      className="review-form-submit"
                    >
                      Leave Review
                    </Button>
                  </Form>
                </div>
              </FormControl>
            )}
            {product.reviews.length > 0 && (
              <div className="reviews-container">
                <h1 className="reviews-title">Reviews</h1>
                {product.reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-creator">{review.creatorName}</div>
                    <div className="review-date">Posted: {review.date}</div>
                    <div className="review-message">{review.message}</div>
                    <div className="review-rating">Rating: {review.rating}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
