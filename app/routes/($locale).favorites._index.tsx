import {useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import FavoriteItem from '~/components/favorites/FavoriteItem';

interface FavoriteApi {
  get: (url: string) => Promise<any>;
}

// Creating new page to display favorite list
export async function loader({context, request}: LoaderFunctionArgs) {
  const {favoriteApi} = context; // We are connecting to the favorite API to check if the product is favorited.

  if (!favoriteApi) {
    return;
  }

  const favorites = await (favoriteApi as FavoriteApi).get('api/favorite');
  return defer({favorites});
}

export default function Favorites() {
  const {favorites} = useLoaderData<typeof loader>();

  return (
    <div className="collections">
      <h1>Favorite products</h1>
      <div className="products-grid">
        {favorites.map((favorite: any, index: number) => {
          return (
            <FavoriteItem
              key={favorite.id}
              favorite={favorite}
              loading={index < 8 ? 'eager' : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
