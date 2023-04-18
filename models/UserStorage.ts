// models/UserStorage.ts
import { PrismaClient, User } from "@prisma/client";

export class UserStorage {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async getUserByWallet(wallet: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { wallet } });
  }

  async createUser(user: User): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }
}

export const userStorage = new UserStorage();
