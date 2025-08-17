// components/DashboardPageClient.tsx
"use client";

import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { useMemo } from "react";
import { saveAs } from "file-saver";
import { Parser } from "json2csv";
import jsPDF from "jspdf";
import autoTable, { type HookData } from "jspdf-autotable";
import * as XLSX from "xlsx";

const lineData = [
  { month: "Jan", emissions: 400, savings: 240 },
  { month: "Feb", emissions: 300, savings: 220 },
  { month: "Mar", emissions: 200, savings: 180 },
  { month: "Apr", emissions: 278, savings: 190 },
  { month: "May", emissions: 260, savings: 210 },
  { month: "Jun", emissions: 240, savings: 230 },
];

const pieData = [
  { name: "Renewable Energy", value: 55 },
  { name: "Carbon Offsets", value: 25 },
  { name: "Waste Reduction", value: 20 },
];
const PIE_COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

const barData = [
  { quarter: "Q1", initiatives: 6, impact: 18 },
  { quarter: "Q2", initiatives: 8, impact: 22 },
  { quarter: "Q3", initiatives: 7, impact: 20 },
  { quarter: "Q4", initiatives: 9, impact: 26 },
];

const radarData = [
  { pillar: "E: Emissions", score: 78 },
  { pillar: "E: Waste", score: 66 },
  { pillar: "S: Labor", score: 72 },
  { pillar: "S: DEI", score: 64 },
  { pillar: "G: Ethics", score: 83 },
  { pillar: "G: Risk", score: 75 },
];

export default function DashboardPageClient() {
  // derived metrics (example)
  const totals = useMemo(() => {
    const totalEmissions = lineData.reduce((s, d) => s + d.emissions, 0);
    const totalSavings = lineData.reduce((s, d) => s + d.savings, 0);
    return { totalEmissions, totalSavings };
  }, []);

  // EXPORTS
  const exportCSV = () => {
    const parser = new Parser();
    const csv = parser.parse(lineData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "esg-data.csv");
  };

  const exportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(lineData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ESG Data");
    XLSX.writeFile(wb, "esg-data.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("ESG Dashboard Report", 14, 16);

    // 1) Line data table
    autoTable(doc, {
      head: [["Month", "Emissions", "Savings"]],
      body: lineData.map((d) => [d.month, d.emissions, d.savings]),
      didDrawPage: (dataArg: HookData) => {
        // Return void (not jsPDF) to satisfy PageHook type
        doc.text("Emissions vs Savings", 14, dataArg.settings.startY - 6);
      },
      startY: 24,
    });

    // 2) Summary table
    autoTable(doc, {
      head: [["Metric", "Value"]],
      body: [
        ["Total Emissions", String(totals.totalEmissions)],
        ["Total Savings", String(totals.totalSavings)],
      ],
      startY: (doc as any).lastAutoTable.finalY + 12,
      didDrawPage: () => {}, // explicit void
    });

    // 3) Pie + bar summary text (simple narrative)
    const y = (doc as any).lastAutoTable.finalY + 12;
    doc.text("Initiatives Mix (Pie): Renewable > Offsets > Waste Reduction", 14, y);
    doc.text("Quarterly Initiatives (Bar): Peak in Q4, strong impact growth.", 14, y + 8);

    doc.save("esg-data.pdf");
  };

  return (
    <main className="px-6 text-center">
      {/* Badge */}
      <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mt-6 mb-4 shadow-sm">
        📊 ESG Dashboard
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-6">
        ESG Performance Overview
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
        Track emissions, savings, initiatives, and pillar maturity — and export your data in one click.
      </p>

      {/* KPI strip */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-white p-4 shadow ring-1 ring-gray-100">
          <div className="text-xs text-gray-500">Total Emissions</div>
          <div className="text-2xl font-semibold text-gray-900">{totals.totalEmissions.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow ring-1 ring-gray-100">
          <div className="text-xs text-gray-500">Total Savings</div>
          <div className="text-2xl font-semibold text-gray-900">{totals.totalSavings.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow ring-1 ring-gray-100">
          <div className="text-xs text-gray-500">Top Initiative</div>
          <div className="text-2xl font-semibold text-gray-900">Renewables</div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow ring-1 ring-gray-100">
          <div className="text-xs text-gray-500">Best Pillar</div>
          <div className="text-2xl font-semibold text-gray-900">Governance</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Line */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">Emissions vs Savings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke="#EF4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">Initiatives Mix</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">Quarterly Initiatives & Impact</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="initiatives" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="impact" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">ESG Pillar Maturity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="pillar" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#10B981" fill="#10B981" fillOpacity={0.35} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700"
        >
          Export CSV
        </button>
        <button
          onClick={exportXLSX}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Export XLSX
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>
    </main>
  );
}
