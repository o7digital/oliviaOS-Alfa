"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const relationshipMomentum = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 68 },
  { month: "Mar", value: 74 },
  { month: "Apr", value: 79 },
  { month: "May", value: 83 },
  { month: "Jun", value: 87 },
];

export default function RelationshipMomentumChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={relationshipMomentum}>
        <XAxis dataKey="month" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#111",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            color: "#fff",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#FF2F7D"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
