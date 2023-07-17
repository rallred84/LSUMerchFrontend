// Will set up all API Requests here
export const BASE_URL = "https://tigers-den.onrender.com/api";

/*users*/

/* POST /users/register */
export async function createUser(email, password, firstName, lastName) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

/* POST /users/login */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

/* GET /users/profile */
export async function getProfile(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    const info = result.data.user;
    console.log(info);
    return info;
  } catch (err) {
    console.error(err);
  }
}

//////////////////

/*products*/

/* GET /products */
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const result = await response.json();
    const info = result.data.products;

    // console.log(info)

    return info;
  } catch (err) {
    console.error(err);
  }
}

/* POST /products */
export async function createProduct(
  token,
  name,
  description,
  price,
  stockQuantity,
  imageURL,
  size,
  category,
  isFeatured
) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        stockQuantity,
        imageURL,
        size,
        category,
        isFeatured,
      }),
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

/* PATCH /products/:productId */
export async function editProduct(
  token,
  productId,
  name,
  description,
  price,
  stockQuantity,
  size,
  category,
  isFeatured
) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        stockQuantity,
        size,
        category,
        isFeatured,
      }),
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

/* DELETE /products/:productId */
export async function deleteProduct(token, productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//////////////////

/*reviews*/

/*POST /reviews/:productId */
export async function createReview(token, productId, message, rating) {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        rating,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

/*PATCH /reviews/:productId */
export async function editReview(token, productId, message, rating) {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        rating,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

/*DELETE /reviews/:productId */
export async function deleteReview(token, productId) {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//////////////////

/*orders*/

/*GET /orders */
export async function getOrders(token) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    const info = result.data.orders;
    // console.log(result);
    return info;
  } catch (err) {
    console.error(err);
  }
}

//GET /orders/:userId

export async function getUsersOrders(token, userId) {
  try {
    const response = await fetch(`${BASE_URL}/orders/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    const info = result.data.orders;
    console.log(info);
    return info;
  } catch (err) {
    console.error(err);
  }
}

//POST /orders

export async function createNewCart(token) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

//PATCH /orders/place
export async function placeOrder(token) {
  try {
    const response = await fetch(`${BASE_URL}/orders/place`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

//PATCH /orders/:orderId/complete
export async function orderComplete(token, orderId) {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

////////// ORDERS_PRODUCTS

//POST /orders_products/add

export async function addProductToCart(token, productId, quantity) {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

//DELETE /orders_products/remove

export async function removeFromCart(productId, token) {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//PATCH /orders_products/update
export async function updateCartItemQuantity(token, productId, quantity) {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

//Stripe Checkout
export async function stripeCheckout(totalPrice, orderId, token) {
  try {
    const response = await fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        totalPrice,
        orderId,
      }),
    });
    const body = await response.json();
    window.location.href = body.url;
  } catch (err) {
    console.error(err);
  }
}
