import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import Searchbar from "../components/Searchbar";
import { Bars } from "react-loader-spinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, name, status, domain, gender]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8000/api/users?page=${currentPage}`;
      if (name) url += `&name=${name}`;
      if (status) url += `&available=${status}`;
      if (domain) url += `&domain=${domain}`;
      if (gender) url += `&gender=${gender}`;

      const response = await axios.get(url);
      setUsers(response.data.users);
      setTotalUsers(response.data.totalLength);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalUsers / 20);
    return [...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index + 1)}
        className={`w-9 px-2 text-center border border-gray-100 border-opacity-10 text-white ${
          index + 1 === currentPage ? "bg-black" : ""
        }`}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="bg-[#32353F] h-full w-full px-4 py-3 overflow-y-scroll no-scrollbar">
      <Searchbar
        status={status}
        setStatus={setStatus}
        domain={domain}
        setDomain={setDomain}
        name={name}
        setName={setName}
        gender={gender}
        setGender={setGender}
        getUsers={fetchUsers}
      />

      {/* header */}
      <div className="mt-4 flex items-center justify-between py-2 border border-gray-100 border-opacity-10">
        <div className="w-[55%] lg:w-[60%] flex items-center gap-3 px-3">
          <input
            type="checkbox"
            className="mr-8 ml-2 h-4 w-4 accent-slate-100 rounded-sm cursor-pointer"
          />
          <p className="text-xs ml-12 text-gray-400">Name</p>
        </div>
        <div className="w-[20%] lg:w-[15%] flex items-start justify-start">
          <p className="text-xs -ml-12 text-gray-400">Status</p>
        </div>
        <div className="w-[25%] md:w-[30%] flex items-start justify-center">
          <p className="text-xs text-gray-400">Email</p>
        </div>
      </div>

      <div className="bg-[#32353F] h-[80%] flex-grow text-white overflow-y-scroll no-scrollbar">
        {loading ? (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <Bars height="40" width="40" color="#4fa94d" ariaLabel="bars-loading" visible={true} />
            <p>Please wait!</p>
          </div>
        ) : users.length > 0 ? (
          users.map(user => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <p>No users found</p>
          </div>
        )}
      </div>

      <div className="w-full mt-3 pb-4">
        <div className="w-full mx-auto flex justify-center gap-2">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Users;
