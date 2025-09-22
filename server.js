import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";

const app = express();
const port = 3000;

const resend = new Resend("re_RxyNRNeS_5D8NXqK4s8Q4f5VPQ5dcg5WC");

app.use(cors());
app.use(bodyParser.json());

app.post("/enviar-chamado", async (req, res) => {
  const { nome, email, escola, setor, equipamento, problema } = req.body;

  const assunto = `Head Office Brasil - Suporte a ${setor} - ${nome} - ${equipamento}`;

  const corpoHTML = `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; padding: 20px;">
      <h2 style="color:#3f8fdfe3;">Novo Chamado Head Office Brasil</h2>
      <p><strong>👤 Solicitante:</strong> ${nome}</p>
      <p><strong>📧 Email:</strong> ${email}</p>
      <p><strong>🏢 Escola/Unidade:</strong> ${escola}</p>
      <p><strong>🏢 Setor:</strong> ${setor}</p>
      <p><strong>💻 Equipamento:</strong> ${equipamento}</p>
      <p><strong>📝 Descrição do problema:</strong> ${problema}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "suporte@escolaeleva.com.br",
      to: [`juliana.lira@inspirededu.com`, email],
      subject: assunto,
      html: corpoHTML,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
