const alunas = require("../model/alunas.json")
const fs = require('fs');

exports.get = (req, res) => {
  console.log(req.url)
  res.status(200).send(alunas)
}

exports.getById = (req, res) => {
  const id = req.params.id
  if (id > 17 || id <= 0) {
    res.redirect(301, "https://www.linkedin.com/in/isabellalealx/")
  }
  res.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getBooks = (req, res) => {
  const id = req.params.id
  const aluna = alunas.find(aluna => aluna.id == id)
  if (!aluna) {
    res.send("Nao encontrei essa garota")
  }
  const livrosAluna = aluna.livros
  const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
  const tituloLivros = livrosLidos.map(livro => livro.titulo)
  res.send(tituloLivros)
}

exports.getSp = (req, res) => {
  const nasceuSp = alunas.filter(aluna => {
    console.log(aluna)
    return aluna.nasceuEmSp == "true"
  })
  const meninasSp = nasceuSp.map(aluna => aluna.nome)

  res.status(200).send(meninasSp)
}

exports.getAge = (req, res) => {
  const id = req.params.id
  const aluna = alunas.find(item => item.id == id)
  const dataNasc = aluna.dateOfBirth
  const arrData = dataNasc.split("/")
  const dia = arrData[0]
  const mes = arrData[1]
  const ano = arrData[2]
  const idade = calcularIdade(ano, mes, dia)
  res.status(200).send({ idade })
}

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date()
  const anoAtual = now.getFullYear()
  const mesAtual = now.getMonth() + 1
  const hoje = now.getDate()

  let idade = anoAtual - anoDeNasc

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1
  }
  return idade
}

exports.post = (req, res) => {
  const {nome , dateOfBirth, nasceuEmSp, id, livros} = req.body
  alunas.push({nome, dateOfBirth, nasceuEmSp, id, livros});

    fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err){
      if(err){
        return res.status(500).send({ message: err});
      }
      console.log("The file was saved!");
      });
      return res.status(201).send(alunas);
    
  }

  exports.postBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    if(!aluna){
      res.send("Nao encontrei essa garota")
    }
    const {titulo, leu} = req.body;
    alunas[alunas.id - 1].livros.push({ titulo, leu });
    fs.writerFile("./src/model/alunas.json", JSON.stringity(alunas), 'utf8', function (err) {
      if(err){
        return res.status(500).send({ message: err });
      }
    console.log("The file was saved");
    });
    res.status(201).send(alunas[aluna.id - 1].livros);
  }
