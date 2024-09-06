"use client";

import UserList from "./UserList";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface UserManagementProps {
  users: User[];
  page: number;
  age?: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onFilterChange: (age?: number) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  page,
  age,
  pageSize,
  onPageChange,
  onFilterChange,
}) => {
  const handleAgeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ageValue = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange(ageValue);
  };

  return (
    <div className=" bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="py-2 px-4 border rounded hover:shadow-md hover:bg-gray-200"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={users.length < pageSize}
            className="py-2 px-4 border rounded hover:shadow-md hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
      {/* Age Filter */}
      <div className="my-4 flex items-center gap-4">
        <label
          htmlFor="ageFilter"
          className="block h-full text-sm whitespace-nowrap  font-medium text-gray-700"
        >
          Filter by Age:
        </label>
        <input
          id="ageFilter"
          type="number"
          value={age || ""}
          onChange={handleAgeFilter}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-32"
          placeholder="Age"
        />
      </div>

      <UserList users={users} />
    </div>
  );
};

export default UserManagement;
