import React, { useEffect, useState } from "react";
import SearchAndFilter from "../Components/SearchAndFilter.js";
import TableComponent from "../Components/TableComponents.js";
import { fetchOffer, GetItems } from "../Apis/APIOffer.js";

const Offers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [data, setData] = useState([]);
  const filteredData = data
    .filter((offer) =>
      offer.offer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((offer) => {
      if (filterValue === "Enabled") return offer.enabled;
      if (filterValue === "Disabled") return !offer.enabled;
      return true; // For "All"
    });

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchOffer();
      console.log("Fetched Data in Offers:", fetchedData);
      setData(fetchedData);
    };
    loadData();
  }, []);
  const handleDataChange = (newData) => {
    setData(newData);
    setFilterValue("All");
  };
  return (
    <>
      <SearchAndFilter
        searchTerm={searchTerm}
        handleSearchChange={(e) => setSearchTerm(e.target.value)}
        filterValue={filterValue}
        handleFilterChange={(e) => setFilterValue(e.target.value)}
        data={filteredData}
      />
      <TableComponent data={filteredData} setData={handleDataChange} />
    </>
  );
};

export default Offers;
