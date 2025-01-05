import React, { useState } from "react";

function Forms() {
  const [rows, setRows] = useState([
    {
      id: 1,
      formCode: generateFormCode("Data 2"),
      section: "Data 2",
      machineName: "Data 3",
      shift: "Data 4",
      operatorName: "Data 5",
      formDate: "Data 6",
      problemType: "Data 7",
      stopStatus: "Data 8",
      startDate: "Data 9",
      problemDescription: "Data 10",
      isEditing: false,
      isSelected: false,
    },
    // Add more rows as needed
  ]);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentRow, setCurrentRow] = useState(null);

  function generateFormCode(section) {
    const sectionCode = getSectionCode(section);
    const monthCode = new Date().getMonth() + 1;
    const monthString = monthCode < 10 ? `0${monthCode}` : `${monthCode}`;
    const uniqueCode = "01"; // You can implement a logic to generate unique codes if needed
    return parseInt(`02${sectionCode}${monthString}${uniqueCode}`, 10);
  }

  function getSectionCode(section) {
    switch (section) {
      case "Data 2":
        return "01";
      case "Data 3":
        return "02";
      case "Data 4":
        return "03";
      // Add more cases as needed
      default:
        return "00";
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setCurrentRow(row);
    setShow(true);
  };

  const handleSend = () => {
    // Handle send logic here
    console.log("Selected option:", selectedOption);
    handleClose();
  };

  const handleDoubleClick = (id, field) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, isEditing: field } : row))
    );
  };

  const handleSave = (id, field, value) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value, isEditing: false } : row
      )
    );
  };

  const handleChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSelect = (id) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, isSelected: !row.isSelected } : row
      )
    );
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => !row.isSelected));
  };

  return (
    <div className="p-4 relative">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleDelete}
      >
        Delete Selected
      </button>
      <table className="min-w-full bg-white border border-gray-200 z-0">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Form Code</th>
            <th className="py-2 px-4 border-b">Section</th>
            <th className="py-2 px-4 border-b">Machine Name</th>
            <th className="py-2 px-4 border-b">Shift</th>
            <th className="py-2 px-4 border-b">Operator Name</th>
            <th className="py-2 px-4 border-b">Form Date</th>
            <th className="py-2 px-4 border-b">Problem Type</th>
            <th className="py-2 px-4 border-b">Stop Status</th>
            <th className="py-2 px-4 border-b">Start Date</th>
            <th className="py-2 px-4 border-b">Problem Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={row.isSelected}
                  onChange={() => handleSelect(row.id)}
                />
              </td>
              <td className="py-2 px-4 border-b">{row.id}</td>
              {[
                "formCode",
                "section",
                "machineName",
                "shift",
                "operatorName",
                "formDate",
                "problemType",
                "stopStatus",
                "startDate",
                "problemDescription",
              ].map((field) => (
                <td
                  key={field}
                  className="py-2 px-4 border-b"
                  onDoubleClick={() => handleDoubleClick(row.id, field)}
                >
                  {row.isEditing === field ? (
                    <input
                      type="text"
                      value={row[field]}
                      onChange={(e) =>
                        handleChange(row.id, field, e.target.value)
                      }
                      onBlur={(e) => handleSave(row.id, field, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    row[field]
                  )}
                </td>
              ))}
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleShow(row)}
                >
                  Send
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {show && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-4 rounded w-1/2">
              <h2 className="text-xl mb-4">Send</h2>
              <select
                className="border border-gray-300 p-2 rounded w-full mb-4"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="mechanic">Mechanic</option>
                <option value="electric">Electric</option>
                <option value="utility">Utility</option>
                <option value="metalworking">Metalworking</option>
                <option value="production">Production</option>
              </select>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Forms;
