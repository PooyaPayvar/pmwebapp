import React, { useState } from "react";

function Forms() {
  const [rows, setRows] = useState([
    {
      id: 1,
      formCode: "Data 1",
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
    },
    // Add more rows as needed
  ]);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentRow, setCurrentRow] = useState(null);

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

  const handleEdit = (id) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
    );
  };

  const handleSave = (id) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, isEditing: false } : row))
    );
  };

  const handleChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200 z-0">
        <thead>
          <tr>
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
              <td className="py-2 px-4 border-b">{row.id}</td>
              {row.isEditing ? (
                <>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.formCode}
                      onChange={(e) =>
                        handleChange(row.id, "formCode", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.section}
                      onChange={(e) =>
                        handleChange(row.id, "section", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.machineName}
                      onChange={(e) =>
                        handleChange(row.id, "machineName", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.shift}
                      onChange={(e) =>
                        handleChange(row.id, "shift", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.operatorName}
                      onChange={(e) =>
                        handleChange(row.id, "operatorName", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.formDate}
                      onChange={(e) =>
                        handleChange(row.id, "formDate", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.problemType}
                      onChange={(e) =>
                        handleChange(row.id, "problemType", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.stopStatus}
                      onChange={(e) =>
                        handleChange(row.id, "stopStatus", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.startDate}
                      onChange={(e) =>
                        handleChange(row.id, "startDate", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={row.problemDescription}
                      onChange={(e) =>
                        handleChange(
                          row.id,
                          "problemDescription",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{row.formCode}</td>
                  <td className="py-2 px-4 border-b">{row.section}</td>
                  <td className="py-2 px-4 border-b">{row.machineName}</td>
                  <td className="py-2 px-4 border-b">{row.shift}</td>
                  <td className="py-2 px-4 border-b">{row.operatorName}</td>
                  <td className="py-2 px-4 border-b">{row.formDate}</td>
                  <td className="py-2 px-4 border-b">{row.problemType}</td>
                  <td className="py-2 px-4 border-b">{row.stopStatus}</td>
                  <td className="py-2 px-4 border-b">{row.startDate}</td>
                  <td className="py-2 px-4 border-b">
                    {row.problemDescription}
                  </td>
                </>
              )}
              <td className="py-2 px-4 border-b">
                {row.isEditing ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleSave(row.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(row.id)}
                  >
                    Edit
                  </button>
                )}
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
