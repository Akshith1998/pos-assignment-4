import "./RecommendedList.css";

export const RecommendedList = ({
  candidatesList,
  selectedCandidates,
  setSelectedCandidates,
}) => {
  const handleSelectedCandidates = (id) => {
    if (!selectedCandidates.includes(id)) {
      setSelectedCandidates((prev) => [...prev, id]);
    }
  };

  return (
    <div className="recommendedList">
      <div className="mostRecommendedHeading">Most Recommended</div>
      <div className="mostRecommended">
        {candidatesList.slice(0, 3).map((candidate) => {
          const isSelected = selectedCandidates.includes(candidate.id);
          return (
            <div className="candidateWrapper" key={candidate.id}>
              <div
                className="candidateName"
                style={{
                  opacity: isSelected ? 0.5 : 1,
                }}
              >
                {candidate.name}
              </div>
              <div
                className="addIcon"
                onClick={() => handleSelectedCandidates(candidate.id)}
                style={{
                  pointerEvents: isSelected ? "none" : "auto",
                  opacity: isSelected ? 0.5 : 1,
                }}
              >
                +
              </div>
            </div>
          );
        })}
      </div>
      <div className="candidatesList">Add Candidates</div>
      <div className="addList">
        {candidatesList.slice(3).map((candidate) => {
          const isSelected = selectedCandidates.includes(candidate.id);
          return (
            <div className="candidateWrapper" key={candidate.id}>
              <div
                className="candidateName"
                style={{
                  opacity: isSelected ? 0.5 : 1,
                }}
              >
                {candidate.name}
              </div>
              <div
                className="addIcon"
                onClick={() => handleSelectedCandidates(candidate.id)}
                style={{
                  pointerEvents: isSelected ? "none" : "auto",
                  opacity: isSelected ? 0.5 : 1,
                }}
              >
                +
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
