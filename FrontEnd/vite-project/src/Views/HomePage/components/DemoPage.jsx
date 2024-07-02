import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./CalculateContext/CalculateContent1";

const DemoPage = () => {
  const {
    selectedOrigin,
    selectedCut,
    selectedClarity,
    selectedColor,
    carat,
    selectedMake,
    selectedCert,
  } = useContext(UserContext);

  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fetch", {
          params: {
            cut: selectedCut,
            carat: carat,
            color: selectedColor,
            clarity: selectedClarity,
            make: selectedMake,
            cert: selectedCert,
          },
        });
        setPriceData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [
    selectedCut,
    carat,
    selectedColor,
    selectedClarity,
    selectedMake,
    selectedCert,
  ]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!priceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Demo Page</h2>
      <p>Selected Origin: {selectedOrigin}</p>
      <p>Selected Cut: {selectedCut}</p>
      <p>Selected Clarity: {selectedClarity}</p>
      <p>Selected Color: {selectedColor}</p>
      <p>Selected Carat: {carat}</p>
      <p>Selected Make: {selectedMake}</p>
      <p>Selected Certificate: {selectedCert}</p>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h3>Price Information</h3>
        <p>Minimum Price: ${priceData.min[0]}</p>
        <p>Maximum Price: ${priceData.max[0]}</p>
        <p>Average Price: ${priceData.avg[0]}</p>
      </div>
    </div>
  );
};

export default DemoPage;
