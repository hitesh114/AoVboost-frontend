import React from "react";
import SearchAndFilter from "../Components/SearchAndFilter";
import TableComponent from "../Components/TableComponents";

const Offers = ({ searchTerm, setSearchTerm, filterValue, setFilterValue, data, handleDataChange }) => {
  const filteredData = data
  .filter((offer) =>
    offer.offer.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter((offer) => {
    if (filterValue === "Enabled") return offer.enabled;
    if (filterValue === "Disabled") return !offer.enabled;
    return true; // For "All"
  });

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