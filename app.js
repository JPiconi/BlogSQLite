const express = require("express"); // Importa lib do Express

const sqlite3 = require("sqlite3"); // Importa lib do sqlite3

const bodyParser = require("body-parser"); // Importa o body-parser
const session = require("express-session");

const PORT = 8000; //Porta TCP do servidor HHTP da aplicação;

const app = express(); //Instância para uso do Express

const db = new sqlite3.Database("user.db"); //Instância para uso do Sqlite3, e usa o arquivo 'user.db'

let config = { Title: "", footer: "" };
/*-------------------------------------------------------------------------------------------------------------------------------------*/
db.serialize(() => {
  //Este método permite enviar comandos SQL em modo 'sequencial'
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,
     password TEXT, email TEXT, celular TEXT, cpf TEXT, rg TEXT )`
  );
});
// Configuração para uso de sessão (cookies) com Express
app.use(
  session({
    secret: "senhaqualquer",
    resave: true,
    saveUninitialized: true,
  })
);
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//__dirname é a variável interna do nodejs que guarda o caminho absoluto do projeto, no SO
//console.log(__dirname + "/static");
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//Aqui será acrescentado uma rota "/static", para a pasta __dirname + "/static"
//O app use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
//Middleware para isto, que neste caso é o express.static, que gerencia rotas estáticas.
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

//const Home = 'Você está na pagina "Home"<br><a href="/">Voltar</a>';
// const Sobre = 'Você está na pagina "Sobre"<br><a href="/">Voltar</a>';
// const Login = 'Você está na pagina de "Login"<br><a href="/">Voltar</a>';
// const cadastro = 'Você está na pagina de "Cadastro"<br><a href="/">Voltar</a>';
/*-------------------------------------------------------------------------------------------------------------------------------------*/
/*Método express.get necessita de dois parâmetros 
Na ARROW FUNCTION, o primeiro são os dados de servidor (REQUISITION - 'req')
O segundo, são os dados que serão enviados ao cliente (RESULT - 'res')*/

app.get("/", (req, res) => {
  console.log("GET /index");
  //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/
  //res.send(index);
  config = { Title: "Blog da Turma I2HNA - SESI de Nova Odessa", footer: "" };
  //res.render("pages/index", config);
  res.render("pages/index", { ...config, req: req });
  // res.render("pages/index", {
  //   Title: "Blog da Turma I2HNA - SESI de Nova Odessa",
  // });
  // res.redirect("/cadastro"); //Redireciona para a ROTA cadastro
});

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users  ";
  db.all(query, (err, row) => {
    console.log(`GET /usuarios ${JSON.stringify(row)}`);
    // res.send("Lista de usuários");
    res.render("partials/usertable", { ...config, req: req });
  });
});

app.get("/cadastro", (req, res) => {
  console.log("GET /Cadastro");
  config = { Title: "Página de Cadastro!!", footer: "" };
  res.render("pages/cadastro", { ...config, req: req });
  // res.render("pages/cadastro", {
  //   Title: "Página de Cadastro!!",
  // });
});

//POST do cadastro.
app.post("/cadastro", (req, res) => {
  console.log("POST /cadastro");
  req.body
    ? console.log(JSON.stringify(req.body))
    : console.log(`Body vazio: ${req.body}`);

  const { username, password, email, celular, cpf, rg } = req.body;

  //colocar aqui as validações e inclusão no banco de dados do cadastro do usuário
  // 1. Validar campos

  // 2. Verificar se ele ja existe no banco
  const query =
    "SELECT * FROM users WHERE email = ? OR cpf = ? OR rg = ? OR username = ?";
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;

    if (row) {
      // A variável 'row' irá retornar os dados do banco de dados
      // Executado atráves do SQL, variável query
      res.send("Usuário já cadastrado! Por favor refaça o cadastro");
    } else {
      // 3. Se o usuário não existe no banco cadastrar
      const insertQuery =
        "INSERT INTO users (username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)";
      db.run(
        insertQuery,
        [username, password, email, celular, cpf, rg],
        (err) => {
          // Inserir a lógica INSERT
          if (err) throw err;
          res.send("Usuário cadastrado com sucesso!");
        }
      );
    }
  });

  // res.send(
  //   `Bem-Vindo usuário: ${req.body.username}, seu email é: ${req.body.email}`
  // );
});

app.get("/login", (req, res) => {
  console.log("GET /login");
  config = { Title: "Página de Login!!", footer: "" };
  res.render("pages/login", { ...config, req: req });
  // res.render("pages/login", {
  //   Title: "Página de Login!!",
  // });
});

app.get("/logout", (req, res) => {
  // Exemplo de uma rota (END POINT) controlado pela sessão do usuário logado.
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.post("/login", (req, res) => {
  console.log("POST /login");
  const { username, password } = req.body;

  //consultar o usuário no banco de dados
  const query = "SELECT * FROM  users  WHERE username = ? AND password = ?";
  db.get(query, [username, password], (err, row) => {
    if (err) throw err;
    //se usuário válido -> registra a sessão e redireciona para o dashboard
    if (row) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect("/dashboard");
    } //se não, envia mensagem de erro(usuario não cadastrado, favor cadastrar)
    else {
      res.send(
        "Usuario não cadastrado ou Inválido, favor cadastrar-se ou verificar"
      );
    }
  });
});

// app.get("/dashboard", (req, res) => {
//   console.log("GET/dashboard");
//   config = { Title: "Página de Dashboard!!", footer: "" };
//   res.render("pages/dashboard", { ...config, req: req });
//   // res.render("pages/dashboard", {
//   //   Title: "Página de dashboard!!",
//   // });
// });

app.get("/dashboard", (req, res) => {
  if (req.session.loggedin) {
    //res.send(`Bem-vindo, ${req.session.username}!<br><a href="/logout">Sair</a>`);
    // res.sendFile(__dirname + '/index.html');
    config = { Title: "Página de Dashboard!!", footer: "" };
    db.all("SELECT * FROM users", [], (err, row) => {
      if (err) throw err;
      res.render("pages/dashboard", { ...config, dados: row, req: req });
    });
  } else {
    res.send(
      'Tentativa de acesso a uma área restrita. Faça login para acessar esta página. <a href="/">Login</a>'
    );
  }
});

app.get("/sobre", (req, res) => {
  console.log("GET /sobre");
  config = { Title: "Página de Informações!!", footer: "" };
  res.render("pages/sobre", { ...config, req: req });
  // res.render("pages/sobre", {
  //   Title: "Página de Informações!!",
  // });
});

app.use("*", (req, res) => {
  // Envia uma resposta de erro 404
  res.status(404).render("pages/404", { ...config, req: req });
});

/*-------------------------------------------------------------------------------------------------------------------------------------*/
//Programação de rotas do método GET do HTTP
// app.get("/home", (req, res) => {
//   res.render("home");
// });

//app.get("/Sobre", (req, res) => {
//  res.send(Sobre);
// });
/*-------------------------------------------------------------------------------------------------------------------------------------*/
//app listen deve ser o último comando da aplicação (app.js);
app.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}!`);
});
/*-------------------------------------------------------------------------------------------------------------------------------------*/
