import express from "express"
import multer from "multer";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionSucessStatus: 200

}
import { listarPosts, postarNovoPost,uploadImagem, atualizarUmNovoPost } from "../controller/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

 const routes = (app) =>{
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para buscar todos os posts
    app.get("/posts",listarPosts);
    // Rota para criar novos posts
    app.post("/posts",postarNovoPost);

    app.post("/Upload",upload.single("imagem"), uploadImagem)

    app.put("/upload/:id",atualizarUmNovoPost)
}

export default routes;
