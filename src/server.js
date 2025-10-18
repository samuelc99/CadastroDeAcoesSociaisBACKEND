import app from "./app.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}/api/actions`);
});
