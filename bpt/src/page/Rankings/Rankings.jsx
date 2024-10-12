import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeRequest } from '../../axios';
import RankingCard from '../../components/RankingCard/RankingCard';
import './Rankings.css';

const Rankings = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const { isLoading, error, data } = useQuery(["rankings"], () =>
        makeRequest.get("/ranking").then((res) => {
            return res.data;
        })
    );

    const [selectedType, setSelectedType] = useState("All");

    const [selectedSex, setSelectedSex] = useState("All");

    const handleSelectType = (e) => {
        setSelectedType(e.target.value);
    }
    const handleSelectSex = (e) => {
        setSelectedSex(e.target.value);
    }
    const [findArt, setFindArt] = useState("");
    const dataFilter = () => {
        if (findArt === "") {
            if (selectedType === "All") {
                if (selectedSex === "All") return data; // Trả về toàn bộ dữ liệu nếu chọn All hoặc không có gì được chọn
                return data.filter(item => item.sex == selectedSex);
            }
            if (selectedSex === "All") {

                return data.filter(item => item.type == selectedType);
            }
            return data.filter(item => item.type == selectedType && item.sex == selectedSex);
        } else {
            const dataFind = data.filter(item =>
                item.name.toLowerCase().includes(findArt.toLowerCase())
            );
            if (selectedType === "All") {
                if (selectedSex === "All") return dataFind; // Trả về toàn bộ dữ liệu nếu chọn All hoặc không có gì được chọn
                return dataFind.filter(item => item.sex == selectedSex);
            }
            if (selectedSex === "All") {

                return dataFind.filter(item => item.type == selectedType);
            }
            return dataFind.filter(item => item.type == selectedType && item.sex == selectedSex);

        }
    }
    console.log(dataFilter())
    let lastRankScore = 0; // Biến lưu trữ thứ hạng cuối cùng
    let lastScore = null;
    let lastRankDrama = 0; // Biến lưu trữ thứ hạng cuối cùng
    let lastDrama = null; // Biến lưu trữ ndrama cuối cùng
    const type = [1, 2, 3, 4]
    let scoreAllow = 400;
    let rate = 2.5;


    const sortedArtistsByDrama = Array.isArray(dataFilter()) ?
        [...dataFilter()].sort((a, b) => b.ndrama - a.ndrama) :
        [];
    const sortedArtistsByScore = Array.isArray(dataFilter()) ?
        [...dataFilter()].sort((a, b) => b.score - a.score) :
        [];
    const sortedArtistsByMain = Array.isArray(dataFilter())
        ? [...dataFilter()].sort((a, b) => {
            // Nếu cả a và b đều có score >= scoreAllow
            if (a.ndrama >= 10 && b.ndrama >= 10) {
                if (a.score >= scoreAllow && b.score >= scoreAllow) {
                    // So sánh theo main trước
                    if (b.main !== a.main) {
                        return b.main - a.main; // Sắp xếp theo main
                    } else {
                        // Nếu main bằng nhau, so sánh theo score
                        return b.score - a.score; // Sắp xếp theo score
                    }
                }

                // Nếu chỉ có một trong hai phần tử có score < scoreAllow
                if (a.score < scoreAllow && b.score >= scoreAllow) {
                    return 1; // a nằm sau b
                }
                
                if (a.score >= scoreAllow && b.score < scoreAllow) {
                    return -1; // a nằm trước b
                }

                // Nếu cả hai phần tử đều có score < scoreAllow
                return b.score - a.score; // Sắp xếp theo score cho những phần tử này
            } else {
                if (a.ndrama >= 10) {
                    return -1;
                }
                if (b.ndrama >= 10) {
                    return 1;
                }
                if (a.ndrama < 10 && b.ndrama < 10) {
                    return b.score-a.score
                }
            }
        })
        : [];
    const sortedArtistsByRating = Array.isArray(dataFilter())
        ? [...dataFilter()].sort((a, b) => {

            // Điều kiện để được sắp xếp dựa trên rating và score
            if (a.score >= scoreAllow * rate && b.score >= scoreAllow * rate) {
                if (parseFloat(a.main) >= 50 && parseFloat(b.main) >= 50) {
                    // Sắp xếp theo rating từ lớn đến nhỏ
                    if (b.rating !== a.rating) {
                        return b.rating - a.rating;
                    } else {
                        // Nếu rating bằng nhau, sắp xếp theo score
                        return b.score - a.score;
                    }
                }
                if (a.main >= 50 && b.main < 50) {
                    return -1;
                }
                if (a.main < 50 && b.main >= 50) {
                    return 1;
                }
                return b.score - a.score;
            }

            // Nếu a không đủ điều kiện mà b đủ điều kiện, đẩy a xuống dưới
            if (a.score < scoreAllow * rate && b.score >= scoreAllow * rate) {
                return 1;
            }

            // Nếu a đủ điều kiện mà b không đủ, đẩy b xuống dưới
            if (a.score >= scoreAllow * rate && b.score < scoreAllow * rate) {
                return -1;
            }

            // Nếu cả hai không đủ điều kiện, sắp xếp theo score từ lớn đến nhỏ
            return b.score - a.score;
        })
        : [];



    const handleFindArt = (e) => {
        setFindArt(e.target.value);
    }
    return (
        <div className='full-ranking-container'>
            <div className='filter-container'>
                <h2 className="filter-rank-title">Filter</h2>
                <div className='filter-rank-options'>
                    <select className="filter-rank-select" id="type-select" value={selectedType} onChange={handleSelectType}>
                        <option value="All">All</option>
                        <option value="F1">F1</option>
                        <option value="F2">F2</option>
                    </select>
                    <select className="filter-rank-select" id="sex-select" value={selectedSex} onChange={handleSelectSex}>
                        <option value="All">All</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                    </select>
                </div>
                <input
                    type="text"
                    value={findArt}
                    disabled={true}
                    onChange={handleFindArt}
                    placeholder="Nhập từ khóa..."
                />
            </div>
            <div className="grid-container">
                <div className="grid-item" style={{ background: 'linear-gradient(to top right, #f6f6d7, green)', }}>
                    <h2 className="item-heading">Drama</h2>
                    <div className='item-list-rank'>
                        {sortedArtistsByDrama?.map((artist) => {
                            // Nếu ndrama khác với ndrama cuối cùng, cập nhật thứ hạng
                            if (artist.ndrama !== lastDrama) {
                                lastRankDrama++;
                                lastDrama = artist.ndrama; // Cập nhật ndrama cuối cùng
                            }

                            return (
                                <RankingCard
                                    key={artist.id}
                                    artist={artist}
                                    rank={lastRankDrama} // Gán thứ hạng
                                    type={type[0]}
                                />
                            );
                        })}
                    </div>

                </div>
                <div className="grid-item" style={{ background: 'linear-gradient(to top, white, purple)', }}>
                    <h2 className="item-heading" >Score</h2>
                    <div className='item-list-rank'>
                        {sortedArtistsByScore?.map((artist) => {
                            // Nếu điểm số khác với điểm số cuối cùng, cập nhật thứ hạng
                            if (artist.score !== lastScore) {
                                lastRankScore++;
                                lastScore = artist.score; // Cập nhật điểm số cuối cùng
                            }

                            return (
                                <RankingCard
                                    key={artist.id}
                                    artist={artist}
                                    rank={lastRankScore} // Gán thứ hạng
                                    type={type[1]}
                                />
                            );
                        })}
                    </div>

                </div>
                <div className="grid-item" style={{ background: 'linear-gradient(to top left, white, blue)', }}>
                    <h2 className="item-heading">Viral</h2>
                    <div className='item-list-rank'>
                        {sortedArtistsByMain?.map((artist, index) => (
                            <RankingCard key={artist.id} artist={artist} rank={(artist.score < scoreAllow || artist.ndrama < 10) ? "None" : index + 1} type={type[2]} />
                        ))}
                    </div>

                </div>
                <div className="grid-item" style={{ background: 'linear-gradient(to bottom left, white, orange)', }}>
                    <h2 className="item-heading">Rating</h2>
                    <div className='item-list-rank'>
                        {sortedArtistsByRating?.map((artist, index) => (
                            <RankingCard key={artist.id} artist={artist} rank={((artist.score < rate * scoreAllow) || (artist.main < 50)) ? "None" : index + 1} type={type[3]} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

let scoreIns = (viral) => {
    if (viral == 'main') return 100;
    else if (viral == 'part') return 50;
    else if (viral == 'support') return 25;
    else if (viral == 'youth') return 20;
    else if (viral == 'cameo') return 10;
    else return 0;
}


export default Rankings