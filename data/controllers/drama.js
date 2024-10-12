import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import exp from "constants"
import jwt from "jsonwebtoken"

export const getAllDrama = (req, res) => {
    const q = "SELECT * FROM drama ORDER BY name ASC;"

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const getDrama = (req, res) => {
    const q = "SELECT * FROM drama WHERE id=?"
    db.query(q, [req.params.dramaId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data[0])
    })
}


export const updateDrama = (req, res) => {
    const q = "UPDATE drama SET `name`=?,`seri`=?,`createAt`=?,`avatar`=?,`chap`=?,`seri`=?, `status`=?, `intro`=? WHERE id=? ";
    db.query(
        q,
        [
            req.body.name,
            req.body.seri,
            req.body.createAt,
            req.body.avatar,
            req.body.chap,
            req.body.seri,
            req.body.status,
            req.body.intro,
            req.body.dramaId,
        ],
        (err, data) => {
            if (err) res.status(500).json(err);
            return res.status(200).json("Update success!")
        }
    );
}
export const addFigure = (req, res) => {
    console.log(req.body)
    const q =
        "INSERT INTO figure(`artistId`,`dramaId`, `name`,`avatar`,`ver`) VALUES (?)"
    const values = [
        req.body.artistId,
        req.body.dramaId,
        req.body.nameFigure,
        req.body.avatarFigure,
        req.body.ver,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Add success!")
    })
}

export const editFigure = (req, res) => {
    console.log("66")
    console.log(req.body)
    const q = "UPDATE figure SET `name`=?,`ver`=?, `avatar`=?,`artistId`=? WHERE id=? ";
    db.query(
        q,
        [
            req.body.nameFigureEd,
            req.body.verEd,
            req.body.avatarFigureEd,
            req.body.artistIdEd,
            req.body.idEd
        ],
        (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Update success!")
        }
    );
}

export const addDrama = (req, res) => {
    const q =
        "INSERT INTO drama(`name`,`type`, `status`,`avatar`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.type,
        req.body.status,
        req.body.avatar
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Add success!")
    }
    )
}

export const getTypeDrama = (req, res) => {
    const q = "SELECT * FROM type_drama ORDER BY name ASC"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const getTypeADrama = (req, res) => {
    const q = "SELECT * FROM type_a_drama WHERE dramaId=?"
    console.log(req.params.dramaId)
    db.query(q, [req.params.dramaId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data[0])
    })
}


export const getTypeAllDrama=(req,res)=>{
    const q = "SELECT * FROM type_a_drama"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json(data)
    })
}

export const editType = (req, res) => {

    const q = "SELECT * FROM type_a_drama WHERE dramaId=?"
    db.query(q, [req.params.dramaId], (err, data) => {
        if (err) return res.status(500).json(err)
        console.log(req.body[0])
        if (data.length >= 1) {
            const q1 = "UPDATE type_a_drama SET `typeId`=?,`typeId2`=?,`typeId3`=? WHERE `dramaId`=? "
            const values = [
                req.body[0],
                req.body[1],
                req.body[2],
                req.params.dramaId
            ]
            db.query(q1, [req.body[0], req.body[1], req.body[2], req.params.dramaId], (err, data) => {
                if (err) return res.status(500).json(err);

                return res.status(200).json("Update success!")
            }
            );
        } else {
            const q2 =
                "INSERT INTO type_a_drama (`dramaId`, `typeId`,`typeId2`,`typeId3`) VALUES(?)"
            const values = [
                req.params.dramaId,
                req.body[0],
                req.body[1],
                req.body[2]
            ]
            console.log("127+", req.params.dramaId)
            db.query(q2, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json("Add success!")
            }
            )
        }
    })


}