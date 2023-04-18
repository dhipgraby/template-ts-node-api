import { Offer, OfferStatus } from "../../types/Offer";

class OfferStorage {
  private offers: Offer[] = [];

  async createOffer(offer: Omit<Offer, "id" | "status">): Promise<Offer> {
    const newOffer: Offer = { ...offer, id: this.offers.length + 1, status: "pending" };
    this.offers.push(newOffer);
    return newOffer;
  }

  async getOfferById(offerId: number): Promise<Offer | undefined> {
    return this.offers.find((offer) => offer.id === offerId);
  }

  async updateOffer(offer: Offer): Promise<void> {
    const offerIndex = this.offers.findIndex((o) => o.id === offer.id);
    if (offerIndex !== -1) {
      this.offers[offerIndex] = offer;
    }
  }

  async updateOfferStatus(offerId: number, status: OfferStatus): Promise<void> {
    const offerIndex = this.offers.findIndex((o) => o.id === offerId);
    if (offerIndex !== -1) {
      this.offers[offerIndex].status = status;
    }
  }
}

export const offerStorage = new OfferStorage();
