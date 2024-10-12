import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import Drama from "../../components/Drama/Drama"
import "./Dramas.css"
const Dramas = () => {
  const { isLoading, error, data } = useQuery(["dramas"], () =>
    makeRequest.get("/dramas").then((res) => {
      return res.data;
    })
  );

  const { isLoading: pt, error: et, data: typedrama } = useQuery(["typeOfDrama"], () =>
    makeRequest.get("/dramas/all-type/").then((res) => {
      return res.data;
    })
  );
  const { isLoading: pts, error: ets, data: typealldrama } = useQuery(["typeOfAllDrama"], () =>
    makeRequest.get("/dramas/all-type-all-drama/").then((res) => {
      return res.data;
    })
  );
  const [selectedType, setSelectedType] = useState("All");

  const handleSelectType = (e) => {
    setSelectedType(e.target.value);
  }

  const dataFilter = () => {
    if (selectedType === "All") {
      return data;
    }
    else if (selectedType == 0) {
      return data.filter(item =>
        (typealldrama.filter(item2 => item2.dramaId == item.id)[0]?.typeId == selectedType) ||
        !typealldrama.some(item2 => item.id == item2.dramaId))
    }
    else {
      return data.filter(item =>
        typealldrama.filter(item2 => item2.dramaId == item.id)[0]?.typeId == selectedType ||
        typealldrama.filter(item2 => item2.dramaId == item.id)[0]?.typeId2 == selectedType ||
        typealldrama.filter(item2 => item2.dramaId == item.id)[0]?.typeId3 == selectedType
      )
    }
  }
  console.log(dataFilter())
  return (
    <div>
      <div className='filter-container' style={{ background: 'white', width: '100%', padding: '20px 40px 20px', }}>
        <h2 className="filter-rank-title">Filter</h2>
        <div className='filter-rank-options'>
          <select className="filter-rank-select" id="type-select" value={selectedType} onChange={handleSelectType}>
            <option value="All">All</option>
            {typedrama?.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="drama-list">
        {error
          ? "Something went wrong"
          : isLoading
            ? "loading"
            : dataFilter()?.map((drama) => (
              <div className="drama-item" key={drama.id}>
                <Drama key={drama.id} drama={drama} />
              </div>
            ))}

      </div>
    </div>
  )
}

export default Dramas