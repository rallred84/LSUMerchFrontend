// Will set up all API Requests here
export const BASE_URL = "https://tigers-den.onrender.com/api"


/*products*/ 

/* GET /products */
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const result = await response.json();
    const info = result.data.products;
    // console.log(info)
    return info
  } catch (err) {
    console.error(err)
  }
}
