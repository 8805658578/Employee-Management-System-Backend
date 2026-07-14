import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  title = "No Data Found",
  message = "There are no records available.",
}) => {
  return (
    <div className="rounded-xl bg-white p-10 text-center shadow-md">

      <FaInbox
        className="mx-auto mb-6 text-gray-400"
        size={70}
      />

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        {message}
      </p>

    </div>
  );
};

export default EmptyState;