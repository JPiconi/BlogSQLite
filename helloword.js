const express = require("express");

const app = express();

const PORT = 8000; //porta TCP do servidor HHTP da aplicação;
/*-------------------------------------------------------------------------------------------------------------------------------------*/
/* Método express.get necessita de dois parâmetros 
Na ARROW FUNCTION, o primeiro são os dados de servidor (REQUISITION - 'req')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res')*/

app.get("/", (req, res) => {
  res.send("Olá pessoa que está lendo essa mensagem!");
});

//app listen deve ser o último comando da aplicação (app.js);
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}!`);
});
/*-------------------------------------------------------------------------------------------------------------------------------------*/
