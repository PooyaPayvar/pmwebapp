import React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Stacked, Pie, LineChart } from "../components";
import { earningData, dropdownData, ecomPieChartData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
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

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Forms Updates</p>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">110</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">EM</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">220</p>

                <p className="text-gray-500 mt-1">PM</p>
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">750</p>
              <p className="text-gray-400">All Forms</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Forms Overview</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
