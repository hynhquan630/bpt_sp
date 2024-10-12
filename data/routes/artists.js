import express from 'express'
import { getAllArtist, addArtist, getArtist, updateArtist} from '../controllers/artist.js'
const routes = express.Router()

routes.get("/", getAllArtist)
routes.get("/info/:artistId",getArtist)
routes.post("/",addArtist)
routes.put("/",updateArtist)
export default routes