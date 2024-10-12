import express from 'express'
import { addFigure, getAllDrama,getDrama, addDrama, updateDrama, editFigure, getTypeDrama, getTypeADrama, editType, getTypeAllDrama} from '../controllers/drama.js'
const routes = express.Router()

routes.get("/info/:dramaId", getDrama)
routes.get("/", getAllDrama)
routes.post("/addFigure",addFigure)
routes.post("/",addDrama)
routes.put("/",updateDrama)
routes.put("/edit-figure",editFigure)
routes.put("/edit-type/:dramaId",editType)
routes.get("/all-type",getTypeDrama)

routes.get("/all-type-all-drama",getTypeAllDrama)
routes.get("/typedrama/:dramaId",getTypeADrama)
export default routes