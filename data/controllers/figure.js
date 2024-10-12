import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import exp from "constants"
import jwt from "jsonwebtoken"

export const getFigureArtist = (req, res) => {
    const q = "SELECT * FROM figure where artistId=?"
    db.query(q, [req.params.artistId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const getDramaArtist = (req, res) => {
    const q = "SELECT f.*,d.name AS dramaName,d.status,d.type,d.avatar AS avatarDrama FROM figure AS f JOIN drama AS d ON (f.dramaId=d.id) where f.artistId=?"

    db.query(q, [req.params.artistId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const getFigureDrama = (req, res) => {
    const q = "SELECT * FROM figure where dramaId=?  ORDER BY FIELD(ver, 'main','part', 'support','youth', 'cameo'), ver ASC;"
    db.query(q, [req.params.dramaId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}


export const getFiguringDrama = (req, res) => {
    const q = "SELECT f.*,a.name AS artistName, a.avatar AS avatarArtist FROM figure AS f JOIN artist AS a ON (f.artistId=a.id) where f.dramaId=?  ORDER BY FIELD(ver, 'main', 'part','support','youth', 'cameo'), ver ASC;"

    db.query(q, [req.params.dramaId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const getAllFigure = (req, res) => {
    const q = "SELECT * FROM figure;"

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

