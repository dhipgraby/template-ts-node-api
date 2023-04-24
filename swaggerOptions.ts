export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Base Api",
            version: "1.0.0",
            description: "Base Api",
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./src/controllers/routes/*.ts"], // Change this path to match the location of your API route files
};

export default swaggerOptions;
