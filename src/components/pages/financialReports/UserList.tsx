import { Avatar, Tag } from "antd";
import useDarkMode from "../../../store/theme";
import clsx from "clsx";
import useAllUsers from "../../../hooks/useAllUsers";

export default function UserList() {
  const {
    isLoading,
    users, // Updated data reference
    isError,
  } = useAllUsers();

  const { darkMode } = useDarkMode();

  if (isLoading) {
    return (
      <div
        className={clsx(
          "px-8 py-14 rounded-lg shadow animate-pulse",
          "bg-white dark:bg-zinc-300"
        )}
      >
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
        <div className="h-12 bg-zinc-300 dark:bg-zinc-200 rounded w-full mb-7"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-[var(--ant-color-error)] bg-[var(--ant-color-bg-container)]">
        Something went wrong fetching sales.
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="p-6 text-[var(--ant-color-text-tertiary)] bg-[var(--ant-color-bg-container)]">
        No Users Found
      </div>
    );
  }

  return (
    <section
      className={`space-y-4 px-8 py-14 rounded-lg shadow-[var(--ant-box-shadow)] ${
        darkMode ? "bg-neutral-800" : "bg-neutral-100"
      } `}
    >
      <h2 className="text-base font-bold uppercase tracking-wide text-[var(--ant-color-text-secondary)] flex items-center justify-between">
        <span> Users</span>
        <span>
          <Tag color="lime">All Users</Tag>
        </span>
      </h2>
      <ul className={`divide-y ${darkMode ? "divide-neutral-700" : ""}`}>
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 hover:bg-[var(--ant-color-item-hover-bg)] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Avatar
                // style={{ backgroundColor: color, verticalAlign: "middle" }}
                size={50}
                className="bg-amber-500"
              >
                {user.full_name?.charAt(0)}
              </Avatar>
              <div>
                <p className="font-semibold text-lg text-[var(--ant-color-text)]">
                  {user.full_name}
                </p>
                <p className="text-[var(--ant-color-text-tertiary)] text-sm">
                  {user.role}
                </p>
              </div>
            </div>

            <span className=" text-[var(--ant-color-text)] text-lg">
              {user.restricted ? (
                <Tag color="red">Not Active</Tag>
              ) : (
                <Tag color="green">Active</Tag>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
