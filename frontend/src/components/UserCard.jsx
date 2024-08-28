import { PiEyeDuotone } from "react-icons/pi";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember } from "../store/teamContext";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const teamMembers = useSelector((state) => state.teamState.members);

  const handleCheckboxChange = () => {
    if (teamMembers.some((member) => member.id === user.id)) {
      dispatch(removeMember(user.id));
    } else {
      dispatch(addMember(user));
    }
  };

  return (
    <div className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 ease-in-out">
      
      {/* Name and Domain Section */}
      <div className="flex items-center gap-4 w-[40%]">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="h-5 w-5 accent-cyan-500 rounded-md cursor-pointer"
          onChange={handleCheckboxChange}
          checked={teamMembers.some((member) => member.id === user.id)}
        />
        {/* User Image and Info */}
        <img
          src={user.avatar}
          alt={`user-${user.id}`}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div className="flex flex-col">
          <p className="text-base font-semibold text-gray-800">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-500">{user.domain}</p>
        </div>
      </div>

      {/* Availability Section */}
      <div className="flex items-start justify-center gap-2 w-[30%]">
        <button className={`flex items-start gap-1 text-xs font-medium ${user.available ? 'text-green-600' : 'text-red-600'}`}>
          {user.available ? (
            <>
              <PiEyeDuotone />
              Available
            </>
          ) : (
            <>
              <PiEyeClosedDuotone />
              Not Available
            </>
          )}
        </button>
      </div>

      {/* User Email Section */}
      <div className="flex items-start justify-end w-[30%]">
        <p className="text-sm text-gray-600 truncate">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
