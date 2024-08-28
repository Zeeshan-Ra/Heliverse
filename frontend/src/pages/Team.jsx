import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMember, clearAll } from "../store/teamContext";

const inactiveClass =
  "w-auto md:h-44 cursor-pointer flex flex-col items-center justify-between gap-2 border border-gray-200 rounded-lg md:mr-4 p-3 md:p-5 hover:shadow-lg transition duration-300 ease-in-out bg-gray-800";
const activeClass =
  "w-auto md:h-44 bg-slate-600 rounded-lg md:mr-4 p-3 md:p-5 flex flex-col items-center justify-between gap-2 shadow-lg cursor-pointer";

const Team = () => {
  const [teams, setTeams] = React.useState([]);
  const dispatch = useDispatch();
  const [teamId, setTeamId] = React.useState("");
  const [active, setActive] = React.useState(0);

  useEffect(() => {
    const getTeam = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/team/all"
      );
      const data = await response.data;
      setTeams(data);
    };
    getTeam();
  }, []);

  const getTeamById = async () => {
    if (teamId === "") return;

    const response = await axios.get(
      `http://localhost:8000/api/team/${teamId}`
    );
    const data = await response.data;
    setTeams([data]);
  };

  return (
    <div className="bg-gray-900 h-full w-full px-4 md:py-3 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <input
          className="bg-gray-800 rounded-full w-full md:w-2/5 h-12 px-4 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="text"
          placeholder="Enter Your Team Code"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />
        <button
          onClick={getTeamById}
          className="bg-cyan-500 text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <IoIosSearch className="text-lg" />
        </button>
      </div>
      <h1 className="font-bold text-xl md:text-2xl mb-6 text-white">
        {teamId === "" ? "All Teams" : "Your Team"}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto">
        {teams.map((team, index) => (
          <div
            key={team._id}
            className={index === active ? activeClass : inactiveClass}
            onClick={() => {
              dispatch(clearAll());
              team.members.forEach((member) => dispatch(addMember(member)));
              setActive(index);
            }}
          >
            <div className="text-sm md:text-base text-white">
              <span className={index === active ? "font-bold" : "font-medium"}>
                Active Members:{" "}
              </span>
              {team.members?.length}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              {team.members.length > 4
                ? team.members.slice(0, 4).map((member) => (
                    <img
                      key={member._id}
                      className={`rounded-full h-12 w-12 border-2 ${
                        index === active ? "border-cyan-500" : "border-gray-600"
                      }`}
                      src={member.avatar}
                      alt={member.name}
                    />
                  ))
                : team.members.map((member) => (
                    <img
                      key={member._id}
                      className={`rounded-full h-12 w-12 border-2 ${
                        index === active ? "border-cyan-500" : "border-gray-600"
                      }`}
                      src={member.avatar}
                      alt={member.name}
                    />
                  ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center mt-2">
              {team.domains.length > 4
                ? team.domains.slice(0, 4).map((domain, index2) => (
                    <div
                      key={index2}
                      className={`text-center text-xs rounded-full px-3 py-1 ${
                        index === active
                          ? "bg-cyan-800 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {domain}
                    </div>
                  ))
                : team.domains.map((domain, index2) => (
                    <div
                      key={index2}
                      className={`text-center text-xs rounded-full px-3 py-1 ${
                        index === active
                          ? "bg-cyan-800 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {domain}
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
