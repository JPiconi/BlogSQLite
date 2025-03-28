//Para usar o prompt no nodejs é preciso instalar essa lib 'prompt-sync'

let prompt = require("prompt-sync");
prompt = prompt();

// Parte 1 desconto

let price = parseFloat(prompt("Qual o preço do produto?: "));
let desconto = parseFloat(prompt("Digite o valor do desconto Por favor: "));

function calcularDesconto(price, desconto) {
  const resultado = price - (price * desconto) / 100;
  console.log("O valor com o desconto aplicado é: ", resultado);
}

calcularDesconto(price, desconto);

// Parte 1 temperatura

let tCelsius = parseFloat(prompt("Digite a temperatura: "));

function CelsiusParaFahrenheit(tCelsius) {
  const fahrenheit = (tCelsius * 9) / 5 + 32;
  console.log("A temperatura de Celsius para Fahrenheit é: ", fahrenheit);
}

CelsiusParaFahrenheit(tCelsius);

// Parte 1 Juros

let P = parseFloat(prompt("Insira o valor original do empréstimo: "));
let R = parseFloat(prompt("Insira a Taxa a ser cobrada: "));
let T = parseFloat(prompt("Insira a quantidade de dias para ser calculado: "));

function juros(P, R, T) {
  const calcularJuros = (juros = P * (R / 100) * T);
  console.log("o valor dos juros a serem cobrados é: ", calcularJuros);
}

juros(P, R, T);

// Parte 2 Maior Numero

let number1 = parseFloat(prompt("Digite um número!: "));
let number2 = parseFloat(prompt("Digite mais um número!: "));

function MaiorNumero(number1, number2) {
  if (number1 > number2) {
    console.log("O número ", number1, "é maior");
  } else if (number1 < number2) {
    console.log("O número ", number1, "é menor");
  } else {
    console.log("Os números são iguais!");
  }
}

MaiorNumero(number1, number2);

// Parte 2 Idade

let idade = parseFloat(prompt("Insira sua idade!: "));

function Classificaridade(idade) {
  if (idade < 12) {
    console.log("Criança!");
  } else if (idade < 18) {
    console.log("Adolescente!");
  } else {
    console.log("Adulto!");
  }
}

Classificaridade(idade);

// Parte 2 nota

let nota = parseFloat(prompt("Digite sua nota!: "));

function validarNota(nota) {
  if (nota < 0) {
    console.log("False!");
  } else if (nota > 10) {
    console.log("False!");
  } else {
    console.log("True!");
  }
}

validarNota(nota);

// Parte 3 aprovado ou reprovado

let media = parseFloat(prompt("Digite sua média: "));
let faltas = parseFloat(prompt("Digite quantas faltas você teve!: "));
let falta = 0;
falta = faltas / 100;

function verificarAprovacao(media, faltas) {
  if (media >= 7 && faltas < 25) {
    console.log("Aluno Aprovado!");
  } else {
    console.log("Aluno reprovado!");
  }
}

verificarAprovacao(media, faltas);

// Parte 3 Intervalo de valores

let valor = parseFloat(prompt("Digite um valor!: "));

function estaNoIntervalo(valor, min, max) {
  if (valor >= min && valor <= max) {
    console.log("O valor esta no intervalo!");
  } else {
    console.log("O valor não esta no intervalo!");
  }
}

estaNoIntervalo(valor, 1, 10);

// Parte 3 verificação de login

let username = prompt("Digite seu usuário!: ");
let senha = prompt("Digite sua senha!: ");

function VerificarLogin(username, senha) {
  username === "admin" && senha === "1234"
    ? console.log("Login bem-sucedido")
    : console.log("Usuário ou senha incorretos");
}

VerificarLogin(username, senha);
