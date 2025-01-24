const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

// get api
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get product
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

// post product
app.post("/products", async (req, res) => {
  const newDataProduct = req.body;

  const product = await prisma.product.create({
    data: {
      name: newDataProduct.name,
      description: newDataProduct.description,
      image: newDataProduct.image,
      price: newDataProduct.price,
    },
  });

  res.send({
    data: product,
    message: "create product success",
  });
});

// delete product
app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.send("product deleted");
});

// update product
app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const dataProduct = req.body;

  if (
    !(
      dataProduct.name &&
      dataProduct.description &&
      dataProduct.price &&
      dataProduct.image
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  const product = await prisma.product.update({
    where: {
      id: +productId,
    },
    data: {
      name: dataProduct.name,
      description: dataProduct.description,
      price: dataProduct.price,
      image: dataProduct.image,
    },
  });
  res.send({
    data: product,
    message: "update product success",
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const dataProduct = req.body;

  const product = await prisma.product.update({
    where: {
      id: +productId,
    },
    data: {
      name: dataProduct.name,
      description: dataProduct.description,
      price: dataProduct.price,
      image: dataProduct.image,
    },
  });
  res.send({
    data: product,
    message: "update product success",
  });
});

//patch

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
