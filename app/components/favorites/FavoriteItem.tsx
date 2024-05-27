import {Link} from '@remix-run/react';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import type IFavorite from './interface/IFavorite';

interface IProp {
  favorite: IFavorite;
  loading?: 'eager' | 'lazy';
}

export default function FavoriteItem({favorite, loading}: IProp) {
  const product = JSON.parse(favorite.jsonData) as ProductItemFragment;
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <img
        alt={favorite.name}
        src={favorite.imageUrl}
        loading={loading}
        width="100"
        height="100"
      />

      <h4>{favorite.name}</h4>
      <p>{favorite.description}</p>
      <small>{favorite.price}</small>
    </Link>
  );
}
