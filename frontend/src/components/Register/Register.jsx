import { useState } from "react";
import { register } from "../../services/api";
import { toast } from "react-toastify";

const Register = ({ setStage }) => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [gender, setGender] = useState("male");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await register(form.email, form.name, form.password, gender);
      if (!res?.success) {
        return toast.error(res?.msg);
      }

      toast.success(res?.msg);
      setForm({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      });
      setStage("login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Register</h1>

      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </label>

      <div className="flex items-center gap-4">
        <label className="cursor-pointer label">
          <input
            type="checkbox"
            checked={gender == "male"}
            onChange={() => setGender("male")}
            className="checkbox checkbox-info"
          />
          <span className="ml-2 label-text">Male</span>
        </label>

        <label className="cursor-pointer label">
          <input
            type="checkbox"
            checked={gender == "female"}
            onChange={() => setGender("female")}
            className="checkbox checkbox-info"
          />
          <span className="ml-2 label-text">Female</span>
        </label>
      </div>

      <div className="flex justify-between items-center mb-4">
        Already have an account?{" "}
        <p
          className="text-blue-500 cursor-pointer"
          onClick={() => setStage("login")}
        >
          Login
        </p>
      </div>
      <button className="btn btn-primary w-full" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
