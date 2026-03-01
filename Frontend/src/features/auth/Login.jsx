import logo from "../../assets/images/logo.png";
import { Eye, FingerprintPattern, KeyRound, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";

const Login = () => {
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
        <div className="para-wrapper">
          <p>
            Welcome back to <br /> <span>Moodify</span>
          </p>
        </div>
        <div className="text">
          <p>
            AI-powered music streaming that adapts to your vibe. Sign in to
            continue your journey.
          </p>
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
            <button>Sign In</button>
          </div>
          <div className="with">
            <div className="line"></div>
            <p>OR CONTINUE WITH</p>
            <div className="line"></div>
          </div>
          <div className="google-btn">
            <button>
              <FingerprintPattern />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="para">
          <p>
            AI Revolutionizing the way we{" "}
            <span className="italic">experience</span> music.
          </p>
          <span className="analy">
            Moodify analyzes your emotional state and environment context to
            create the perfect soundscape for your moment.
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
