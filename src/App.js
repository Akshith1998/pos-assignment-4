import { useEffect, useState } from "react";
import { HeatMap } from "./components/HeatMap/HeatMap";
import { RecommendedList } from "./components/RecommendedList/RecommendedList";
import "./styles.css";

export default function App() {
  const [candidatesList, setCandidatesList] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      let res = await fetch("https://forinterview.onrender.com/people");
      res = await res.json();
      setCandidatesList(res);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="App">
      <div className="heading">POS Designer</div>
      {selectedCandidates.length > 0 && (
        <div className="selectNum">{selectedCandidates.length} Candidates</div>
      )}
      <div className="content">
        <RecommendedList
          candidatesList={candidatesList}
          selectedCandidates={selectedCandidates}
          setSelectedCandidates={setSelectedCandidates}
        />
        <HeatMap selectedCandidates={selectedCandidates} />
      </div>
    </div>
  );
}
