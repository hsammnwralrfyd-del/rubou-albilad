import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FloatingButtons from "./components/FloatingButtons";

// ===============================
// الصفحة الرئيسية
// ===============================
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ===============================
// الخدمات الجديدة - 9 خدمات
// ===============================

// 1 - المظلات
const CanopiesPage = lazy(
  () => import("./pages/CanopiesPage")
);

// 2 - السواتر
const ShuttersPage = lazy(
  () => import("./pages/ShuttersPage")
);

// 3 - البرجولات
const PergolasPage = lazy(
  () => import("./pages/PergolasPage")
);

// 4 - الهناجر
const WarehousesPage = lazy(
  () => import("./pages/WarehousesPage")
);

// 5 - ساندوتش بانل
const SandwichPanelPage = lazy(
  () => import("./pages/SandwichPanelPage")
);

// 6 - الشبوك
const FencingPage = lazy(
  () => import("./pages/FencingPage")
);

// 7 - مظلات السيارات
const CarCanopiesPage = lazy(
  () => import("./pages/CarCanopiesPage")
);

// 8 - مظلات الحدائق
const GardenCanopiesPage = lazy(
  () => import("./pages/GardenCanopiesPage")
);

// ===============================
// React Query
// ===============================

const queryClient = new QueryClient();

// ===============================
// شاشة التحميل
// ===============================

const LoadingFallback = () => (
  <div
    dir="rtl"
    className="flex min-h-screen items-center justify-center bg-background"
  >
    <div className="text-center">
      <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />

      <p className="text-lg text-secondary">
        جاري التحميل...
      </p>
    </div>
  </div>
);

// ===============================
// التطبيق
// ===============================

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>

            {/* =========================
                الصفحة الرئيسية
            ========================= */}

            <Route
              path="/"
              element={<Index />}
            />

            {/* =========================
                الخدمات الجديدة - 9 خدمات
            ========================= */}

            {/* 1 - المظلات */}
            <Route
              path="/canopies"
              element={<CanopiesPage />}
            />

            {/* 2 - السواتر */}
            <Route
              path="/shutters"
              element={<ShuttersPage />}
            />

            {/* 3 - البرجولات */}
            <Route
              path="/pergolas"
              element={<PergolasPage />}
            />

            {/* 4 - الهناجر */}
            <Route
              path="/warehouses"
              element={<WarehousesPage />}
            />

            {/* 5 - ساندوتش بانل */}
            <Route
              path="/sandwich-panel"
              element={<SandwichPanelPage />}
            />

            {/* 6 - الشبوك */}
            <Route
              path="/fencing"
              element={<FencingPage />}
            />

            {/* 7 - مظلات السيارات */}
            <Route
              path="/car-canopies"
              element={<CarCanopiesPage />}
            />

            {/* 8 - مظلات الحدائق */}
            <Route
              path="/garden-canopies"
              element={<GardenCanopiesPage />}
            />

            {/* =========================
                أي رابط غير موجود
            ========================= */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </Suspense>

        {/* أزرار الاتصال العائمة */}
        <FloatingButtons />

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;