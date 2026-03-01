import { Link } from "react-router";
import logo from "../../../assets/images/logo.png";
import { Eye, KeyRound, Mail, User, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import useRegister from "../hooks/useRegister";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { register } = useRegister();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  /**Register function */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await register(form);

    if (res?.success) {
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error(res?.message || "Registration failed");
    }
  }
  return (
    <motion.div
      className="main-login"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <div className="left">
        <div className="wrapper">
          <img src={logo} alt="logo" />
          <p>Moodify</p>
        </div>
        <div className="para-wrapper-1">
          <p>
            Create <span>Account</span>
          </p>
        </div>
        <div className="text">
          <p>Join us and start your journey today.</p>
        </div>
        <div className="btn-wrapper">
          <button
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            Login
          </button>
          <button
            className={location.pathname === "/register" ? "active" : ""}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="user">
              <User />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mail">
              <Mail />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="pass">
              <KeyRound />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
              />
              <div
                className="eye"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            <div className="btn">
              <button type="submit">Create Account</button>
            </div>
          </form>
          <div className="already">
            <p>
              Already have an account?{" "}
              <Link to="/" className="signin-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="right-text">
        <div className="para">
          <p>
            Join <span className="italic">Our Community</span> Today
          </p>
          <span className="analy">
            Start your journey with us. Create an account to access exclusive
            features and content tailored just for you.
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
