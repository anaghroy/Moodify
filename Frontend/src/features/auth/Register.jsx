import {Link} from "react-router"
import logo from "../../assets/images/logo.png";
import { Eye, KeyRound, Mail, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <form>
            <div className="user">
              <User />
              <input type="text" placeholder="Enter your username" required />
            </div>
            <div className="mail">
              <Mail />
              <input type="email" placeholder="name@example.com" required />
            </div>
            <div className="pass">
              <KeyRound />
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
              <div className="eye">
                <Eye />
              </div>
            </div>
          </form>
          <div className="btn">
            <button>Create Account</button>
          </div>
          <div className="already">
            <p>
              Already have an account?{" "}
              <Link to="/" className="signin-link">Sign In</Link>
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
