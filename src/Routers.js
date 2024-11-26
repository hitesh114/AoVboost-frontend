import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Offers from "./Components/Offers";
import { fetchData } from "./Apis/API.js";
import Dashboard from "./Pages/Dashboard";
import AddOrEditOffer from "./Pages/AddOrEditOffer"
/* ******************************************************************************* */
const AppRouter = () => {
    const [data, setData] = useState([]);
    const [offers, setOffers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState("All");
  
    useEffect(() => {
      const loadData = async () => {
        const data = await fetchData();
        setData(data);
        setOffers(data);
      };
      loadData();
    }, []);
  
    const handleDataChange = (newData) => {
      setData(newData);
      setOffers(newData);
      setFilterValue("All");
    };
/* ***************************************************************************** */
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/offers"
          element={
            <Offers
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              data={offers}
              handleDataChange={handleDataChange}
            />
          }
        />
         <Route
          path="/create-offer"
          element={<AddOrEditOffer data={data} setData={handleDataChange} />}
        />
        <Route
          path="/edit-offer/:id"
          element={<AddOrEditOffer data={data} setData={handleDataChange} />}
        />
     </Routes> 
    </Router>
  );
};

export default AppRouter;