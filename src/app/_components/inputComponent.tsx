import { useEffect, useState } from "react";

interface InputComponent {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  value: string;
}

function InputComponent({ name, onChange, type, value }: InputComponent) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);
  useEffect(() => {
    if (type === "password" && showPassword) {
      setInputType("text");
    } else if (type === "password" && !showPassword) {
      setInputType("password");
    } else {
      setInputType(type);
    }
  }, [type, showPassword]);
  return (
    <>
      <p className="text-sm font-medium">{name}</p>
      <input
        className="h-10 w-full rounded-md border border-gray-400 border-opacity-70 px-3 outline-none"
        name={name}
        placeholder="Enter"
        onChange={onChange}
        type={inputType}
        value={value}
      />
      {type === "password" && (
        <span
          className="absolute bottom-2 right-3 cursor-pointer underline"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          Show
        </span>
      )}
    </>
  );
}

export default InputComponent;
