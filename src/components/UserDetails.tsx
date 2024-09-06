import React from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl mb-4 font-semibold text-gray-700">
        User Details
      </h2>
      <div className="mb-2">
        <strong>ID:</strong> {user.id}
      </div>
      <div className="mb-2">
        <strong>First Name:</strong> {user.firstName}
      </div>
      <div className="mb-2">
        <strong>Last Name:</strong> {user.lastName}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-2">
        <strong>Age:</strong> {user.age}
      </div>
    </div>
  );
};

export default UserDetails;
