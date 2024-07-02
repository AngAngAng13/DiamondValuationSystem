import { useState, createContext } from "react";
import styled from "styled-components";
import DemoPage from "../DemoPage";
import Navbar from "../../components/Navbar/Navbar";

const StyledButton = styled.button.attrs((props) => ({
  active: props.active ? "true" : undefined,
}))`
  padding: 10px 22px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ active }) => (active === "true" ? "green" : "#f9f9f9")};
  cursor: pointer;
  transition: background-color 0.3s;
`;

const StyledWideButton = styled.button.attrs((props) => ({
  active: props.active ? "true" : undefined,
}))`
  padding: 10px 55px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ active }) => (active === "true" ? "green" : "#f9f9f9")};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6e6e6;
  }
`;

export const UserContext = createContext();

function CalculateContent() {
  const bodyStyle = {
    margin: "109px 28px 8px 189px",
    padding: "20px",
    width: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };
  const bodyStyle1 = {
    margin: "109px 62px 76px -10px",
    padding: "20px",
    width: "30%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };
  const sectionStyle = {
    marginBottom: "20px",
  };
  const buttonContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "5px",
  };
  const buttonContainerStyle2 = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5px",
  };
  const buttonContainerStyle1 = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px",
  };

  const [selectedOrigin, setSelectedOrigin] = useState("NATURAL");
  const [selectedCut, setselectedCut] = useState(null);
  const [selectedClarity, setSelectedClarity] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [carat, setCarat] = useState(0.3);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOriginButtonClick = (origin) => {
    setSelectedOrigin(origin);
  };

  const handleShapeButtonClick = (shape) => {
    setselectedCut(shape);
  };

  const handleClarityButtonClick = (clarity) => {
    setSelectedClarity(clarity);
  };

  const handleColorButtonClick = (color) => {
    setSelectedColor(color);
  };

  const handleCaratChange = (e) => {
    setCarat(e.target.value);
  };

  const handleMakeButtonClick = (make) => {
    setSelectedMake(make);
  };

  const handleCertButtonClick = (cert) => {
    setSelectedCert(cert);
  };

  const contextValue = {
    selectedOrigin,
    selectedCut,
    selectedClarity,
    selectedColor,
    carat,
    selectedMake,
    selectedCert,
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Navbar />
        <div style={bodyStyle}>
          <h1>Diamond Price Calculator</h1>
          <div style={sectionStyle}>
            <h3>DIAMOND ORIGIN</h3>
            <div style={buttonContainerStyle2}>
              <div>
                <button className={`btn${selectedOrigin === "NATURAL" ? " active" : ""}`} style={{ width: "100%" }} onClick={() => handleOriginButtonClick("NATURAL")}>
                  NATURAL
                </button>
              </div>
              <div>
                <button className={`btn${selectedOrigin === "LAB GROWN" ? " active" : ""}`} onClick={() => handleOriginButtonClick("LAB GROWN")} style={{ width: "100%" }}>
                  LAB GROWN
                </button>
              </div>
            </div>
          </div>
          <div style={sectionStyle}>
            <h3>CUT</h3>
            <div style={buttonContainerStyle}>
              <div>
                <StyledButton active={selectedCut === "ROUND"} onClick={() => handleShapeButtonClick("ROUND")}>
                  ROUND
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "CUSHION"} onClick={() => handleShapeButtonClick("CUSHION")}>
                  CUSHION
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "EMERALD"} onClick={() => handleShapeButtonClick("EMERALD")}>
                  EMERALD
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "OVAL"} onClick={() => handleShapeButtonClick("OVAL")}>
                  OVAL
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "PRINCESS"} onClick={() => handleShapeButtonClick("PRINCESS")}>
                  PRINCESS
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "PEAR"} onClick={() => handleShapeButtonClick("PEAR")}>
                  PEAR
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "RADIANT"} onClick={() => handleShapeButtonClick("RADIANT")}>
                  RADIANT
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "MARQUISE"} onClick={() => handleShapeButtonClick("MARQUISE")}>
                  MARQUISE
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "ASSCHER"} onClick={() => handleShapeButtonClick("ASSCHER")}>
                  ASSCHER
                </StyledButton>
              </div>
              <div>
                <StyledButton active={selectedCut === "HEART"} onClick={() => handleShapeButtonClick("HEART")}>
                  HEART
                </StyledButton>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f2f2f2",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <h2 style={{ color: "#333" }}>CARAT</h2>
            <input
              type="range"
              min={0.3}
              max={5.0}
              step={0.01}
              value={carat}
              onChange={handleCaratChange}
              style={{
                width: "100%",
                height: "20px",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                outline: "none",
                WebkitAppearance: "none",
              }}
            />
            <div>Carat: {carat}</div>
          </div>
          <div style={sectionStyle}>
            <h2>COLOR</h2>
            <div style={buttonContainerStyle1}>
              <div>
                <StyledWideButton active={selectedColor === "K"} onClick={() => handleColorButtonClick("K")}>
                  K
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedColor === "J"} onClick={() => handleColorButtonClick("J")}>
                  J
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedColor === "I"} onClick={() => handleColorButtonClick("I")}>
                  I
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedColor === "H"} onClick={() => handleColorButtonClick("H")}>
                  H
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedColor === "G"} onClick={() => handleColorButtonClick("G")}>
                  G
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedColor === "F"} onClick={() => handleColorButtonClick("F")}>
                  F
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedColor === "E"} onClick={() => handleColorButtonClick("E")}>
                  E
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedColor === "D"} onClick={() => handleColorButtonClick("D")}>
                  D
                </StyledWideButton>
              </div>
            </div>
          </div>
          <div style={sectionStyle}>
            <h2>CLARITY</h2>
            <div style={buttonContainerStyle1}>
              <div>
                <StyledWideButton active={selectedClarity === "SI2"} onClick={() => handleClarityButtonClick("SI2")}>
                  SI2
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedClarity === "SI3"} onClick={() => handleClarityButtonClick("SI3")}>
                  SI3
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedClarity === "VS2"} onClick={() => handleClarityButtonClick("VS2")}>
                  VS2
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedClarity === "VS1"} onClick={() => handleClarityButtonClick("VS1")}>
                  VS1
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedClarity === "VVS2"} onClick={() => handleClarityButtonClick("VVS2")}>
                  VVS2
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedClarity === "VVS1"} onClick={() => handleClarityButtonClick("VVS1")}>
                  VVS1
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedClarity === "IF"} onClick={() => handleClarityButtonClick("IF")}>
                  IF
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedClarity === "FL"} onClick={() => handleClarityButtonClick("FL")}>
                  FL
                </StyledWideButton>
              </div>
            </div>
          </div>
          <div style={sectionStyle}>
            <h2>MAKE</h2>
            <div style={buttonContainerStyle1}>
              <div>
                <StyledWideButton active={selectedMake === "IDEAL"} onClick={() => handleMakeButtonClick("IDEAL")}>
                  IDEAL
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedMake === "EXCELLENT"} onClick={() => handleMakeButtonClick("EXCELLENT")}>
                  EXCELLENT
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedMake === "VERY GOOD"} onClick={() => handleMakeButtonClick("VERY GOOD")}>
                  VERY GOOD
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedMake === "GOOD"} onClick={() => handleMakeButtonClick("GOOD")}>
                  GOOD
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedMake === "FAIR"} onClick={() => handleMakeButtonClick("FAIR")}>
                  FAIR
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedMake === "POOR"} onClick={() => handleMakeButtonClick("POOR")}>
                  POOR
                </StyledWideButton>
              </div>
            </div>
          </div>
          <div style={sectionStyle}>
            <h2>CERTIFICATE / CERT</h2>
            <div style={buttonContainerStyle}>
              <div>
                <StyledWideButton active={selectedCert === "AGS"} onClick={() => handleCertButtonClick("AGS")}>
                  AGS
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "CEGL"} onClick={() => handleCertButtonClick("CEGL")}>
                  CEGL
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "CGI"} onClick={() => handleCertButtonClick("CGI")}>
                  CGI
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "CGL"} onClick={() => handleCertButtonClick("CGL")}>
                  CGL
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "DCLA"} onClick={() => handleCertButtonClick("DCLA")}>
                  DCLA
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "EGL Asia"} onClick={() => handleCertButtonClick("EGL Asia")}>
                  EGL Asia
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "EGL Intl."} onClick={() => handleCertButtonClick("EGL Intl.")}>
                  EGL Intl.
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "EGL USA"} onClick={() => handleCertButtonClick("EGL USA")}>
                  EGL USA
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "GCAL"} onClick={() => handleCertButtonClick("GCAL")}>
                  GCAL
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "GIA"} onClick={() => handleCertButtonClick("GIA")}>
                  GIA
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "HRD"} onClick={() => handleCertButtonClick("HRD")}>
                  HRD
                </StyledWideButton>
              </div>
              <div>
                <StyledWideButton active={selectedCert === "IGI"} onClick={() => handleCertButtonClick("IGI")}>
                  IGI
                </StyledWideButton>
              </div>
            </div>
          </div>
        </div>
        <UserContext.Provider value={contextValue}>
          <div style={bodyStyle1}>
            <h1>Calculator Output</h1>
            <DemoPage />
          </div>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default CalculateContent;
