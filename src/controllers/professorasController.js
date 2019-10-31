const professoras = require("../model/professoras.json")

exports.get = (req, res) => {
  res.status(200).send(professoras)
}

exports.get = (req, res) => {
const arrProfs = []
for(let i = 0; i < professoras.length; i++){
  const SemCpf = {}
  SemCpf.id = professoras[i].id
  SemCpf.nome = professoras[i].nome
  SemCpf.especialidades = professoras[i].signo
  arrProfs.push(SemCpf)
}
res.status(200).send(arrProfs)
}
exports.getById = (req, res) => {
  const id = req.params.id
  if (id > 17 || id <= 0) {
    res.redirect(301, "")
  }
  res.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getById = (req, res) => {
  const id = req.params.id;
  const prof = professoras.find(prof => prof.id == id)
  delete prof.cpf 
res.status(200).send(prof)
}

exports.getById = (req, res) => {
  const id = req.params.id
  const prof = professoras.find(prof => prof.id == id)
  delete prof.cpf 
  res.status(200).send(prof)
}
