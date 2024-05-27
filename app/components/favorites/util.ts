export function getProductId(compositeId: string) {
  const parts = compositeId.split('/');
  const id = parts[parts.length - 1];

  return id;
}
