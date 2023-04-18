import { PrismaClient } from "@prisma/client";
import { Card } from "../types/Card";

export class CardStorage {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createCard(card: Omit<Card, "id">): Promise<Card> {
    const newCard = await this.prisma.card.create({ data: card });
    return newCard;
  }

  async getCardById(cardId: number): Promise<Card | null> {
    return await this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });
  }

  async updateCard(card: Card): Promise<Card | null> {
    return await this.prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        name: card.name,
        owner: card.owner,
        price: card.price,
      },
    });
  }
}

export const cardStorage = new CardStorage();
