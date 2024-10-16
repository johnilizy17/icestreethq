export const CART_ID = "cartId"


export const getLocalStorageKeysByValue = (value: string) => {
    const keys = Object.keys(localStorage);
    const matchingKeys = [];
  
    for (const key of keys) {
      const storedValue = localStorage.getItem(key);
  
      if (storedValue === value) {
        matchingKeys.push(key);
      }
    }
  
    return matchingKeys;
  };


export const deleteLocalStorageKeysByValue = (value: string | undefined ) => {
    if (!value) return
    const matchingKeys = getLocalStorageKeysByValue(value);
  
    for (const key of matchingKeys) {
      localStorage.removeItem(key);
    }
  };
  