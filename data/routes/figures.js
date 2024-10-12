import express from 'express'
import { getFigureArtist,getDramaArtist, getFigureDrama, getFiguringDrama, getAllFigure} from '../controllers/figure.js'
const routes = express.Router()

routes.get("/artist/:artistId", getFigureArtist)
routes.get("/figure/:dramaId",getFigureDrama)
routes.get("/figuring/:dramaId",getFiguringDrama)
routes.get("/drama/:artistId", getDramaArtist)
routes.get("/",getAllFigure)

export default routes