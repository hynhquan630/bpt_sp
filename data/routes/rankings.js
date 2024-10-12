import express from 'express'
import { getRanking } from '../controllers/rank.js'
const routes = express.Router()

routes.get("/", getRanking)

export default routes