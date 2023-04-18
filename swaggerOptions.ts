export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NFT Marketplace Simulator API",
            version: "1.0.0",
            description: "A marketplace API",
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./src/controllers/*.ts"], // Change this path to match the location of your API route files
};

export default swaggerOptions;
