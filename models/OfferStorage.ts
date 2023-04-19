import { PrismaClient } from "@prisma/client";
import { Offer, OfferStatus } from "../types/Offer";

export class OfferStorage {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createOffer(offer: Omit<Offer, "id" | "status">): Promise<Offer> {
        const newOffer = await this.prisma.offer.create({ data: { ...offer, status: "pending" } });
        return newOffer;
    }

    async getOfferById(offerId: number): Promise<Offer | null> {
        return await this.prisma.offer.findUnique({
            where: {
                id: offerId,
            },
        });
    }

    async updateOffer(offer: Offer): Promise<Offer | null> {
        return await this.prisma.offer.update({
            where: {
                id: offer.id,
            },
            data: {
                cardId: offer.cardId,
                buyerId: offer.buyerId,
                sellerId: offer.sellerId,
                price: offer.price,
                status: offer.status,
            },
        });
    }

    async updateOfferStatus(offerId: number, status: OfferStatus): Promise<void> {
        await this.prisma.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status,
            },
        });
    }
}

export const offerStorage = new OfferStorage();
