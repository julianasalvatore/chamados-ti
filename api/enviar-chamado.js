import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, email, escola, setor, equipamento, problema } = req.body;

  // Validação no backend também
  const dominiosPermitidos = [
    "@inspirededu.com",
    "@escolaeleva.com.br",
    "@alunoeleva.com.br"
  ];

  const dominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));

  if (!dominioValido) {
    return res.status(403).json({ success: false, error: "E-mail não autorizado" });
  }

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
      from: "suporte@escolaeleva.com.br", // e-mail verificado no Resend
      to: [`it.support@inspirededu.com`, email],
      subject: assunto,
      html: corpoHTML,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
