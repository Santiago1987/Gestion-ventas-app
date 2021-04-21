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
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis dataKey="total" />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </>
  );
};

export default LineGraph;
