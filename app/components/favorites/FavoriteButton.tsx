import {useState} from 'react';
import type {ProductFragment} from 'storefrontapi.generated';
import {getProductId} from './util';

interface IProp {
  product: ProductFragment;
  isFavorite: boolean;
}

export default function FavoriteButton(props: IProp) {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const productId = getProductId(props.product.id);
  const handleFavorite = () => {
    const currentFavorite = !isFavorite;

    if (currentFavorite) {
      addFavorite(props.product);
    } else {
      removeFavorite(productId);
    }

    setIsFavorite(currentFavorite);
  };

  const addFavorite = async (product: ProductFragment) => {
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
      const response = await fetch('http://localhost:5000/api/favorite', {
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

  const removeFavorite = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/favorite/${productId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to remove product');
      }

      // Handle success, e.g., show a success message or update UI
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show an error message
    }
  };

  const text = isFavorite ? 'Remove from favorite' : 'Add to Favorite';

  return <button onClick={handleFavorite}>{text}</button>;
}
