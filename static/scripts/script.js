console.log("JS CONECTADO");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const ConfirmarSenha = document.getElementById("ConfirmarSenha");
const celular = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgError = document.getElementsByClassName("msgError");

/* ------ FUNÇÃO PARA RENDERIZAR AS DIFERENTES MENSAGENS DE ERRO! ------ */
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};

/* ---------------- FUNÇÃO PARA VERIFICAR O NOME ----------------------- */
const chekNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

/* ---------- FUNÇÃO PARA VERIFICAR O EMAIL --------------------- */
const chekEmail = (email) => {
  const partesEmail = email.split("@");

  if (
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "gmail.com") ||
    (partesEmail.length === 2 &&
      partesEmail[1].toLowerCase() === "outlook.com") ||
    (partesEmail.length === 2 && partesEmail[1].toLowerCase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
};

/* ---------- FUNÇÃO PARA VERIFICAR IGUALDADE DAS SENHAS --------------- */
function chekPasswordMatch() {
  return password.value === ConfirmarSenha.value ? true : false;
}

/* ----------- FUNÇÃO PARA INSERIR MASCARA NO TELEFONE ----------------- */
function maskPhoneNumber(event) {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }

  celular = celular.replace(/\D/g, "");

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  } else if (celular.length > 0) {
    celular = `(${celular})`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
}

/* ------------- FUNÇÃO PARA VERIFICAR FORÇA DA SENHA ------------------ */
function chekPasswordStrength(password) {
  if (!/[a-z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/[\W_]/.test(password)) {
    return "A senha deve ter pelo menos uma letra especial!";
  }
  if (!/\d/.test(password)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

/* ------------- FUNÇÃO PARA VERIFICAR E ENVIAR DADOS ------------------ */
function fetchDatas(event) {
  event.preventDefault();

  if (!chekNome(nome.value)) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!chekEmail(email.value)) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!chekPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (celular.value && /[A-Za-zÀ-ÿ]/.test(celular.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: password.value,
    celular: celular.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}

formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", () => {
  if (nome.value && !chekNome()) {
    createDisplayMsgError(
      "O Nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !chekEmail(email.value)) {
    createDisplayMsgError("O Email digitado não é válido!");
  } else {
    createDisplayMsgError("");
  }
});

password.addEventListener("input", () => {
  if (password.value && chekPasswordStrength(password.value)) {
    createDisplayMsgError(chekPasswordStrength(password.value));
  } else {
    createDisplayMsgError("");
  }
});

// ConfirmarSenha.addEventListener("input", () => {
//   if (ConfirmarSenha.value && !chekEmail(ConfirmarSenha.value)) {
//     createDisplayMsgError("");
//   } else {
//     createDisplayMsgError("");
//   }
// });

celular.addEventListener("input", maskPhoneNumber);
