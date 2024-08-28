import React from "react";
import { IoIosSearch } from "react-icons/io";

const Searchbar = ({
  status,
  setStatus,
  domain,
  setDomain,
  name,
  setName,
  gender,
  setGender,
  getUsers,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-gray-900 rounded-lg shadow-lg">
      {/* Name Input */}
      <input
        className="w-full md:w-1/4 bg-gray-800 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        type="text"
        placeholder="Name or Email"
        onChange={(e) => setName(e.target.value)}
      />

      {/* Domain Input */}
      <input
        className="w-full md:w-1/4 bg-gray-800 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        type="text"
        placeholder="Domain"
        onChange={(e) => setDomain(e.target.value)}
      />

      {/* Gender Select */}
      <select
        className="w-full md:w-1/6 bg-gray-800 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      {/* Status Select */}
      <select
        className="w-full md:w-1/6 bg-gray-800 text-white rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">Status</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>

      {/* Search Button */}
      <button
        onClick={getUsers}
        className="w-full md:w-10 h-10 bg-cyan-800 text-white rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <IoIosSearch size={20} />
      </button>
    </div>
  );
};

export default Searchbar;
