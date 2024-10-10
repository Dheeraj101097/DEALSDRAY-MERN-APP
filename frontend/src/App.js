import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashBord from "./pages/DashBoard";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <div className="h-auto w-screen">
      <p className="text-blue-500 font-bold text-2xl p-7">LOGO HERE</p>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<Registration />} path="/register" />
          <Route element={<DashBord />} path="/dashbord/:ID" />
          <Route element={<CreateEmployee />} path="create-employee" />
          <Route element={<EmployeeList />} path="/employee-list" />
          <Route element={<EditEmployee />} path="/edit-employee/:ID" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
