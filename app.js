const bodyParser = require("body-parser");
const express = require("express"); // importa lib do Express

const sqlite3 = require("sqlite3"); // Importa lib do sqlite3

const PORT = 8000; //porta TCP do servidor HHTP da aplicação;

const app = express(); //Instância para uso do Express

const db = new sqlite3.Database("user.db"); //Instância para uso do Sqlite3, e usa o arquivo 'user.db'
/*-------------------------------------------------------------------------------------------------------------------------------------*/
db.serialize(() => {
  //Este método permite enviar comandos SQL em modo 'sequencial'
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,
     password TEXT, email TEXT, celular TEXT, cpf TEXT, rg TEXT )`
  );
});
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//__dirname é a variável interna do nodejs que guarda o caminho absoluto do projeto, no SO
//console.log(__dirname + "/static");
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//aqui será acrescentado uma rota "/static", para a pasta __dirname + "/static"
//o app use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
// Middleware para isto, que neste caso é o express.static, que gerencia rotas estáticas.
app.use("/static", express.static(__dirname + "/static"));
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//Middleware para processar as requisições do body parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar EJS como o motor da visualização
app.set("view engine", "ejs");
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//Cria conexão com o banco de dados

// const index =
//   "<a href='/Home'> Home </a> <a href='/Sobre'> Sobre </a> <a href='/Login'> Login </a> <a href='/Cadastro'> Cadastro </a>";

// const Home = 'Você está na pagina "Home"<br><a href="/">Voltar</a>';
// const Sobre = 'Você está na pagina "Sobre"<br><a href="/">Voltar</a>';
// const Login = 'Você está na pagina de "Login"<br><a href="/">Voltar</a>';
const cadastro = 'Você está na pagina de "Cadastro"<br><a href="/">Voltar</a>';
/*-------------------------------------------------------------------------------------------------------------------------------------*/
/*Método express.get necessita de dois parâmetros 
Na ARROW FUNCTION, o primeiro são os dados de servidor (REQUISITION - 'req')
o segundo, são os dados que serão enviados ao cliente (RESULT - 'res')*/

app.get("/", (req, res) => {
  //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/
  // res.send(index);
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.send("Login ainda não efetuado");
});

app.get("/Cadastro", (req, res) => {
  res.send(cadastro);
});

app.post("/cadastro", (req, res) => {
  req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.body}`);

  res.send(
    `Bem-Vindo usuário: ${req.body.username}, seu email é: ${req.body.email}`
  );
});
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//programação de rotas do método GET do HTTP
// app.get("/Home", (req, res) => {
//   res.send(Home);
// });

// app.get("/Sobre", (req, res) => {
//   res.send(Sobre);
// });

/*-------------------------------------------------------------------------------------------------------------------------------------*/
//app listen deve ser o último comando da aplicação (app.js);
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}!`);
});
/*-------------------------------------------------------------------------------------------------------------------------------------*/
