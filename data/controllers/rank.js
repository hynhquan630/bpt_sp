import { db } from "../connect.js"

let scoreIns = (viral) => {
    if (viral == 'main') return 100;
    else if (viral == 'part') return 50;
    else if (viral == 'support') return 25;
    else if (viral == 'youth') return 20;
    else if (viral == 'cameo') return 10;
    else return 0;
}

export const getRanking = (req, res) => {
    const q = "SELECT * FROM artist;"
    const list = []
    let completedRequests = 0;
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)

        data.map((artist) => {
            const q2 = "SELECT * FROM figure WHERE artistId=?"
            let total = 0;
            let nb = 0;
            let ext = 0;
            db.query(q2, [artist.id], (err, data2) => {

                if (err) return res.status(500).json(err)

                data2.map((figure) => {
                    total = total + scoreIns(figure.ver)
                    if (figure.ver == 'cameo') ext = ext + 1;
                    nb = nb + 1
                })

                let percent = (total / (nb - ext)).toFixed(1)
                let rating = (total / (nb * 10)).toFixed(1)
                list.push({ id: artist.id, name: artist.name, avatar: artist.avatar, score: total, ndrama: nb, main: percent, rating: rating, type: artist.type, sex: artist.sex })
                completedRequests += 1;

                console.log(completedRequests)
                if (completedRequests === data.length) {
                    return res.json(list); // Trả về danh sách khi tất cả đã hoàn thành
                }
            })
        })
    })

}
