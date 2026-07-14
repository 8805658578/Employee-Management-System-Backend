const Loader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center py-12"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

      <span className="sr-only">
        Loading...
      </span>
    </div>
  );
};

export default Loader;