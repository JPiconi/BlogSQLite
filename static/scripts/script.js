console.log("JS conectado");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("password");
const ConfirmarSenha = document.getElementById("ConfirmarSenha");
const telefone = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgError = document.getElementsByClassName("msgError");

//Função Para Rendenizar Os Diferentes Mensagens de Erro!.
const createDisplayMsgError = (mensagem) => {
  msgError[0].textContent = mensagem;
};
/* ---------------------------------------------------------------------------------*/
/*-----------------Função Para Verificar O Nome ---------------*/
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};
/* ---------------------------------------------------------------------------------*/
/*-----------------Função Para Mascarar o CPF ---------------*/
document.getElementById("cpf").addEventListener("input", function (event) {
  let inputValue = event.target.value.replace(/\D/g, "");
  inputValue = inputValue.substring(0, 14);

  if (inputValue.length > 9) {
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
  } else if (inputValue.length > 6) {
    inputValue = inputValue.replace(/(\d{3})(\d{3})/, "$1.$2.");
  } else if (inputValue.length > 3) {
    inputValue = inputValue.replace(/(\d{3})/, "$1.");
  }

  event.target.value = inputValue;
});
/* ---------------------------------------------------------------------------------*/
/*-----------------Função Para mascarar O rg ---------------*/
document.getElementById("rg").addEventListener("input", function (event) {
  let rgmask = event.target.value.replace(/\D/g, "");
  rgmask = rgmask.substring(0, 9);

  if (rgmask.length > 8) {
    rgmask = rgmask.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3-");
  }

  event.target.value = rgmask;
});
/* --
/* ---------------------------------------------------------------------------------*/
/*-----------------Função Para Verificar O Email ---------------*/
const checkEmail = (email) => {
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
/* ---------------------------------------------------------------------------------*/
/*------------------Função Para Verificar Senha-------------------------------------*/
function checkPasswordStrength(password) {
  if (!/[a-z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra Maiúscula!";
  }
  if (!/[\W_]/.test(password)) {
    return "A senha deve ter pelo menos um caracter especial!";
  }
  if (!/\d/.test(password)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}
/* ---------------------------------------------------------------------------------*/
/* -----------------Função para igualar as senhas--------------------------*/
function checkPasswordMatch() {
  return password.value === ConfirmarSenha.value ? true : false;
}
/* ---------------------------------------------------------------------------------*/
/*------------------Função Para Inserir mascara no telefone-------------------------------------*/
function maskPhoneNumber(event) {
  let telefone = event.target.value;
  if (/[A-Za-zÀ-ÿ]/.test(telefone)) {
    createDisplayMsgError("O celular deve conter apenas números!");
  } else {
    createDisplayMsgError("");
  }
  telefone = telefone.replace(/\D/g, ""); //Remove os caracteres não numéricos

  if (telefone.length > 11) {
    telefone = telefone.substring(0, 11);
  }
  if (telefone.length > 2) {
    telefone = `(${telefone.substring(0, 2)}) ${telefone.substring(2)}`;
  } else if (telefone.length > 0) {
    telefone = `(${telefone})`;
  }
  if (telefone.length > 10) {
    telefone = telefone.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }
  event.target.value = telefone;
}
/* ---------------------------------------------------------------------------------*/

/* -----------------Função para igualar as senhas--------------------------*/
function fetchDatas(event) {
  event.preventDefault();

  if (!checkNome) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError("O email esta inválido!");
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(password.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    return;
  }

  if (telefone.value && /[A-Za-zÀ-ÿ]/.test(telefone.value)) {
    createDisplayMsgError("O telefone deve conter apenas números");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: password.value,
    celular: telefone.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado: ", JSON.stringify(formData, null, 2));
}
//formulario.addEventListener("submit", fetchDatas);
/* ---------------------------------------------------------------------------------*/

/* -----------------Função para criar a chuva no formulário--------------------------*/
const rainfunction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.getElementsByClassName("container_rain");
  let left = Math.floor(Math.random() * (310 - 65) + 65);
  let duration = Math.random() * 5;

  rain.classList.add("rain");
  cont_rain[0].appendChild(rain);
  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain[0].removeChild(rain);
  }, 1500);
};
setInterval(() => {
  rainfunction();
}, 250);
/* ---------------------------------------------------------------------------------*/

nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é válido!");
  } else {
    createDisplayMsgError("");
  }
});

password.addEventListener("input", () => {
  if (password.value && checkPasswordStrength(password.value)) {
    createDisplayMsgError(checkPasswordStrength(password.value));
  } else {
    createDisplayMsgError("");
  }
});

telefone.addEventListener("input", maskPhoneNumber);

// function maskRG(event) {
//   let inputValue = event.target.value;
//   inputValue = inputValue.replace(/[^0-9X]/gi, "");
//   if (inputValue.length > 10) {
//     inputValue = inputValue.substring(0, 9);
//   }
//   inputValue = inputValue.replace(/^(\w{2})(\w)/, "$1.$2");
//   inputValue = inputValue.replace(/^(\w{2})\.(\w{3})(\w)/, "$1.$2.$3");
//   inputValue = inputValue.replace(
//     /^(\w{2})\.(\w{3})\.(\w{3})(\w)/,
//     "$1.$2.$3-$4"
//   );
//   event.target.value = inputValue;
// }
// rg.addEventListener("input", maskRG);
