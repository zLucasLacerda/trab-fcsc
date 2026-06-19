import { body, validationResult } from 'express-validator'

export const trafficValidationRules = [
    // --- VIA 1 ---
    body('via1.filaMetros')
        .exists().withMessage('O campo via1.filaMetros é obrigatório.')
        .isNumeric().withMessage('O campo via1.filaMetros deve ser um número.')
        .custom(valor => valor >= 0).withMessage('O campo via1.filaMetros não pode ser negativo.'),
    
    body('via1.estado')
        .exists().withMessage('O campo via1.estado é obrigatório.')
        .isInt().withMessage('O campo via1.estado deve ser um número inteiro.')
        .isIn([1, 2, 3]).withMessage('O campo via1.estado deve ser 1 (Verde), 2 (Amarelo) ou 3 (Vermelho).'),
    
    // --- VIA 2 ---
    body('via2.filaMetros')
        .exists().withMessage('O campo via2.filaMetros é obrigatório.')
        .isNumeric().withMessage('O campo via2.filaMetros deve ser um número.')
        .custom(valor => valor >= 0).withMessage('O campo via2.filaMetros não pode ser negativo.'),

    body('via2.estado')
        .exists().withMessage('O campo via2.estado é obrigatório.')
        .isInt().withMessage('O campo via2.estado deve ser um número inteiro.')
        .isIn([1, 2, 3]).withMessage('O campo via2.estado deve ser 1 (Verde), 2 (Amarelo) ou 3 (Vermelho).'),

    // --- OUTROS CAMPOS ---
    body('pedestresAguardando')
        .exists().withMessage('O campo pedestresAguardando é obrigatório.')
        .isBoolean().withMessage('O campo pedestresAguardando deve ser um valor booleano (true/false).'),

    body('modoEscolar')
        .exists().withMessage('O campo modoEscolar é obrigatório.')
        .isBoolean().withMessage('O campo modoEscolar deve ser um valor booleano (true/false).')
];