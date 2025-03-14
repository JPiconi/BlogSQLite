const express = require("express");

const app = express();

const PORT = 8000; //porta TCP do servidor HHTP da aplicação;

const index =
  "<a href='/sobre'> Sobre </a> <a href='/information'> Informações  </a>";

const sobre = 'Você está na pagina "Sobre"<br><a href="/">Voltar</a>';
const information =
  'Você está na pagina "Information"<br><a href="/">Voltar</a>';

/*Método express.get necessita de dois parâmetros 
Na ARROW FUNCTION, o primeiro são os dados de servidor (REQUISITION - 'req')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res')*/

app.get("/", (req, res) => {
  res.send(index);
});

app.get("/sobre", (req, res) => {
  res.send(sobre);
});

app.get("/information", (req, res) => {
  res.send(information);
});

//app listen deve ser o último comando da aplicação (app.js);
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}!`);
});
