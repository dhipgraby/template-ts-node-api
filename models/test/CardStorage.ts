import { Card } from "../../types/Card";

class CardStorage {
  private cards: Card[] = [];

  async createCard(card: Omit<Card, "id">): Promise<Card> {
    const newCard: Card = { ...card, id: this.cards.length + 1 };
    this.cards.push(newCard);
    return newCard;
  }

  async getCardById(cardId: number): Promise<Card | undefined> {
    return this.cards.find((card) => card.id === cardId);
  }

  async updateCard(card: Card): Promise<void> {
    const cardIndex = this.cards.findIndex((c) => c.id === card.id);
    if (cardIndex !== -1) {
      this.cards[cardIndex] = card;
    }
  }
}

export const cardStorage = new CardStorage();
