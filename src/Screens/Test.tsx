import React from "react";
import ATMTable from "../component/atom/ATMTable/ATMTable";
import { AiFillAlert } from "react-icons/ai";

const MyComponent = () => {
  // Define the columns and rows data
  const columns = [
    {
      label: "Name",
      key: "name",
      render: (data: any, row: any) => (
        <div className="text-blue-600"> {row?.name}</div>
      ),
    },
    { label: "Name", key: "name" },
    { label: "Name", key: "name" },
    { label: "Name", key: "name" },
    { label: "Name", key: "name" },
    {
      label: "Action",
      key: "action",
      render: (data: any, row: any) => (
        <span>
          <div
            className="flex gap-8"
            onClick={() => {
              alert(row?.name);
            }}
          >
            <AiFillAlert />
            <div className="text-blue-600"> {row?.name}</div>
          </div>
        </span>
      ),
    },
    // Add more columns as needed
  ];

  const rows = [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
    { name: "ashiii Smith", age: 25 },
    { name: "Jane Smith", age: 25 },
    { name: "Jane Smith", age: 25 },

    // Add more rows as needed
  ];

  return (
    <div>
      <h1>ATM Table Example</h1>
      <ATMTable columns={columns} rows={rows} />
    </div>
  );
};

export default MyComponent;
