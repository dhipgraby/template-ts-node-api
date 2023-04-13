// models/UserStorage.ts

import { User } from "./User";

class UserStorage {
    private users: User[] = [];

    public createUser(user: User): User {
        this.users.push(user);
        return user;
    }

    async getUserById(userId: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === userId);
        return user;
    }

    public getUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    public getUserByWallet(wallet: string): User | undefined {
        return this.users.find(user => user.wallet === wallet);
    }

    async updateUserWallet(userId: number, newBalance: number): Promise<void> {
        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex].balance = newBalance;
        }
    }
}

export const userStorage = new UserStorage();
