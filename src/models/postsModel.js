import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

// Conecta ao banco  de dados utilizando a string de conexão
const conexão = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assincrona para buscar todos os posts do banco de dados
export async function getTodosPosts(){
    // Seleciona o banco de dados "imersão-instabytes"
    const db = conexão.db("imersao-instabytes")
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts")
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray()
}

export async function criarPost(novoPost){
     
    const db = conexão.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)
}
export async function atualizarPost(id,novoPost){
     
    const db = conexão.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id:new ObjectId(objID)}, {$set:novoPost})
}