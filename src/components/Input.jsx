import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ type = "text", label, className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="inline-block mb-1 pl-1">
            {label}
          </label>
        )}
        <input
          type={text}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
