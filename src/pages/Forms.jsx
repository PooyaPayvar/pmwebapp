import React, { useState } from "react";

function Forms({ role = "operator" }) {
  const [rows, setRows] = useState([
    {
      id: 1,
      section: "chipper",
      machineName: "Push Feeder",
      equipmentName: "Pusher",
      shift: "A",
      operatorName: "Pooya Payvar",
      formDate: "1403/10/16",
      problemType: "Mechanic",
      stopStatus: "Yes",
      stopDate: "1403/10/16",
      startDate: "1403/10/16",
      problemDescription: "بوش فیدر مشکل دارد",
      isEditing: false,
      isSelected: false,
    },
    {
      id: 2,
      section: "sanding",
      machineName: "Push Feeder",
      equipmentName: "Pusher",
      shift: "A",
      operatorName: "Pooya Payvar",
      formDate: "1403/01/16",
      problemType: "Mechanic",
      stopStatus: "Yes",
      stopDate: "1403/10/16",
      startDate: "1403/10/16",
      problemDescription: "بوش فیدر مشکل دارد",
      isEditing: false,
      isSelected: false,
    },
    {
      id: 3,
      section: "refiner",
      machineName: "Push Feeder",
      equipmentName: "Pusher",
      shift: "A",
      operatorName: "Pooya Payvar",
      formDate: "1403/05/16",
      problemType: "Mechanic",
      stopStatus: "Yes",
      stopDate: "1403/10/16",
      startDate: "1403/10/16",
      problemDescription: "بوش فیدر مشکل دارد",
      isEditing: false,
      isSelected: false,
    },
    {
      id: 4,
      section: "steamboiler",
      machineName: "Push Feeder",
      equipmentName: "Pusher",
      shift: "A",
      operatorName: "Pooya Payvar",
      formDate: "1403/08/16",
      problemType: "Mechanic",
      stopStatus: "Yes",
      stopDate: "1403/10/16",
      startDate: "1403/10/16",
      problemDescription: "بوش فیدر مشکل دارد",
      isEditing: false,
      isSelected: false,
    },
    {
      id: 5,
      section: "chipper",
      machineName: "Push Feeder",
      equipmentName: "Pusher",
      shift: "A",
      operatorName: "Pooya Payvar",
      formDate: "1403/09/16",
      problemType: "Mechanic",
      stopStatus: "Yes",
      stopDate: "1403/10/16",
      startDate: "1403/10/16",
      problemDescription: "بوش فیدر مشکل دارد",
      isEditing: false,
      isSelected: false,
    },
  ]);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentRow, setCurrentRow] = useState(null); // eslint-disable-line no-unused-vars

  function generateFormCode(section, formDate, rowIndex) {
    const sectionCode = getSectionCode(section);
    const typeCode = getTypeCode(formDate);
    const uniqueCode = (rowIndex + 1).toString().padStart(2, "0"); // Ensure the row index is always two digits
    return `02${sectionCode}${typeCode}${uniqueCode}`;
  }

  function getSectionCode(section) {
    switch (section.toLowerCase()) {
      case "chipper":
        return "01";
      case "conveyor line":
        return "02";
      case "dryer air graider":
        return "03";
      case "refiner":
        return "04";
      case "before press":
        return "06";
      case "press":
        return "07";
      case "after press":
        return "08";
      case "sanding":
        return "09";
      case "cooling system":
        return "10";
      case "steam boiler":
        return "11";
      case "general":
        return "15";
      default:
        return "00";
    }
  }

  function getTypeCode(formDate) {
    const dateParts = formDate.split("/");
    const month = dateParts[1]; // فرمت تاریخ همیشه اینجوری است "YYYY/MM/DD"
    return month.padStart(2, "0"); // ماه همیشه دو رقم است
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

  const isActionColumnVisible = role !== "operator" && role !== "technician";

  return (
    <div className="p-4">
      <button
        className={`bg-red-500 text-white px-4 py-2 rounded mb-4 ${
          role === "operator" || role === "technician" ? "opacity-0" : ""
        }`}
        onClick={handleDelete}
        disabled={role === "operator" || role === "technician"}
      >
        Delete
      </button>
      <table className="min-w-full bg-white border border-gray-200 z-0 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Form Code</th>
            <th className="py-2 px-4 border-b">Section</th>
            <th className="py-2 px-4 border-b">Machine Name</th>
            <th className="py-2 px-4 border-b">Equipment Name</th>
            <th className="py-2 px-4 border-b">Shift</th>
            <th className="py-2 px-4 border-b">Operator Name</th>
            <th className="py-2 px-4 border-b">Form Date</th>
            <th className="py-2 px-4 border-b">Problem Type</th>
            <th className="py-2 px-4 border-b">Stop Status</th>
            <th className="py-2 px-4 border-b">Stop Date</th>
            <th className="py-2 px-4 border-b">Start Date</th>
            <th className="py-2 px-4 border-b">Problem Description</th>
            {isActionColumnVisible && (
              <th className="py-2 px-4 border-b">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={row.isSelected}
                  onChange={() => handleSelect(row.id)}
                />
              </td>
              <td className="py-2 px-4 border-b">{row.id}</td>
              <td className="py-2 px-4 border-b">
                {generateFormCode(row.section, row.formDate, index)}
              </td>
              {[
                "section",
                "machineName",
                "equipmentName",
                "shift",
                "operatorName",
                "formDate",
                "problemType",
                "stopStatus",
                "stopDate",
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
              {isActionColumnVisible && (
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleShow(row)}
                  >
                    Send
                  </button>
                </td>
              )}
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
