import { Router } from "express";
import { atualizarTransito, obterStatus} from "../controllers/TrafficController.js";
import { trafficValidationRules } from "../validators/trafficValidator.js";

const router = Router()

router.post('/api/transito/atualizar',trafficValidationRules,atualizarTransito)
router.get('/api/transito/status',obterStatus)
router.get('/', (req, res) => {
    res.render('transito'); 
})
export default router