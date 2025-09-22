document.getElementById("chamadoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const escola = document.getElementById("escola").value;
  const setor = document.getElementById("setor").value;
  const equipamento = document.getElementById("equipamento").value;
  const problema = document.getElementById("problema").value;

  // Validação de e-mails permitidos
  const dominiosPermitidos = [
    "@inspirededu.com",
    "@escolaeleva.com.br",
    "@alunoeleva.com.br"
    // adicione outros depois
  ];

  const dominioValido = dominiosPermitidos.some(dominio => email.endsWith(dominio));

  if (!dominioValido) {
    alert("Você não faz parte do nosso ambiente educacional ou está deslogado do seu e-mail acadêmico/profissional. Use seu e-mail institucional para abrir seu chamado.");
    return;
  }

  try {
    const response = await fetch("/api/enviar-chamado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, escola, setor, equipamento, problema }),
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("mensagem").innerText = "Chamado enviado com sucesso!";
      document.getElementById("chamadoForm").reset();
    } else {
      document.getElementById("mensagem").innerText = "Erro ao enviar o chamado!";
      console.error(data.error);
    }
  } catch (err) {
    document.getElementById("mensagem").innerText = "Erro ao enviar o chamado!";
    console.error(err);
  }
});
