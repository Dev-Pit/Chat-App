import GroupPanel from "./components/group_panel/GroupPanel";
import ComponentLayout from "./components/ComponentLayout";
import MainPanel from "./components/main_panel/MainPanel";
import MemberPanel from "./components/member_panel/MemberPanel";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ComponentLayout />} />
      {/* <Register/> */}
      {/* <ComponentLayout/> */}
    </Routes>
  );
}

export default App;
