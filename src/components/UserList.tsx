interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <ul className="mb-4">
    {users.map((user) => (
      <a key={user.id} href={`/dashboard/${user.id}`}>
        <li className="p-2 border-b">
          {user.firstName} {user.lastName}, Age: {user.age}, Email: {user.email}
        </li>
      </a>
    ))}
  </ul>
);

export default UserList;
