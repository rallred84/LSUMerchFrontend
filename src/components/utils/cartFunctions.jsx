import {
  addProductToCart,
  updateCartItemQuantity,
  getProfile,
} from "../../api";

export async function addToCart(
  e,
  product,
  user,
  setUser,
  cart,
  setCart,
  token,
  inCartToast
) {
  e.stopPropagation();

  let alreadyInCart = false;
  cart.products.forEach((p) => {
    if (p.id === product.id) {
      alreadyInCart = true;
      return;
    }
  });

  if (alreadyInCart) {
    console.log("Item already in cart");
    inCartToast();
    return;
  }

  if (!user.id) {
    addToAnonCart(product, cart, setCart);
    return;
  }
  if (!user.cart.id) {
    await createNewCart(token);
  }
  await addProductToCart(token, product.id, 1);
  const fetchMe = await getProfile(token);
  setUser(fetchMe);
}

export function addToAnonCart(product, cart, setCart) {
  const newCart = { ...cart };

  newCart.products.push({
    id: product.id,
    name: product.name,
    price: product.price,
    imageURL: product.imageURL,
    quantity: 1,
  });

  newCart.totalPrice = calculateCartPrice(newCart);

  setCart(newCart);
  window.localStorage.setItem("cart", JSON.stringify(newCart));
}

export function calculateCartPrice(cart) {
  let cartTotal = 0;

  cart.products.forEach((product) => {
    cartTotal =
      cartTotal + Number(product.price.slice(1)) * Number(product.quantity);
    console.log(cartTotal);
  });

  return cartTotal;
}

export async function addLoggedOutCartToUser(
  existingCartProducts,
  token,
  setUser
) {
  const loggedOutCart = JSON.parse(window.localStorage.getItem("cart"));
  console.log(loggedOutCart);

  if (loggedOutCart?.products[0]) {
    console.log(loggedOutCart.products);
    loggedOutCart.products.map((product) => {
      let alreadyInCart = false;
      let existingProduct = null;
      existingCartProducts.forEach((p) => {
        if (product.id === p.id) {
          alreadyInCart = true;
          existingProduct = p;
        }
      });
      //If not in users cart, add
      if (!alreadyInCart) {
        Promise.resolve(
          addProductToCart(token, product.id, product.quantity)
        ).then(async () => {
          const fetchMe = await getProfile(token);
          setUser(fetchMe);
        });
      } else {
        //If in users cart, update quantity
        const newQuantity =
          Number(existingProduct.quantity) + Number(product.quantity) <= 5
            ? Number(existingProduct.quantity) + Number(product.quantity)
            : 5;
        Promise.resolve(
          updateCartItemQuantity(token, product.id, newQuantity)
        ).then(async () => {
          const fetchMe = await getProfile(token);
          setUser(fetchMe);
        });
      }
    });

    // Reset user and delete logged out cart from local storage
    const fetchMe = await getProfile(token);
    setUser(fetchMe);
    window.localStorage.removeItem("cart");
  }
}
