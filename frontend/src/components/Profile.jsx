import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember, clearAll } from "../store/teamContext";
import { PiEyeDuotone, PiEyeClosedDuotone } from "react-icons/pi";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Profile = () => {
  const [success, setSuccess] = useState(false);
  const [teamCode, setTeamCode] = useState("");
  const dispatch = useDispatch();
  const teamMembers = useSelector((state) => state.teamState.members);
  const path = window.location.pathname;

  useEffect(() => {
    if (path === "/team") setSuccess(false);
  }, [path]);

  const createTeam = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/team/",
        {
          memberIds: teamMembers.map((member) => member.id),
        }
      );

      if (response.status === 201) {
        const { _id } = response.data;
        setTeamCode(_id);
        toast.success("Team Created Successfully");
        setSuccess(true);
        dispatch(clearAll());
      } else {
        throw new Error("Team creation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCopyTeamCode = () => {
    navigator.clipboard.writeText(teamCode);
    toast.success("Team Code Copied to Clipboard");
  };

  return (
    <div className="w-full pb-6 mb-6 md:w-full md:bg-[#1E212A] text-cyan-500 h-full px-4 py-4 flex flex-col">
      <h1 className="text-xl font-bold">
        {path === "/team" ? "Member Details" : "Add Members To Your Team"}
      </h1>

      {teamMembers.length === 0 ? (
        <EmptyState success={success} />
      ) : (
        <MemberList teamMembers={teamMembers} dispatch={dispatch} />
      )}

      {teamMembers.length > 0 && (
        <button
          className="w-full mt-5 mb-12 bg-white h-10 rounded-md text-black hover:bg-gray-100 font-semibold shadow flex items-center justify-center"
          onClick={createTeam}
        >
          Save Team
        </button>
      )}

      {success && <SuccessActions handleCopyTeamCode={handleCopyTeamCode} setSuccess={setSuccess} />}
    </div>
  );
};

const EmptyState = ({ success }) => (
  <div className="flex flex-col md:h-full items-center mt-12 md:mt-32">
    <img
      src={
        success
          ? "https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png"
          : "https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp"
      }
      alt={success ? "Success" : "Empty Cart"}
      height={success ? 150 : 250}
      width={success ? 150 : 250}
    />
    <p className="mt-4">
      {success ? "Team Created Successfully" : "No Members Added"}
    </p>
  </div>
);

const MemberList = ({ teamMembers, dispatch }) => (
  <div className="mt-5 h-[85%] md:overflow-y-scroll">
    {teamMembers.map((member) => (
      <div
        key={member._id}
        className="flex items-center justify-between py-2 px-2 border border-gray-100 border-opacity-10 rounded-lg mb-2"
      >
        <span className="flex items-center gap-3">
          <img
            src={member.avatar}
            height={60}
            width={60}
            className="rounded-md bg-gray-200"
            alt={`user-${member.id}`}
          />
          <div>
            <p>
              {member.first_name} {member.last_name}
            </p>
            <p className="text-xs text-gray-400">{member.domain}</p>
            <AvailabilityStatus available={member.available} />
          </div>
        </span>
        <button
          className="bg-white h-8 px-4 rounded-full text-sm text-black hover:bg-gray-100 hover:border hover:border-gray-300 font-semibold shadow-sm transition duration-200 ease-in-out"
          onClick={() => dispatch(removeMember(member.id))}
        >
          Remove
        </button>

      </div>
    ))}
  </div>
);

const AvailabilityStatus = ({ available }) => (
  <p>
    {available ? (
      <span className="flex items-center gap-2 text-green-400 text-xs font-bold">
        <PiEyeDuotone />
        Available
      </span>
    ) : (
      <span className="flex items-center gap-2 text-red-400 text-xs font-bold">
        <PiEyeClosedDuotone />
        Not Available
      </span>
    )}
  </p>
);

const SuccessActions = ({ handleCopyTeamCode, setSuccess }) => (
  <div className="flex flex-col gap-4 mb-2 mt-20 md:mt-0">
    <button
      className="bg-white h-10 p-2 rounded-md text-black hover:bg-gray-100 font-semibold shadow flex items-center justify-center"
      onClick={handleCopyTeamCode}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>
      Copy Team Code
    </button>
    <button
      className="bg-green-500 text-white h-10 p-2 rounded-md hover:bg-gray-100 font-semibold shadow flex items-center justify-center"
      onClick={() => setSuccess(false)}
    >
      Create Another Team
    </button>
  </div>
);

export default Profile;
