// Para ativar o contato, preencha com o WhatsApp oficial: país, DDD e número, só dígitos.
const whatsappEscritorio = "";
const opcoes = {
  negado: ["Separe a decisão recebida e anote a data em que tomou conhecimento dela.", "Meu benefício foi negado e gostaria de entender o motivo da decisão e os próximos passos."],
  pendente: ["Tenha à mão a última movimentação e, se houver, a comunicação de exigência.", "Tenho um pedido em andamento e preciso de orientação sobre a última movimentação."],
  revisao: ["Liste os vínculos ou períodos sobre os quais você tem dúvidas.", "Gostaria de conversar sobre minha aposentadoria ou a revisão do meu benefício."],
  outro: ["Anote o nome do benefício e escreva a pergunta que deseja esclarecer.", "Tenho uma dúvida previdenciária e gostaria de agendar uma conversa."]
};
const situacao = document.querySelector("#situacao");
const mensagem = document.querySelector("#mensagem");
const statusCopia = document.querySelector("#status");
const whatsapp = document.querySelector("#whatsapp");
function atualizarContato() {
  if (/^\d{10,15}$/.test(whatsappEscritorio)) {
    whatsapp.href = "https://wa.me/" + whatsappEscritorio + "?text=" + encodeURIComponent(mensagem.value);
    whatsapp.hidden = false;
  }
}
function selecionarSituacao() {
  const [orientacao, texto] = opcoes[situacao.querySelector("input:checked").value];
  document.querySelector("#orientacao").textContent = orientacao;
  mensagem.value = "Olá, Couto e Bandeira ADV! " + texto;
  statusCopia.textContent = "";
  atualizarContato();
}
for (const link of document.querySelectorAll("[data-caso]")) {
  link.addEventListener("click", () => {
    situacao.querySelector('input[value="' + link.dataset.caso + '"]').checked = true;
    selecionarSituacao();
  });
}
situacao.addEventListener("change", selecionarSituacao);
mensagem.addEventListener("input", atualizarContato);
document.querySelector("#copiar").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(mensagem.value);
    statusCopia.textContent = "Mensagem copiada.";
  } catch {
    mensagem.focus();
    mensagem.select();
    statusCopia.textContent = "Mensagem selecionada. Use a opção Copiar do seu dispositivo.";
  }
});
selecionarSituacao();
