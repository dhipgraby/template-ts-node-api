export type OfferStatus = "pending" | "accepted" | "declined";

export interface Offer {
  id: number;
  cardId: number;
  buyerId: number;
  sellerId: number;
  price: number;
  status: string;
}