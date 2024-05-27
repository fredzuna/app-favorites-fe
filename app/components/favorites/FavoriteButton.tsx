import {useState} from 'react';
import type {ProductFragment} from 'storefrontapi.generated';
import {getProductId} from './util';
import {addFavorite, removeFavorite} from './favoriteService';

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

  const text = isFavorite ? 'Remove from favorite' : 'Add to Favorite';

  return <button onClick={handleFavorite}>{text}</button>;
}
