import React from "react";
import { deleteOffer } from "../Apis/API";
import { useNavigate } from "react-router-dom";
/* *************************************************************************** */
function TableComponent({ data, setData }) {
  const navigate = useNavigate();
  const onDelete = async (id) => {
    try {
      await deleteOffer(id);
      const updatedData = data.filter((offer) => offer.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };
  /* *************************************************************************** */
  return (
    <>
      <div className="box_sty1">
        <table className="table tbl-sty1">
          <thead>
            <tr>
              <th className="text-center">Offer</th>
              <th className="text-center">Impressions</th>
              <th className="text-center">Conversions</th>
              <th className="text-center">Revenue</th>
              <th className="text-center">Conversion Rate</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((offer) => (
              <tr key={offer.id}>
                <td className="text-center">{offer.offer}</td>
                <td className="text-center">{offer.impressions}</td>
                <td className="text-center">{offer.conversions}</td>
                <td className="text-center">
                  ${(offer.revenue || 0).toFixed(2)}
                </td>
                <td className="text-center">{offer.conversionRate}</td>
                <td>
                  <div className="d-flex col-gap-15 justify-content-center">
                    <button
                      onClick={() => navigate(`/edit-offer/${offer.id}`)}
                      className="btn btn-info"
                    >
                      Edit{" "}
                    </button>
                    <button
                      onClick={() => onDelete(offer.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableComponent;
