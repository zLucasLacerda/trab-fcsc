import { Router } from "express";
import { agendarModoEscolar, atualizarTransito, obterStatus, solicitarTravessia} from "../controllers/TrafficController.js";
import { trafficValidationRules } from "../validators/trafficValidator.js";

const router = Router()

router.post('/api/transito/atualizar',trafficValidationRules,atualizarTransito)
router.get('/api/transito/status',obterStatus)
router.get('/', (req, res) => {res.render('transito')})
router.post('/api/agendarEscolar',agendarModoEscolar)
router.post('/api/solicitarTravessia', solicitarTravessia)

export default router