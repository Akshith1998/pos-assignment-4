import { useEffect, useState } from "react";
import "./Heatmap.css";

export const HeatMap = ({ selectedCandidates }) => {
  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    if (selectedCandidates.length === 0) {
      setCandidateData([]);
      return;
    }

    const fetchCandidateData = async () => {
      try {
        const responses = await Promise.all(
          selectedCandidates.map((id) =>
            fetch(`https://forinterview.onrender.com/people/${id}`).then(
              (res) => res.json()
            )
          )
        );

        const formattedData = responses.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          skills: candidate.data?.data?.skillset?.flatMap((skillset) =>
            skillset.skills.map((skill) => ({
              name: skill.name,
              score: skill.pos[0]?.consensus_score || 0,
            }))
          ),
        }));

        setCandidateData(formattedData);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchCandidateData();
  }, [selectedCandidates]);

  const skillNames = [
    ...new Set(
      candidateData.flatMap((candidate) => candidate.skills.map((s) => s.name))
    ),
  ];

  const getColorForScore = (score) => {
    const colors = ["#F4F8E8", "#C6E5B1", "#88C975", "#4A9E42", "#206A20"];
    return colors[score] || "#ffffff";
  };

  return (
    <div className="heatmapContainer">
      {selectedCandidates.length === 0 ? (
        <div className="select">Select Candidates</div>
      ) : (
        <div className="heatmapTable">
          <div className="heatmapRow header">
            <div className="heatmapCell headerCell">Skills</div>
            {candidateData.map((candidate) => (
              <div key={candidate.id} className="heatmapCell headerCell">
                {candidate.name}
              </div>
            ))}
          </div>
          {skillNames.map((skill, index) => (
            <div key={index} className="heatmapRow">
              <div className="heatmapCell skillLabel">{skill}</div>
              {candidateData.map((candidate) => {
                const skillData = candidate.skills.find(
                  (s) => s.name === skill
                );
                const score = skillData ? skillData.score : 0;

                return (
                  <div
                    key={candidate.id}
                    className="heatmapCell colorCell"
                    style={{
                      backgroundColor: getColorForScore(score),
                    }}
                    title={`${score}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
