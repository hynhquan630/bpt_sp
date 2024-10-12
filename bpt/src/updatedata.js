import fs from "fs"

const update_data=(newArtist)=>{
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Lỗi khi đọc file:', err);
            return;
        }

        // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
        const jsonData = JSON.parse(data);

        // Thêm người dùng mới vào mảng
        jsonData.users.push(newUser);

        // Ghi lại dữ liệu vào file JSON
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Lỗi khi ghi file:', err);
                return;
            }
            console.log('Dữ liệu đã được thêm thành công!');
        });
    });
}