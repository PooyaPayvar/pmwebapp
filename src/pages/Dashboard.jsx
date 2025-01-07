import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { LineChart, Pie } from "../components";
import { earningData, dropdownData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Forms from "./Forms"; // Assuming Forms.js is in the same directory

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownList
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

function Dashboard() {
  const { currentMode } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-gray-200 h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 m-4 justify-center">
        <div className="dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-full flex flex-col lg:flex-row">
          <div className="flex-1 flex flex-col items-center">
            <div className="flex justify-between items-center gap-2 mb-10 w-full">
              <p className="text-xl font-semibold">Forms Overview</p>
            </div>
            <div className="w-full h-72 flex justify-center">
              <LineChart />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center mt-10 lg:mt-0">
            <div className="w-full h-72 flex justify-center">
              <Pie />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
