const express = require("express")
const router = express.Router()
const controller = require("../controllers/alunasController")

router.get("/", controller.get)
router.get("/nasceuSp", controller.getSp)
router.get("/:id", controller.getById)
router.get("/:id/books", controller.getBooks)
router.get("/:id/getAge", controller.getAge)
router.post ("/", controller.post)
router.post("/", controller.postBooks)   /// Aqui teve duas alterações que foram adicionadas 
                                         ///que foram a linha 10 e 11, o controller.post e o controllerpost.Books.

module.exports = router
