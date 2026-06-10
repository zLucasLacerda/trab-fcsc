import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const defaultData = {
    estadoTransito: {
        via1: { fluxo: "Desconhecido", filaMetros: 0 },
        via2: { fluxo: "Desconhecido", filaMetros: 0 },
        pedestresAguardando: false,
        ultimaAtualizacao: null
    }
}
const adapter = new JSONFile('src/data/db.json')
const db = new Low(adapter, defaultData)

await db.read()
await db.write()

export default db