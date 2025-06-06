// src/config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your Project API",
      version: "1.0.0",
      description: "Proje API dokümantasyonu",
    },
    servers: [
      {
        url: `http://localhost:5000/api`, // Gerekirse değiştir
      },
    ],
  },
  apis: ["./routes/*.js"], // Route'ların yorumları bu dosyalarda olacak
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
