import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import './InfoDrama.css';

const InfoDrama = ({ dramaId }) => {
  const { isLoading, error, data: drama } = useQuery(["drama"], () =>
    makeRequest.get("/dramas/info/" + dramaId).then((res) => {
      return res.data;
    })
  );
  const { isLoading: isl, error: erl, data: listArtist } = useQuery(["artists"], () =>
    makeRequest.get("/artists").then((res) => {
      return res.data;
    })
  );

  const { isLoading: ppo, error: pppp, data: listFigures } = useQuery(["FOD"], () =>
    makeRequest.get("/figures/figuring/" + dramaId).then((res) => {
      return res.data;
    })
  );
  const [artists, setArtists] = useState([]);
  const [listFigure, setlistFigure] = useState([]);
  useEffect(() => {
    if (listArtist) setArtists(listArtist);
    if (listFigures) setlistFigure(listFigures);
  }, [listArtist, listFigures]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("");
  const handleSelectChange = (event) => {
    setSelectedArtist(event.target.value);
    setFigure({
      ...figure, artistId: event.target.value,
    });
  };
  const [data, setData] = useState({
    dramaId: '',
    name: '',
    createAt: '',
    seri: '',
    avatar: '',
    status: '',
    chap: '',
    type: ''
  });
  const [figure, setFigure] = useState({
    artistId: '',
    dramaId: dramaId,
    nameFigure: '',
    avatarFigure: '',
    ver: ''
  })
  useEffect(() => {
    if (drama) {

      setData({
        dramaId: drama.id,
        name: drama.name,
        createAt: drama.createAt,
        seri: drama.seri,
        avatar: drama.avatar,
        status: drama.status,
        chap: drama.chap,
        type: drama.type
      });
    }
  }, [drama]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleChangeFigure = (e) => {
    const { name, value } = e.target;
    setFigure({
      ...figure,
      [name]: value,
    });
  };


  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => {
      console.log(data)
      return makeRequest.put("/dramas", data);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["dramas"]);
        queryClient.invalidateQueries(["drama"]);
      },
    }
  );

  const handleSave = () => {
    // Bạn có thể thực hiện lưu dữ liệu vào server ở đây
    console.log(data)
    mutation.mutate(data)
    setIsEditing(false);
  };
  const handleClose = () => {
    // Bạn có thể thực hiện lưu dữ liệu vào server ở đây

    setIsAdd(false);
  };
  const toggleAdd = () => {
    // Bạn có thể thực hiện lưu dữ liệu vào server ở đây

    setIsAdd(!isEditing);
  };


  const [isExit, setIsExit] = useState(false);

  const handleExit = () => {
    // Bạn có thể thực hiện lưu dữ liệu vào server ở đây

    setIsExit(false);
  };
  const toggleExit = () => {
    // Bạn có thể thực hiện lưu dữ liệu vào server ở đây

    setIsExit(!isExit);
  };

  const mutationFigure = useMutation(async (newFigure) => {
    const res = await makeRequest.post("/dramas/addFigure", newFigure)
    return res.data
  },
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries(["artists"]);
      }
    }
  )
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(figure)
    mutationFigure.mutate(figure);
    setFigure({ nameFigure: '', avatarFigure: '', ver: '' });
    setSelectedArtist("");
    window.location.reload()
  };
  const [isAdd, setIsAdd] = useState(false);


  const [figureEdit, setFigureEdit] = useState({
    idEd: '',
    artistIdEd: '',
    dramaIdEd: dramaId,
    nameFigureEd: '',
    avatarFigureEd: '',
    verEd: '',
    artistNameEd: ''
  })

  useEffect(() => {
    if (figureEdit.idEd) {
      console.log(listFigure)
      listFigure.map((figure) => {
        if (figure.id == figureEdit.idEd) {
          setFigureEdit({
            idEd: figure.id,
            dramaIdEd: figure.id,
            nameFigureEd: figure.name,
            artistIdEd: figure.artistId,
            verEd: figure.ver,
            avatarFigureEd: figure.avatar,
            artistNameEd: figure.artistName
          });
        }
      })
    }
    console.log(figureEdit);
  }, [figureEdit.idEd]);

  useEffect(() => {
    console.log(figureEdit)
    if (figureEdit.idEd) {
      console.log(listFigure)
      artists.map((artist) => {
        if (artist.id == figureEdit.artistIdEd) {
          setFigureEdit({
            ...figureEdit,
            artistNameEd: artist.name
          });
        }
      })
    }
    console.log(figureEdit);
  }, [figureEdit.artistIdEd]);


  const handleSelectUpdate = (e) => {
    setSelectedFigure(e.target.value);
    setFigureEdit({
      ...figureEdit, idEd: e.target.value,
    });
    console.log(figureEdit.idEd)
  };

  const handleSelectUpdateArtist = (e) => {
    setSelectedArtistEdit(e.target.value);
    setFigureEdit({
      ...figureEdit, artistIdEd: e.target.value,
    });
    console.log(figureEdit.artistIdEd)
    console.log(selectedArtistEdit)
  };

  const [selectedFigure, setSelectedFigure] = useState("");
  const [selectedArtistEdit, setSelectedArtistEdit] = useState("");


  const handleChangeFigureEd = (e) => {

    const { name, value } = e.target;
    setFigureEdit({
      ...figureEdit,
      [name]: value,
    });
  };
  const mutationFigureEdit = useMutation(
    (data) => {
      console.log(data)
      return makeRequest.put("/dramas/edit-figure", data);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["dramas"]);
        queryClient.invalidateQueries(["drama"]);
        queryClient.invalidateQueries(["figures"]);
        queryClient.invalidateQueries(["figuring"]);
      },
    }
  );

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    console.log(figureEdit)
    mutationFigureEdit.mutate(figureEdit);
    setFigureEdit({ avatarFigureEd: '', verEd: '', nameFigureEd: '' });
    setSelectedArtistEdit("");
    setSelectedFigure("")
    window.location.reload()
  };


  const { isLoading: pt, error: et, data: typedrama } = useQuery(["typeOfDrama"], () =>
    makeRequest.get("/dramas/all-type/").then((res) => {
      return res.data;
    })
  );

  const { isLoading: pat, error: eat, data: typeADrama } = useQuery(["typeOfADrama",dramaId], () =>
    makeRequest.get("/dramas/typedrama/" + dramaId).then((res) => {
      return res.data;
    })
  );
  const [selectedType, setSelectedType] = useState("");
  const [typeD, setTypeD] = useState([0, 0, 0])
  useEffect(() => {
    if (typeADrama) {
      const ty = [...typeD]
      ty[0] = typeADrama.typeId;
      ty[1] = typeADrama.typeId2;
      ty[2] = typeADrama.typeId3;
      setTypeD(ty)
    }
  }, [typeADrama])
  const handleSelectChangeType = (e) => {

  };
  const [typeReq, setTypeReq] = useState([])
  const [selectedType1, setSelectedType1] = useState("");

  const [selectedType2, setSelectedType2] = useState("");

  const [selectedType3, setSelectedType3] = useState("");

  const [isType, setIsType] = useState(false);

  const mutationEditType = useMutation(
    (data) => {
      console.log(data)
      return makeRequest.put("/dramas/edit-type/" + dramaId, data);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["typeOfADrama"]);
      },
    }
  );

  const handleSaveType = (e) => {
    // Bạn có thể thực hiện lưu dữ liệu vào server ở đây
    e.preventDefault();
    console.log(typeD)
    mutationEditType.mutate(typeD);
    setTypeD([0, 0, 0]);
    setIsType(false);
  };
  const toggleType = () => {
    // Bạn có thể thực hiện lưu dữ liệu vào server ở đây

    setIsType(!isType);
  };

  const handleSelectChangeType1 = (e) => {
    setSelectedType1(e.target.value)
    const ud = [...typeD]
    ud[0] = parseInt(e.target.value)
    setTypeD(ud)
  };
  console.log(typeD)
  const handleSelectChangeType2 = (e) => {
    setSelectedType2(e.target.value)
    const ud = [...typeD]
    ud[1] = parseInt(e.target.value)
    setTypeD(ud)
  };

  const handleSelectChangeType3 = (e) => {
    setSelectedType3(e.target.value)
    const ud = [...typeD]
    ud[2] = parseInt(e.target.value)
    setTypeD(ud)
  };
  console.log(typeD)

  return (
    <div>
      <div className="drama-info-card">
        <img src={data.avatar} alt="Không có gì cả" className="drama-info-image" />
        <div className="drama-details">
          <h2 className="drama-info-title">{data.name}</h2>
          <p className="drama-info-type">{data.type}</p>
          <p className="drama-description">{data.intro}</p>
        </div>
      </div>
      <div className='edit-button'>
        {isEditing ? (
          <button onClick={handleSave}>Lưu</button>
        ) : (
          <button onClick={toggleEdit}>Sửa</button>
        )}
        {isAdd ? (
          <button onClick={handleClose}>Close</button>
        ) : (
          <button onClick={toggleAdd}>Add</button>
        )}
        {isExit ? (
          <button onClick={handleExit}>Exit</button>
        ) : (
          <button onClick={toggleExit}>Figure</button>
        )}
        {isType ? (
          <button onClick={handleSaveType}>Save</button>
        ) : (
          <button onClick={toggleType}>Type</button>
        )}
      </div>
      {!isType ? (
        <div>
          {!isExit ? (
            <div>
              {!isAdd ? (
                < div className='info-detail'>
                  <ul>
                    <li>
                      <strong>Name</strong>
                      {isEditing ? (
                        <div>
                          <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                          /></div>
                      ) : (data.name)}
                    </li>
                    <li>
                      <strong>Seri</strong>
                      {isEditing ? (
                        <input
                          type="text"
                          name="seri"
                          value={data.seri}
                          onChange={handleChange}
                        />
                      ) : (
                        data.seri
                      )}
                    </li>
                    <li>
                      <strong>Create At</strong>
                      {isEditing ? (
                        <input
                          type="text"
                          name="createAt"
                          value={data.createAt}
                          onChange={handleChange}
                        />
                      ) : (
                        data.createAt
                      )}
                    </li>
                    <li>

                      <strong>Type</strong>
                      <div>Comissson</div>
                    </li>
                    <li>
                      <strong>Status</strong>
                      {isEditing ? (
                        <input
                          type="text"
                          name="status"
                          value={data.status}
                          onChange={handleChange}
                        />
                      ) : (
                        data.status
                      )}
                    </li>
                    <li>
                      <strong>Total Chap</strong>
                      {isEditing ? (
                        <div>
                          <input
                            type="text"
                            name="chap"
                            value={data.chap}
                            onChange={handleChange}
                          />
                        </div>

                      ) : (
                        data.chap
                      )}
                    </li><li>

                      <strong>Intro</strong>
                      {isEditing && (
                        <div>
                          <input
                            type="text"
                            name="intro"
                            value={data.intro}
                            onChange={handleChange}
                          />
                        </div>

                      )}
                    </li>
                    <li>

                      {isEditing && (
                        <div>
                          <strong>Avatar</strong>
                          <input
                            type="text"
                            name="avatar"
                            value={data.avatar}
                            onChange={handleChange}
                          />
                        </div>

                      )}
                    </li>
                  </ul>
                </div>
              ) : (
                <div className='select-artist'>
                  <select id="artist-select" value={selectedArtist} onChange={handleSelectChange}>
                    <option value="">Option Artist</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                  </select>
                  <li>

                    <strong>Figure</strong>
                    <div>
                      <input
                        type="text"
                        name="nameFigure"
                        value={figure.nameFigure}
                        onChange={handleChangeFigure}
                      />
                    </div>

                  </li>
                  <li>

                    <strong>Avatar</strong>
                    <div>
                      <input
                        type="text"
                        name="avatarFigure"
                        value={figure.avatarFigure}
                        onChange={handleChangeFigure}
                      />
                    </div>

                  </li>
                  <li>

                    <strong>Viral</strong>
                    <div>
                      <input
                        type="text"
                        name="ver"
                        value={figure.ver}
                        onChange={handleChangeFigure}
                      />
                    </div>

                  </li>
                  <button onClick={handleSubmit}>Add In Drama</button>
                </div>)}
            </div>) : (
            <div>
              <div className='select-artist'>
                <li>
                  <strong>Figure</strong>
                </li>
                <select id="figure-select" value={selectedFigure} onChange={handleSelectUpdate}>
                  <option value="">Option Figure</option>
                  {listFigure.map((figures) => (
                    <option key={figures.id} value={figures.id}>{figures.name}</option>
                  ))}
                </select>
                <li>
                  <strong>Figure</strong>
                </li>
                <select id="artist-edit-select" value={selectedArtistEdit} onChange={handleSelectUpdateArtist}>
                  <option value={figureEdit.artistIdEd}>{figureEdit.artistNameEd}</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>{artist.name}</option>
                  ))}
                </select>
                <li>

                  <strong>New Figure</strong>
                  <div>
                    <input
                      type="text"
                      name="nameFigureEd"
                      value={figureEdit.nameFigureEd}
                      onChange={handleChangeFigureEd}
                    />
                  </div>

                </li>
                <li>

                  <strong>Avatar</strong>
                  <div>
                    <input
                      type="text"
                      name="avatarFigureEd"
                      value={figureEdit.avatarFigureEd}
                      onChange={handleChangeFigureEd}
                    />
                  </div>

                </li>
                <li>

                  <strong>Viral</strong>
                  <div>
                    <input
                      type="text"
                      name="verEd"
                      value={figureEdit.verEd}
                      onChange={handleChangeFigureEd}
                    />
                  </div>

                </li>
                <button onClick={handleSubmitEdit}>OK</button>
              </div>
            </div>)}
        </div>) : (<div className='select-artist'>Comisson
          <li>
            <strong>Type Main</strong>
          </li>
          <select id="main-select" value={selectedType1} onChange={handleSelectChangeType1}>
            <option value="" disabled={true}>{typedrama?.find((item) => item.id == typeADrama?.typeId)?.name}</option>
            {typedrama?.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <li>
            <strong>Type Relevance 1</strong>
          </li>
          <select id="typeo-select" value={selectedType2} onChange={handleSelectChangeType2}>
            <option value="" disabled={true}>{typedrama?.find((item) => item.id == typeADrama?.typeId2)?.name}</option>
            {typedrama?.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <li>
            <strong>Type Relevance 2</strong>
          </li>
          <select id="typett-select" value={selectedType3} onChange={handleSelectChangeType3}>
            <option value="" disabled={true}>{typedrama?.find((item) => item.id == typeADrama?.typeId3)?.name}</option>
            {typedrama?.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>)}
    </div >
  )
}

export default InfoDrama