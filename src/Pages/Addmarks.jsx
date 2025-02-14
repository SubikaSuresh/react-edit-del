import React, { useState, useEffect } from "react";
import "../styles/addmarks.css"

export default function Addmarks() {
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");
  const [sub5, setSub5] = useState("");
  const [marks, setMarks] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch Marks
  const fetchMarks = async () => {
    try {
      const res = await fetch("http://localhost:4000/fetch-marks");
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch marks");
      setMarks(data.marks);
    } catch (err) {
      console.error("Error fetching marks:", err);
    }
  };

  // Add or Update Marks
  const handleSubmit = async () => {
    const data = {
      sub1: String(sub1 || "").trim(),
      sub2: String(sub2 || "").trim(),
      sub3: String(sub3 || "").trim(),
      sub4: String(sub4 || "").trim(),
      sub5: String(sub5 || "").trim(),
    };

    if (!data.sub1 || !data.sub2 || !data.sub3 || !data.sub4 || !data.sub5) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const url = editId
        ? `http://localhost:4000/update-marks/${editId}`
        : "http://localhost:4000/add-data";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Failed to ${editId ? "update" : "add"} marks`);

      resetForm();
      fetchMarks();
    } catch (err) {
      console.error(`Error ${editId ? "updating" : "adding"} marks:`, err);
    }
  };

  // Delete a Mark Entry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const res = await fetch(`http://localhost:4000/delete-marks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete marks");

      fetchMarks();
    } catch (err) {
      console.error("Error deleting marks:", err);
    }
  };

  // Edit a Mark Entry
  const handleEdit = (record) => {
    setEditId(record.id);
    setSub1(record.sub1 || "");
    setSub2(record.sub2 || "");
    setSub3(record.sub3 || "");
    setSub4(record.sub4 || "");
    setSub5(record.sub5 || "");
  };

  // Reset form fields
  const resetForm = () => {
    setSub1("");
    setSub2("");
    setSub3("");
    setSub4("");
    setSub5("");
    setEditId(null);
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  return (
    <div>
      <h3>{editId ? "Edit Marks" : "Add Marks"}</h3>

      <div>
        <input type="text" placeholder="Enter mark 1"
         value={sub1} onChange={(e) => setSub1(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Enter mark 2" 
        value={sub2} onChange={(e) => setSub2(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Enter mark 3" 
        value={sub3} onChange={(e) => setSub3(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Enter mark 4" 
        value={sub4} onChange={(e) => setSub4(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="Enter mark 5" 
        value={sub5} onChange={(e) => setSub5(e.target.value)} />
      </div>

      <button onClick={handleSubmit} disabled={!sub1 || !sub2 || !sub3 || !sub4 || !sub5}>
        {editId ? "Update" : "Submit"}
      </button>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sub1</th>
            <th>Sub2</th>
            <th>Sub3</th>
            <th>Sub4</th>
            <th>Sub5</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.sub1}</td>
              <td>{record.sub2}</td>
              <td>{record.sub3}</td>
              <td>{record.sub4}</td>
              <td>{record.sub5}</td>
              <td>
                <button onClick={() => handleEdit(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)} style={{ marginLeft: "5px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

