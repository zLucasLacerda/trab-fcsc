import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const defaultData = {
  "estadoTransito": {
    "via1": {
      "filaMetros": 15,
      "estado": 1,
      "fluxo": "Normal"
    },
    "via2": {
      "filaMetros": 20,
      "estado": 3,
      "fluxo": "Normal"
    },
    "pedestresAguardando": false,
    "modoEscolar": false,
    "ultimaAtualizacao": "20/06/2026, 11:08:18",
    "tempoEscolarAgendado": 0
  }
}
const adapter = new JSONFile('src/data/db.json')
const db = new Low(adapter, defaultData)

await db.read()
await db.write()

export default db