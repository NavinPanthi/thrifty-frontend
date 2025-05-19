import { getInitialsTitle } from "@/utils/get-initials-title";

const UsersTable = ({ usersData }: { usersData?: UsersData }) => {
  // const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (!usersData || usersData.items.length === 0) {
    return <div className="py-8 text-center">No users found.</div>;
  }

  return (
    <>
      <div className="my-4 overflow-x-auto rounded-lg border">
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-gray-100 font-medium text-gray-700">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Roles</th>
            </tr>
          </thead>
          <tbody>
            {usersData.items
              .filter((user) => !user.roles.includes("admin"))
              .map((user) => (
                <tr
                  key={user.id}
                  className="cursor-pointer border-t hover:bg-gray-50"
                  // onClick={() => {
                  //   setSelectedUser(user);
                  //   setIsUserDetailModalOpen(true);
                  // }}
                >
                  <td className="px-4 py-2">
                    {user.imageData && user.imageType ? (
                      <img
                        src={`data:${user.imageType};base64,${user.imageData}`}
                        alt={user.fullName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                        {getInitialsTitle(user.fullName)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone || "-"}</td>
                  <td className="px-4 py-2">{user.address || "-"}</td>
                  <td className="px-4 py-2">
                    <ul className="list-inside list-disc space-y-1">
                      {user.roles.map((role, idx) => (
                        <li key={idx}>{role}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Optional detail modal (create this separately) */}
      {/* <UserDetailModal
        isOpen={isUserDetailModalOpen}
        closeModal={() => setIsUserDetailModalOpen(false)}
        user={selectedUser}
      /> */}
    </>
  );
};

export default UsersTable;
