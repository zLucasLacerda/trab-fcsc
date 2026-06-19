import express from 'express'
import cors from 'cors'
import { globalErrorHandler } from './middlewares/errorMiddleware.js'
import trafficRoutes from './routes/trafficRoutes.js'

const app = express()

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(express.json())

app.use(trafficRoutes)
app.use(globalErrorHandler)

export default app