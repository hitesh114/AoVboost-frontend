import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateOffer,addOffer,fetchData, GetItems } from "../Apis/API.js";
/* ***************************************************************************** */
const CreateNewOffer = () => {
  const [data, setData] = useState([]);
  const [offers, setOffers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    offer: "",
    impressions: "",
    conversions: "",
    revenue: "",
    conversionRate: "",
    enabled: true,
  });
  const editingOffer = !!id;
  /* ************************************************************************************************ */
  useEffect(() => {
    const loadData = async () => {
        const fetchedData = await GetItems();
        console.log("Fetched Data in Offers:", fetchedData);
        setData(fetchedData);
    };
    loadData();
}, []);
const handleDataChange = (newData) => {
   setData(newData);
   setOffers(newData);
   
 }; 
 /* ************************************************************************************************ */
  /* Edit or Add */
  useEffect(() => {
    if (editingOffer) {
      console.log("editing 1");
      const existingOffer = data.find((offer) => offer.id == id);
      if (existingOffer) {
        console.log("editing 2");
        setFormValues(existingOffer);
      }
    } else {
      console.log("ERROR. . . ");
    }
  }, [data, id, editingOffer]);
  /* **************************************************************************************************** */
  /* Handle Change */
  const handleChange = (e) => {
    console.log("change");
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "offer" ? value : Number(value),
    }));
  };
  /* ***************************************************************************************************** */
  /* Handle Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const newOffer = {
      id: formValues.id,
      offer: formValues.offer,
      impressions: parseInt(formValues.impressions, 10),
      conversions: parseInt(formValues.conversions, 10),
      revenue: parseFloat(formValues.revenue),
      conversionRate:
        (
          (parseInt(formValues.conversions, 10) /
            parseInt(formValues.impressions, 10)) *
          100
        ).toFixed(2) + "%",
        enabled: formValues.enabled,
    };
    try {
      if (editingOffer) {
        console.log("New offer data:", newOffer);
        // Edit existing offer
        await updateOffer(formValues.id, newOffer);
        console.log("New offer data:", newOffer);
        setData((prevData) =>
          prevData.map((offer) =>
            offer.id === formValues.id ? newOffer : offer
          )
        );
      } else {
        // Add new offer
        const response = await addOffer(newOffer);
        setData((prevData) => [...prevData, response.data]);
      }
      setFormValues({
        id: "",
        offer: "",
        impressions: "",
        conversions: "",
        revenue: "",
        conversionRate: "",
        enabled: true,
      }); // Reset form
      navigate("/offers");
    } catch (error) {
      console.error(
        "Error saving offer:",
        error.response ? error.response.data : error.message
      );
    }
  };
  /************************************************************************************************************* */
  return (
    <div className="box_sty1">
      <div className="create-offer">
        <h1 className="mb-4">
          {editingOffer ? "Edit Offer" : "Create New Offer"}
        </h1>
        <div className="row">
          {/* Offer Code */}
          <div className="col form-group">
            <input
              className="form-control"
              type="text"
              name="offer"
              placeholder="Offer Code"
              value={formValues.offer}
              onChange={handleChange}
              required
            />
          </div>
          {/* Impressions */}
          <div className="col form-group">
            <input
              className="form-control"
              type="number"
              name="impressions"
              placeholder="Impressions"
              value={formValues.impressions}
              onChange={handleChange}
              required
            />
          </div>
          {/* Conversions */}
          <div className="col form-group">
            <input
              className="form-control"
              type="number"
              name="conversions"
              placeholder="Conversions"
              value={formValues.conversions}
              onChange={handleChange}
              required
            />
          </div>
          {/* Revenue */}
          <div className="col form-group">
            <input
              className="form-control"
              type="number"
              name="revenue"
              placeholder="Revenue"
              value={formValues.revenue}
              onChange={handleChange}
              required
            />
          </div>
          {/* Enabled Checkbox */}
          <div className="col form-group">
            <label>
              <input
                type="checkbox"
                name="enabled"
                checked={formValues.enabled}
                onChange={() => setFormValues((prev) => ({ ...prev, enabled: !prev.enabled }))}
              />
              Enabled
            </label>
          </div>
        </div>
      </div>
      {/* Submit */}
      <div className="d-flex justify-content-end mt-3 col-gap-15">
        <button
          type="cancel"
          className="btn btn-danger"
          onClick={() => {
            navigate("/offers");
          }}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-sty1" onClick={handleSubmit}>
          {editingOffer ? "Update Offer" : "Create Offer"}
        </button>
      </div>
    </div>
  );
};
export default CreateNewOffer;
