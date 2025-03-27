import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button/index";
import Text from "../../atoms/Text/index";
import { API_URL } from "../../../constants";
import "./tableView.module.css";

interface Item {
  id: number;
  name: string;
  type: string;
}

const TableView: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ id: 0, name: "", type: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      try {
        const parsedData: Item[] = JSON.parse(storedData);
        setData(parsedData);
        setTotalItems(parsedData.length);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      
      if (!result.cards || !Array.isArray(result.cards)) {
        throw new Error("Invalid API response structure");
      }
      
      const formattedData: Item[] = result.cards.slice(0, 10).map((card: any, index: number) => ({
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
      setNewItem({ id: 0, name: "", type: "" });
    }
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setTotalItems(updatedData.length);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number, updatedItem: Item) => {
    const updatedData = data.map((item) => (item.id === id ? updatedItem : item));
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
    setEditingId(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="table-view-container">
      <div className="table-wrapper">
        <table className="mtg-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{editingId === item.id ? <input type="text" value={item.name} /> : <Text>{item.name}</Text>}</td>
                <td>{editingId === item.id ? <input type="text" value={item.type} /> : <Text>{item.type}</Text>}</td>
                <td>
                  {editingId === item.id ? (
                    <button onClick={() => handleSave(item.id, item)}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
