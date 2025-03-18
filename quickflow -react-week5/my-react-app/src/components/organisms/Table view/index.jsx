import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button/index.jsx";
import Text from "../../atoms/Text/index.jsx";
import { API_URL } from "../../../constants/index.js";
import "./tableView.css";

const TableView = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", type: "" });
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setTotalItems(parsedData.length);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      const formattedData = result.cards.slice(0, 10).map((card, index) => ({
        id: index,
        name: card.name,
        type: card.type,
      }));
      setData(formattedData);
      setTotalItems(formattedData.length);
      localStorage.setItem("tableData", JSON.stringify(formattedData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = () => {
    if (newItem.name && newItem.type) {
      const updatedData = [...data, { id: Date.now(), ...newItem }];
      setData(updatedData);
      setTotalItems(updatedData.length);
      localStorage.setItem("tableData", JSON.stringify(updatedData));
      setNewItem({ name: "", type: "" });
    }
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setTotalItems(updatedData.length);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, updatedItem) => {
    const updatedData = data.map((item) => (item.id === id ? updatedItem : item));
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
    setEditingId(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate page numbers
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="table-view-container">
      <div className="table-wrapper">
        <table className="mtg-table">
          <thead>
            <tr>
              <th className="sortable">
                Name
                <span className="sort-icon">⇅</span>
              </th>
              <th className="sortable">
                Type
                <span className="sort-icon">⇅</span>
              </th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 1 ? "row-alternate" : ""}>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        setData(data.map((d) => (d.id === item.id ? { ...d, name: e.target.value } : d)))
                      }
                      className="edit-input"
                    />
                  ) : (
                    <Text className="item-name">{item.name}</Text>
                  )}
                </td>
                <td>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={item.type}
                      onChange={(e) =>
                        setData(data.map((d) => (d.id === item.id ? { ...d, type: e.target.value } : d)))
                      }
                      className="edit-input"
                    />
                  ) : (
                    <Text className="item-type">{item.type}</Text>
                  )}
                </td>
                <td className="actions-cell">
                  {editingId === item.id ? (
                    <button className="action-button save-button" onClick={() => handleSave(item.id, item)}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button className="action-button edit-button" onClick={() => handleEdit(item.id)}>
                        Edit
                      </button>
                      <button className="action-button delete-button" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="pagination-controls">
          <span className="page-size-control">
            Page Size:
            <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="page-size-select">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
          
          <span className="page-info">
            {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </span>
          
          <div className="page-navigation">
            <button 
              className="page-nav-button" 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              ⟪
            </button>
            <button 
              className="page-nav-button" 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ⟨
            </button>
            <span className="current-page">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="page-nav-button" 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              ⟩
            </button>
            <button 
              className="page-nav-button" 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              ⟫
            </button>
          </div>
        </div>
      </div>

      <div className="add-item-section">
        <h3>Add New Item</h3>
        <div className="add-form">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="add-input"
          />
          <input
            type="text"
            placeholder="Type"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="add-input"
          />
          <button className="add-button" onClick={handleAdd}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableView;