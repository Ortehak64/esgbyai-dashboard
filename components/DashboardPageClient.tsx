"use client";

import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
  AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { saveAs } from "file-saver";
import { Parser } from "json2csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// ---------- DATA ----------
const data = [
  { month: "Jan", emissions: 400, savings: 240 },
  { month: "Feb", emissions: 300, savings: 220 },
  { month: "Mar", emissions: 200, savings: 180 },
  { month: "Apr", emissions: 278, savings: 190 },
];

const pieData = [
  { name: "Renewable Energy", value: 55 },
  { name: "Carbon Offsets", value: 25 },
  { name: "Waste Reduction", value: 20 },
];
const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

const scopeData = [
  { month: "Jan", scope1: 120, scope2: 160, scope3: 220 },
  { month: "Feb", scope1: 110, scope2: 140, scope3: 180 },
  { month: "Mar", scope1:  90, scope2: 120, scope3: 160 },
  { month: "Apr", scope1: 100, scope2: 130, scope3: 148 },
];

const cumulativeData = (() => {
  let cum = 0;
  return data.map((d, i) => {
    cum += d.savings;
    const targetPerMonth = 250; // tweak as needed
    return { month: d.month, cumulative: cum, target: (i + 1) * targetPerMonth };
  });
})();

const radarData = [
  { pillar: "Emissions",  score: 72, fullMark: 100 },
  { pillar: "Energy",     score: 80, fullMark: 100 },
  { pillar: "Waste",      score: 65, fullMark: 100 },
  { pillar: "Water",      score: 70, fullMark: 100 },
  { pillar: "Governance", score: 85, fullMark: 100 },
  { pillar: "Diversity",  score: 68, fullMark: 100 },
];

// ---------- EXPORTS ----------
function exportCSVAll() {
  const p = new Parser();
  const sections: string[] = [];

  // Emissions & Savings
  sections.push(
    "# ESG Data: Emissions vs Savings",
    p.parse(data)
  );

  // Scopes
  sections.push(
    "",
    "# ESG Data: Monthly Emissions by Scope",
    p.parse(scopeData)
  );

  // Cumulative
  sections.push(
    "",
    "# ESG Data: Cumulative Savings vs Target",
    p.parse(cumulativeData)
  );

  // Initiatives (Pie)
  sections.push(
    "",
    "# ESG Data: Initiatives (Pie)",
    p.parse(pieData)
  );

  // Pillars (Radar)
  sections.push(
    "",
    "# ESG Data: Pillar Scores (Radar)",
    p.parse(radarData)
  );

  const csvCombined = sections.join("\n");
  const blob = new Blob([csvCombined], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "esg-dashboard-all.csv");
}

function exportXLSXAll() {
  const wb = XLSX.utils.book_new();

  const ws1 = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws1, "ESG Data");

  const ws2 = XLSX.utils.json_to_sheet(scopeData);
  XLSX.utils.book_append_sheet(wb, ws2, "Scopes");

  const ws3 = XLSX.utils.json_to_sheet(cumulativeData);
  XLSX.utils.book_append_sheet(wb, ws3, "Cumulative");

  const ws4 = XLSX.utils.json_to_sheet(pieData);
  XLSX.utils.book_append_sheet(wb, ws4, "Initiatives");

  const ws5 = XLSX.utils.json_to_sheet(radarData);
  XLSX.utils.book_append_sheet(wb, ws5, "Pillars");

  XLSX.writeFile(wb, "esg-dashboard-all.xlsx");
}

function exportPDFAll() {
  const doc = new jsPDF();
  doc.text("ESG Dashboard Report", 14, 16);

  // 1) Emissions vs Savings
  autoTable(doc, {
    startY: 22,
    styles: { fontSize: 10 },
    head: [["Month", "Emissions", "Savings"]],
    body: data.map(d => [d.month, d.emissions, d.savings]),
    didDrawPage: (dataArg) => doc.text("Emissions vs Savings", 14, dataArg.settings.startY - 6),
  });

  // 2) Scopes
  autoTable(doc, {
    styles: { fontSize: 10 },
    head: [["Month", "Scope 1", "Scope 2", "Scope 3"]],
    body: scopeData.map(d => [d.month, d.scope1, d.scope2, d.scope3]),
    margin: { top: 14 },
    didDrawPage: (dataArg) => doc.text("Monthly Emissions by Scope", 14, dataArg.settings.startY - 6),
  });

  // 3) Cumulative
  autoTable(doc, {
    styles: { fontSize: 10 },
    head: [["Month", "Cumulative Savings", "Target"]],
    body: cumulativeData.map(d => [d.month, d.cumulative, d.target]),
    margin: { top: 14 },
    didDrawPage: (dataArg) => doc.text("Cumulative Savings vs Target", 14, dataArg.settings.startY - 6),
  });

  // 4) Initiatives (Pie)
  autoTable(doc, {
    styles: { fontSize: 10 },
    head: [["Initiative", "Value"]],
    body: pieData.map(d => [d.name, d.value]),
    margin: { top: 14 },
    didDrawPage: (dataArg) => doc.text("Initiatives (Pie Data)", 14, dataArg.settings.startY - 6),
  });

  // 5) Pillars (Radar)
  autoTable(doc, {
    styles: { fontSize: 10 },
    head: [["Pillar", "Score", "Full Mark"]],
    body: radarData.map(d => [d.pillar, d.score, d.fullMark]),
    margin: { top: 14 },
    didDrawPage: (dataArg) => doc.text("ESG Pillar Scores", 14, dataArg.settings.startY - 6),
  });

  doc.save("esg-dashboard-all.pdf");
}

export default function DashboardPageClient() {
  return (
    <main className="px-6 text-center">
      <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mt-6 mb-4 shadow-sm">
        📊 ESG Dashboard
      </div>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-6">
        ESG Performance Overview
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
        Track emissions, savings, and sustainability initiatives in real time.
      </p>

      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">Emissions vs Savings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke="#EF4444" />
              <Line type="monotone" dataKey="savings" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">ESG Initiatives</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">Monthly Emissions by Scope</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scopeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="scope1" stackId="a" fill="#F97316" name="Scope 1" />
              <Bar dataKey="scope2" stackId="a" fill="#3B82F6" name="Scope 2" />
              <Bar dataKey="scope3" stackId="a" fill="#10B981" name="Scope 3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">Cumulative Savings vs Target</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="target" stroke="#6B7280" fill="#6B7280" fillOpacity={0.15} name="Target" />
              <Area type="monotone" dataKey="cumulative" stroke="#10B981" fill="#10B981" fillOpacity={0.25} name="Cumulative" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optional: Radar summary */}
      <div className="max-w-3xl mx-auto mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4">ESG Pillar Scores</h2>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData} outerRadius={100}>
              <PolarGrid />
              <PolarAngleAxis dataKey="pillar" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-center gap-3 mt-10">
        <button onClick={exportCSVAll} className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700">
          Export CSV (All)
        </button>
        <button onClick={exportXLSXAll} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Export XLSX (All Sheets)
        </button>
        <button onClick={exportPDFAll} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
          Export PDF (Report)
        </button>
      </div>
    </main>
  );
}
