import {
  forwardRef,
} from "react";

const Input = forwardRef(
  (
    {
      id,
      label,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">

        <label
          htmlFor={id}
          className="font-medium"
        >
          {label}
        </label>

        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${id}-error`
              : undefined
          }
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          {...props}
        />

        {error && (
          <p
            id={`${id}-error`}
            className="text-sm text-red-500"
          >
            {error.message}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;