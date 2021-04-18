import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineGraph = ({ data }) => {
  return (
    <>
      <LineChart
        width={1300}
        height={600}
        data={data}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalPesos" stroke="#8884d8" />
        <Line type="monotone" dataKey="totalDolares" stroke="#82ca9d" />
      </LineChart>
    </>
  );
};

export default LineGraph;
