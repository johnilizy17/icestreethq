import axios from "../axiosConfig";


export const getCategories = async () => {
  const { data } = await axios.get("/category");
  return data;
};


export const getLive = async () => {
  const { data } = await axios.get("/live");
  return data;
};

export const getProducts = async (item: any) => {
  const { data } = await axios.get("/products-by-category", {
    params: item
  });
  return data;
};

export const getCategoriesById = async (categoryID: any) => {
  const { data } = await axios.get(`/products-by-category?category=${categoryID}`);
  return data;
}

export const getProductsById = async (item: any) => {
  const { data } = await axios.get("/product/" + item);
  return data;
};

export const getCartById = async (item: any) => {
  const { data } = await axios.get("/cart/user/" + localStorage.getItem("user") + "");
  return data;
};

export const guestLogin = async (info: any) => {
  const { data } = await axios.post("/guest", info);
  return data;
};

export const forgotPassword = async (info: any) => {
  const { data } = await axios.post("/forgotten/password", info);
  return data;
};

export const getHeaderDetails = async () => {
  const { data } = await axios.get("/header");
  return data;
};


export const resetPassword = async (info: any) => {
  const { data } = await axios.post("/reset/password", info);
  return data;
};

export const PurchaseItem = async (item: any) => {
  const data = await axios.post("/cart/user", item);
  return data;
};

export function useAddToCartCallback() {
  const handleAddToCart = async (credentials: any, index: any): Promise<any> => {
    try {
      const response = await axios.put('/cart/user/' + index, credentials,
        {
          headers: { 'Content-Type': 'application/json' },
        });
      return response
    } catch (err: any) {
      return err?.response
    }
  }
  return { handleAddToCart }
} 