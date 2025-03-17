import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useDarkMode } from "../DarkModeContext";

const postTypeData = [
  { name: "Images", value: 400 },
  { name: "Videos", value: 300 },
  { name: "Texts", value: 200 },
];

const PostTypeChart = () => {
  const { darkMode } = useDarkMode();
  
  const COLORS = darkMode ? ["#4F46E5", "#10B981", "#F59E0B"] : ["#3B82F6", "#22C55E", "#FACC15"];
  const bgColor = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";

  return (
    <div className={`p-4 rounded-lg shadow-lg shadow-gray-500 ${bgColor}`}>
      <h2 className="text-lg font-semibold mb-3">Post Type Distribution</h2>
      <PieChart width={400} height={250}>
        <Pie 
          data={postTypeData} 
          cx={200} 
          cy={125} 
          outerRadius={80} 
          dataKey="value" 
          label={({ name, value }) => `${name}: ${value}`}
        >
          {postTypeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PostTypeChart;
