import { BrowserRouter, Routes, Route, useLocation } from "react-router";

import { AnimatePresence } from "framer-motion";

import FaceExpression from "./features/Expression/components/FaceExpression";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

// Animated Routes Wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faceExpression" element={<FaceExpression />} />
      </Routes>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRoutes;
