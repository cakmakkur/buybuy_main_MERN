export type ProductType = {
  id: string,
  name: string,
  img_path: string[],
  category: string,
  description: string,
  brand: string,
  productImg: string,
  color: string,
  priceCents: number,
  prevPriceCents: number,
  shippingCostCents: number,
  inStock: boolean,
  tn_description: string
}

export type CartType = CartItemType[]

export type CartItemType = {
  id: string,
  name: string,
  quantity: number,
  priceCents: number,
  shippingCostCents: number,
  tnUrl: string,
}


// type OrderDetails = {
//   productId: string,
//   quantity: number,
//   currentUnitPrice: number
// }

export type PrevOrderType = {
  productId: string,
  productName: string,
  productThumbnail: string,
  quantity: number,
  currentUnitPrice: number
};

export type Review = {
  id: string, 
  user: string, 
  date: string, 
  stars: number, 
  title: string, 
  comment: string
}

export type ReviewDetailsObject = {
  id: string,
  average: number,
  reviewAmount: number
}

export type ReviewDetails = {
  reviewDetails: ReviewDetailsObject
}

