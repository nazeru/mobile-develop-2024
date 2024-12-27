import axios from "axios";
import { URL, API_KEY, API_SECRET } from '@env';

const consumerKey = API_KEY;
const consumerSecret = API_SECRET;
const site = URL;

export const getProduct = async (productId) => {
  const url = `https://${site}/wp-json/wc/v3/products/${productId}`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: consumerKey,
        password: consumerSecret
      }
    });
    return response.data; // Данные о продукте
  } catch (error) {
    console.error('Ошибка при запросе продукта:', error);
  }
};

export const getProducts = async (productIds) => {
  const products = [];

  try {
    productIds.map(id => {
        products.push(getProduct(id));
    });
    return products; // Данные о продукте
  } catch (error) {
    console.error('Ошибка при запросе продуктов:', error);
  }

}

export const getCategory = async (catId) => {
  const url = `https://${site}/wp-json/wc/v3/products/categories/${catId}`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: consumerKey,
        password: consumerSecret
      }
    });
    return response.data; // Данные о категории
  } catch (error) {
    console.error('Ошибка при запросе категории:', error);
  }
};

export const getCategories = async (parentCatId, exclude = null) => {
  const url = `https://${site}/wp-json/wc/v3/products/categories?parent=${parentCatId}&exclude=${exclude}`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: consumerKey,
        password: consumerSecret
      }
    });
    return response.data; // Данные о категории
  } catch (error) {
    console.error('Ошибка при запросе категории:', error);
  }
};

export const getProductsFromCategory = async (catId, count) => {
  const per_page = count ? count : 10;
  const url = `https://${site}/wp-json/wc/v3/products?category=${catId}&per_page=${per_page}`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: consumerKey,
        password: consumerSecret
      }
    });
    return response.data; // Данные о товарах категории
  } catch (error) {
    console.error('Ошибка при запросе товаров категории:', error);
  }
};

export const searchProducts = async (query, perPage = 100, page = 1) => {
  const url = `https://${site}/wp-json/wc/v3/products?search=${query}&per_page=${perPage}&page=${page}`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });
    console.log(response)
    return response.data; // Возвращает список товаров
  } catch (error) {
    console.error("Ошибка при поиске товаров:", error);
    return [];
  }
};