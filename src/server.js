import app from "./app.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3333;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend rodando em ${PORT}`);
});
