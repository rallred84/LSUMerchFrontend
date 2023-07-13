import { addProductToCart, getProfile } from "../../api";

export async function addToCart(
  e,
  product,
  user,
  setUser,
  cart,
  setCart,
  token
) {
  e.stopPropagation();
  if (!user.id) {
    addToAnonCart(product, cart, setCart);
    return;
  }
  if (!user.cart.id) {
    await createNewCart(token);
  }
  await addProductToCart(token, product.id);
  const fetchMe = await getProfile(token);
  setUser(fetchMe);
}

export function addToAnonCart(product, cart, setCart) {
  let alreadyInCart = false;
  cart.products.forEach((p) => {
    if (p.id === product.id) {
      alreadyInCart = true;
      return;
    }
  });

  if (alreadyInCart) {
    console.log("Item already in cart");
    return;
  }

  const newCart = { ...cart };

  newCart.products.push({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  });

  // cart.products.push({
  //   id: product.id,
  //   name: product.name,
  //   price: product.price,
  //   quantity: 1,
  // });
  setCart(newCart);
  window.localStorage.setItem("cart", JSON.stringify(newCart));
}
