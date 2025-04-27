import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./assets/Role/User/UserComponents/UserProfile/UserProfile.jsx";
import Body from "./assets/Components/PageBody/Body.jsx"
import UserInterface from "./assets/Role/User/UserComponents/UserInterface/UserInterface.jsx";
import ErrorPage from "./assets/Components/ErrorPage/ErrorPage.jsx";
import Orders from "./assets/Role/User/UserComponents/UserOrders/UserOrders.jsx";
import AdminDash from "./assets/Role/Admin/AdminComponents/AdminDashboard/AdminDash.jsx";
import CeoDash from "./assets/Role/Ceo/CeoComponents/CeoDashboard/CeoDash.jsx";
import CourierDash from "./assets/Role/Courier/CourierComponents/CourierDashboard/CourierDash.jsx";
import CompanySite from './assets/Role/Company/CompanyComponents/CompanySite/CompanySite.jsx';
import Summary from "./assets/Role/Order/OrderComponents/SummaryOrder/Summary.jsx"
import UpdateAdmin from "./assets/Role/Admin/UpdateAdmin/UpdateAdmin.jsx"
/*
import UpdateCeo from "./assets/Components/Editors/UpdateCeo/UpdateCeo.jsx";
import CourierEditor from "./assets/Components/Editors/CourierEditor/CourierEditor.jsx";
import UpdateUser from "./assets/Components/Editors/UpdateUser/UpdateUser.jsx";
import UpdateCompany from "./assets/Components/Editors/UpdateCompany/UpdateCompany.jsx";
*/
import { AppProvider } from './assets/Context/AppContext';

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Body />} index={true} />
                    <Route path="/:userType/:id/home" element={<UserInterface/>} />
                    <Route path="/:userType/:id/profile" element={<UserProfile />} />
                    <Route path="/:userType/:id/orders" element={<Orders />} />
                    <Route path="*" ErrorBoundary={true} element={<ErrorPage />} />
                    <Route path="/:userType/:id/admindashboard" element={<AdminDash />} />
                    <Route path="/:userType/:id/ceodashboard" element={<CeoDash />} />
                    <Route path="/:userType/:id/courierdashboard" element={<CourierDash />} />
                    <Route path='/:usertype/:id/:compnayName/products' element={<CompanySite />} />
                    <Route path='/summary' element={<Summary />}/>
                    <Route path='/USER/:companyName/:id/products' element={<CompanySite />} />
                    <Route path='/admin/edit/:id' element={<UpdateAdmin />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;