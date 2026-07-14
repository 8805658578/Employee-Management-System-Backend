const PageContainer = ({
  title,
  children,
}) => {
  return (
    <div
      className="animate-fade-in space-y-6"
    >
      <h1 className="text-3xl font-bold dark:text-white">
        {title}
      </h1>

      {children}
    </div>
  );
};

export default PageContainer;