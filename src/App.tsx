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
// المظلات
// ===============================
const CanopiesPage = lazy(
  () => import("./pages/CanopiesPage")
);
const CarCanopiesPage = lazy(
  () => import("./pages/CarCanopiesPage")
);
const GardenCanopiesPage = lazy(
  () => import("./pages/GardenCanopiesPage")
);
const SchoolCanopiesPage = lazy(
  () => import("./pages/SchoolCanopiesPage")
);
const FrenchArchCanopiesPage = lazy(
  () => import("./pages/FrenchArchCanopiesPage")
);
const PyramidalCarCanopiesPage = lazy(
  () => import("./pages/PyramidalCarCanopiesPage")
);

// ===============================
// السواتر
// ===============================
const ShuttersPage = lazy(
  () => import("./pages/ShuttersPage")
);
const LaserShuttersPage = lazy(
  () => import("./pages/LaserShuttersPage")
);
const FencingShuttersPage = lazy(
  () => import("./pages/FencingShuttersPage")
);

// ===============================
// البرجولات والتلبيسات الخشبية
// ===============================
const PergolasPage = lazy(
  () => import("./pages/PergolasPage")
);
const WoodCladdingPage = lazy(
  () => import("./pages/WoodCladdingPage")
);

// ===============================
// التكسيات
// ===============================
const CladdingPage = lazy(
  () => import("./pages/CladdingPage")
);
const CladdingFacadesPage = lazy(
  () => import("./pages/CladdingFacadesPage")
);
const DoorsPage = lazy(
  () => import("./pages/DoorsPage")
);

// ===============================
// الهناجر
// ===============================
const WarehousesPage = lazy(
  () => import("./pages/WarehousesPage")
);
const WarehousesDetailPage = lazy(
  () => import("./pages/WarehousesDetailPage")
);
const SandwichPanelPage = lazy(
  () => import("./pages/SandwichPanelPage")
);
const SandwichWarehousesPage = lazy(
  () => import("./pages/SandwichWarehousesPage")
);
const FabricHousesPage = lazy(
  () => import("./pages/FabricHousesPage")
);

// ===============================
// الشبوك
// ===============================
const FencingPage = lazy(
  () => import("./pages/FencingPage")
);
const BuildingFencingPage = lazy(
  () => import("./pages/BuildingFencingPage")
);

// ===============================
// القراميد
// ===============================
const RoofingTilesPage = lazy(
  () => import("./pages/RoofingTilesPage")
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
                المظلات
            ========================= */}
            <Route
              path="/canopies"
              element={<CanopiesPage />}
            />
            <Route
              path="/car-canopies"
              element={<CarCanopiesPage />}
            />
            <Route
              path="/garden-canopies"
              element={<GardenCanopiesPage />}
            />
            <Route
              path="/school-canopies"
              element={<SchoolCanopiesPage />}
            />
            <Route
              path="/french-arch-canopies"
              element={<FrenchArchCanopiesPage />}
            />
            <Route
              path="/pyramidal-car-canopies"
              element={<PyramidalCarCanopiesPage />}
            />

            {/* =========================
                السواتر
            ========================= */}
            <Route
              path="/shutters"
              element={<ShuttersPage />}
            />
            <Route
              path="/laser-shutters"
              element={<LaserShuttersPage />}
            />
            <Route
              path="/fencing-shutters"
              element={<FencingShuttersPage />}
            />

            {/* =========================
                البرجولات والتلبيسات الخشبية
            ========================= */}
            <Route
              path="/pergolas"
              element={<PergolasPage />}
            />
            <Route
              path="/wood-cladding"
              element={<WoodCladdingPage />}
            />

            {/* =========================
                التكسيات
            ========================= */}
            <Route
              path="/cladding"
              element={<CladdingPage />}
            />
            <Route
              path="/cladding-facades"
              element={<CladdingFacadesPage />}
            />
            <Route
              path="/doors"
              element={<DoorsPage />}
            />

            {/* =========================
                الهناجر
            ========================= */}
            <Route
              path="/warehouses"
              element={<WarehousesPage />}
            />
            <Route
              path="/warehouses-detail"
              element={<WarehousesDetailPage />}
            />
            <Route
              path="/sandwich-panel"
              element={<SandwichPanelPage />}
            />
            <Route
              path="/sandwich-warehouses"
              element={<SandwichWarehousesPage />}
            />
            <Route
              path="/fabric-houses"
              element={<FabricHousesPage />}
            />

            {/* =========================
                الشبوك
            ========================= */}
            <Route
              path="/fencing"
              element={<FencingPage />}
            />
            <Route
              path="/building-fencing"
              element={<BuildingFencingPage />}
            />

            {/* =========================
                القراميد
            ========================= */}
            <Route
              path="/roofing-tiles"
              element={<RoofingTilesPage />}
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

