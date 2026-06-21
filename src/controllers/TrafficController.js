import db from '../data/database.js'

export const atualizarTransito = async (req, res, next) => {
    try {
        // Recebe o pedestresAguardando do ESP32 para saber quando ele terminar o ciclo
        const { via1, via2, pedestresAguardando: pedestresDoESP } = req.body
        const tempoParaEnviar = db.data.estadoTransito.tempoEscolarAgendado || 0
        
        let novoModoEscolar = db.data.estadoTransito.modoEscolar
        if (tempoParaEnviar > 0) { novoModoEscolar = true }

        const calcularFluxo = (metros) => {
            if (metros >= 80) return "Congestionado";
            if (metros >= 40) return "Lento";
            return "Normal";
        };

        // 1. Captura a solicitação pendente antes de limpá-la
        const enviarComandoTravessia = db.data.estadoTransito.solicitacaoPendente || false;

        db.data.estadoTransito = {
            ...db.data.estadoTransito, 
            via1: {
                filaMetros: (28 - via2.filaMetros) > 0 ? (38 - via2.filaMetros) : 0,
                estado: via1.estado,
                fluxo: calcularFluxo(via1.filaMetros)
            },
            via2: {
                filaMetros:(38 - via2.filaMetros) > 0 ? (38 - via2.filaMetros) : 0,
                estado: via2.estado,
                fluxo: calcularFluxo(via2.filaMetros)
            },
            // Se o ESP32 enviar false (fim do ciclo), atualiza. Caso contrário, mantém true.
            pedestresAguardando: pedestresDoESP !== undefined ? pedestresDoESP : db.data.estadoTransito.pedestresAguardando,
            modoEscolar: novoModoEscolar,
            tempoEscolarAgendado: 0,
            solicitacaoPendente: false, // <-- Consumido! Zera para o ESP32 não ler de novo
            ultimaAtualizacao: new Date().toLocaleString('pt-BR')
        };

        await db.write()
        
        res.status(200).json({
            modoEscolar: db.data.estadoTransito.modoEscolar,
            novasDiretrizesEscolar: tempoParaEnviar,
            abrirSemaforoPedestre: enviarComandoTravessia // <-- O ESP32 escuta ESSA variável para agir
        });
    }
    catch (error) { next(error) }
}

export const obterStatus = (req, res) => {
    return res.status(200).json(db.data.estadoTransito)
}

export const agendarModoEscolar = async (req, res, next) => {
    try {
        const { tempoMinutos } = req.body;

        db.data.estadoTransito.tempoEscolarAgendado = tempoMinutos * 60;
        db.data.estadoTransito.ultimaAtualizacao = new Date().toLocaleString('pt-BR');

        await db.write();
        console.log(`[API] Modo Escolar engatilhado: ${tempoMinutos * 60} segundos salvos.`);

        return res.status(200).json({ message: "Modo escolar engatilhado com sucesso." });
    } catch (error) { next(error); }
};


export const solicitarTravessia = async (req, res, next) => {
    try {
        db.data.estadoTransito.pedestresAguardando = true
        db.data.estadoTransito.solicitacaoPendente = true
        db.data.estadoTransito.ultimaAtualizacao = new Date().toLocaleString('pt-BR');

        await db.write();

        return res.status(200).json({ 
            message: "Solicitação de travessia registrada.",
            pedestresAguardando: true 
        });
    } catch (error) { next(error); }
};