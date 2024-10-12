import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import exp from "constants"
import jwt from "jsonwebtoken"

export const getAllArtist = (req, res) => {
    const q = "SELECT * FROM artist ORDER BY name ASC;"

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const addArtist = (req, res) => {
    console.log(req.body.name)
    const q =
        "INSERT INTO artist(`name`,`birth`, `city`,`avatar`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.dob,
        req.body.city,
        req.body.avatar
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Add success!")
    })
}

export const getArtist = (req, res) => {
    const q = "SELECT * FROM artist WHERE id=?"
console.log("Đã tới đây")
    db.query(q, [req.params.artistId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data[0])
    })
}

export const updateArtist = (req, res) => {
    const q = "UPDATE artist SET `name`=?,`city`=?,`birth`=?,`avatar`=?,`nickname`=?,`rating`=?, `intro`=? WHERE id=? ";
    db.query(
        q,
        [
            req.body.name,
            req.body.city,
            req.body.birth,
            req.body.avatar,
            req.body.nickname,
            req.body.rating,
            req.body.intro,
            req.body.artistId,
        ],
        (err, data) => {
            if (err) res.status(500).json(err);
            return res.status(200).json("Update success!")
        }
    );
}