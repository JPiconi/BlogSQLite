const express = require("express"); // importa lib do Express

const sqlite3 = require("sqlite3"); // Importa lib do sqlite3

const PORT = 8000; //porta TCP do servidor HHTP da aplicação;

const app = express(); //Instância para uso do Express

const db = new sqlite3.Database("user.db"); //Instância para uso do Sqlite3, e usa o arquivo 'user.db'

db.serialize(() => {
  //Este método permite enviar comandos SQL em modo 'sequencial'
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT )"
  );
});

//Cria conexão com o banco de dados

const index =
  "<a href='/Home'> Home </a> <a href='/Sobre'> Sobre </a> <a href='/Login'> Login </a> <a href='/Cadastro'> Cadastro </a>";

const Home = 'Você está na pagina "Home"<br><a href="/">Voltar</a>';
const Sobre = 'Você está na pagina "Sobre"<br><a href="/">Voltar</a>';
const Login = 'Você está na pagina de "Login"<br><a href="/">Voltar</a>';
const Cadastro = 'Você está na pagina de "Cadastro"<br><a href="/">Voltar</a>';

/*Método express.get necessita de dois parâmetros 
Na ARROW FUNCTION, o primeiro são os dados de servidor (REQUISITION - 'req')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res')*/

app.get("/", (req, res) => {
  res.send(index);
});

app.get("/Home", (req, res) => {
  res.send(Home);
});

app.get("/Sobre", (req, res) => {
  res.send(Sobre);
});

app.get("/Login", (req, res) => {
  res.send(Login);
});

app.get("/Cadastro", (req, res) => {
  res.send(Cadastro);
});

//app listen deve ser o último comando da aplicação (app.js);
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}!`);
});
