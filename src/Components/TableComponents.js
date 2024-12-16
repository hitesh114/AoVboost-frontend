import { useEffect, useState } from "react";
import { removeOffer, modifyOffer, fetchOffer } from "../Apis/APIOffer";
import { useNavigate } from "react-router-dom";
/* *************************************************************************** */
function TableComponent({ data, setData }) {
  const navigate = useNavigate();
  const onDelete = async (id) => {
    try {
      await removeOffer(id);
      const fetchedData = await fetchOffer();
      setData(fetchedData);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const toggleEnable = async (id) => {
    const updatedData = data.map((offer) => {
      if (offer.id === id) {
        return { ...offer, enabled: !offer.enabled };
      }
      return offer;
    });

    setData(updatedData);
    const updatedOffer = updatedData.find((offer) => offer.id === id);
    try {
      await modifyOffer(id, updatedOffer);
    } catch (error) {
      console.error("Error updating offer:", error);
      setData(data);
    }
  };
  /* Use UseEffect for Total */
  const totalImpressions = data.reduce((total, offer) => {
    return offer.enabled ? total + offer.impressions : total;
  }, 0);

  const totalConversions = data.reduce((total, offer) => {
    return offer.enabled ? total + offer.conversions : total;
  }, 0);

  const totalRevenue = data
    .reduce((total, offer) => {
      return offer.enabled ? total + offer.revenue : total;
    }, 0)
    .toFixed(2);

  const totalConversionRate = data
    .reduce((total, offer) => {
      return offer.enabled ? total + parseFloat(offer.conversionRate) : total;
    }, 0)
    .toFixed(2);

  /* *************************************************************************** */
  return (
    <>
      <div className="box_sty1">
        <table className="table tbl-sty1">
          <thead>
            <tr>
              <th className="text-center"></th>
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
                <td className="text-center">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={offer.enabled}
                      onChange={() => toggleEnable(offer.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
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
          <tfoot>
            <tr>
              <th className="text-center">Total</th>
              <th></th>
              <th className="text-center">{totalImpressions}</th>
              <th className="text-center">{totalConversions}</th>
              <th className="text-center">${totalRevenue}</th>
              <th className="text-center">{totalConversionRate} %</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default TableComponent;
