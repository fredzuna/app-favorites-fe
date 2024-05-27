import type {ProductFragment} from 'storefrontapi.generated';
import {getProductId} from './util';

const API_URL = 'http://localhost:5000/api/favorite';

export const addFavorite = async (product: ProductFragment) => {
  const id = getProductId(product.id);

  const bodyRequest = {
    productId: id,
    name: product.title,
    description: product.description,
    price: parseInt(product.selectedVariant?.price.amount, 10),
    imageUrl: product.selectedVariant?.image?.url,
    jsonData: JSON.stringify(product),
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to add favorite product');
    }

    // Handle success, e.g., show a success message or redirect
  } catch (error) {
    console.error('Error:', error);
    // Handle error, e.g., show an error message
  }
};

export const removeFavorite = async (productId: string) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove product');
    }

    // Handle success, e.g., show a success message or update UI
  } catch (error) {
    console.error('Error:', error);
    // Handle error, e.g., show an error message
  }
};

