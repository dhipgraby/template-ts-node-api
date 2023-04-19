export const isValidUsername = (username: string): boolean => {
    const regex = /^[A-Za-z0-9]{5,50}$/;
    return regex.test(username);
};

export const isValidPassword = (password: string): boolean => {
    const regex = /^[A-Za-z0-9]{8,12}$/;
    return regex.test(password);
};

export const nameError = "Invalid username. Username should be 5-50 characters long and contain only alphanumeric characters (no dots, commas, or underscores)."

export const passwordError = "Invalid password. Password should be 8-12 characters long and contain only alphanumeric characters (no dots, commas, or underscores)."