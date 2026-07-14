const InfoCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        {Icon && (
          <Icon
            className={`${iconColor} text-4xl`}
          />
        )}

      </div>

    </div>
  );
};

export default InfoCard;