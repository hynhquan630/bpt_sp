import React, { useState } from "react";
import "./InfoFigure.css";

const EditModal = ({ isOpen, setOpen, userData, onSave }) => {
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    setOpen(false);
  };

  if (!isOpen) return null; // Không hiển thị modal nếu không mở

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Information</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
