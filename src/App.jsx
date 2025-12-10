import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Layout from "./Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Layout>
  );
}
