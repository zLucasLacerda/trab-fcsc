import db from '../data/database.js'

export const atualizarTransito = async (req,res,next) => {
    try{
        const{via1,via2,pedestresAguardando} = req.body
        db.data.estadoTransito = {
            ...req.body,
            ultimaAtualizacao: db.data.estadoTransito.ultimaAtualizacao = new Date(Date.now()).toLocaleString('pt-BR')
        }
        await db.write()
        res.status(200).json({message: "Dados atualizados"})
    }
    catch(error){
        next(error)
    }
}

export const obterStatus = (req,res) => {
    const {ultimaAtualizacao,...dadosFiltrados} = db.data.estadoTransito
    return res.status(200).json(dadosFiltrados)
}