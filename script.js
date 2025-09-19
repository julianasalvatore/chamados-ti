document.getElementById("chamadoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const escola = document.getElementById("escola").value;
  const setor = document.getElementById("setor").value;
  const equipamento = document.getElementById("equipamento").value;
  const problema = document.getElementById("problema").value;

  try {
    const response = await fetch("http://localhost:3000/enviar-chamado", {
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
    }
  } catch (err) {
    document.getElementById("mensagem").innerText = "Erro ao enviar o chamado!";
    console.error(err);
  }
});
