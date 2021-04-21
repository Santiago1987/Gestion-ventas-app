import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
  BarChart,
} from "recharts";

const BarGraph = ({ data }) => {
  return (
    <>
      <BarChart
        width={1300}
        height={600}
        data={data}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#0c5af6" />
      </BarChart>
    </>
  );
};

export default BarGraph;
