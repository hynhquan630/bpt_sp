import express from 'express'
const app = express()
import cors from "cors"
import multer from "multer"
import cookieParser from "cookie-parser"



import artistRoutes from './routes/artists.js'
import dramaRoutes from './routes/dramas.js'
import figureRoutes from './routes/figures.js'
import rankingRoutes from './routes/rankings.js'


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())

/*app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'http://192.168.43.160:3000','*']; // Thêm các nguồn được phép
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}
))*/
app.use(cors({
    origin: `https://bpt-sp.vercel.app`,
}
))

app.use(cookieParser())

app.use("/api/artists", artistRoutes)
app.use("/api/dramas", dramaRoutes)
app.use("/api/figures", figureRoutes)
app.use("/api/ranking", rankingRoutes)

app.listen(8800, () => {
    console.log("API working")
})