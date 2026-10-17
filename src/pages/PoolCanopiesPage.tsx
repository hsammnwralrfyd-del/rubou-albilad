import { useEffect } from "react";
import { Navigate } from "react-router-dom";

/** تم إلغاء صفحة مظلات المسابح حسب طلب العميل */
const PoolCanopiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Navigate to="/" replace />;
};

export default PoolCanopiesPage;
