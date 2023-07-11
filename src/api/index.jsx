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
    // console.log(info);
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
  size
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
  size
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

<<<<<<< HEAD
/////////////////

// POST /orders

export async function createNewCart(token) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
=======
//////////////////

/*orders*/

/*GET /orders */
export async function getOrders(token) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
>>>>>>> 5c3c3c027f408320f12962856d888f9a7c90b798
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
<<<<<<< HEAD
    return result;
  } catch (err) {
    console.error(err);
  }
}

// POST /orders_products/add

export async function addProductToCart(token, productId) {
  try {
    const response = await fetch(`${BASE_URL}/orders_products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity: 1,
      }),
    });
    const result = await response.json();
    console.log(result);
    const info = result.data.cart;
=======
    const info = result.data.orders;
    // console.log(result);
>>>>>>> 5c3c3c027f408320f12962856d888f9a7c90b798
    return info;
  } catch (err) {
    console.error(err);
  }
}
<<<<<<< HEAD
=======

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
>>>>>>> 5c3c3c027f408320f12962856d888f9a7c90b798
