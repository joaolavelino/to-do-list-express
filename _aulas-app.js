//1 - chamar o APP
const express = require("express");

//2 - essa chamada tras os métodos do express pra dentro dessa variável 'app'
const app = express();

//chamando o MIDDLEWARE que vai interpretar um JSON que estiver dentro da requisição, como acontece na segunda requisição "/json" e no teste "/properties"
app.use(express.json());

//criando um MIDDLEWARE
const log = (req, res, next) => {
  console.log(req.body);
  console.log(`Data da requisição: ${Date.now()}`);
  next()
  //next é obrigatório pois após a conclusão dos dados ele vai passar pro próximo middleware
}
//como o MIDDLEWARE criado, precisamos usá-lo, do mesmo modo que o express.json
app.use(log)

// aqui faz o requerimento GET que vai dar uma resposta
app.get("/", (req, res) => {
  //esta é a resposta do requerimento
  console.log(req.body);
  res.send("<h1>Minha lista de tarefas</h1>");
});

//para fazer um envio de dados JSON deve se fazer desse modo:
app.get("/json", (req, res) => {
  res.json({ title: "task1", done: true, category: "university" });
});

//aqui defino a porta de chamada e uma msg de confirmação
app.listen(4000, () => {
  console.log("servidor iniciado");
});
