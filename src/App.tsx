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
// «·’›Õ… «·—∆Ì”Ì…
// ===============================
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ===============================
// «·„Ÿ·« 
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
// «·”Ê« —
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
// «·»—ÃÊ·«  Ê«· ·»Ì”«  «·Œ‘»Ì…
// ===============================
const PergolasPage = lazy(
  () => import("./pages/PergolasPage")
);
const WoodCladdingPage = lazy(
  () => import("./pages/WoodCladdingPage")
);

// ===============================
// «· ﬂ”Ì« 
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
// «·Â‰«Ã—
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
// «·‘»Êﬂ
// ===============================
const FencingPage = lazy(
  () => import("./pages/FencingPage")
);
const BuildingFencingPage = lazy(
  () => import("./pages/BuildingFencingPage")
);

// ===============================
// «·ﬁ—«„Ìœ
// ===============================
const RoofingTilesPage = lazy(
  () => import("./pages/RoofingTilesPage")
);

// ===============================
// React Query
// ===============================

const queryClient = new QueryClient();

// ===============================
// ‘«‘… «· Õ„Ì·
// ===============================

const LoadingFallback = () => (
  <div
    dir="rtl"
    className="flex min-h-screen items-center justify-center bg-background"
  >
    <div className="text-center">
      <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />

      <p className="text-lg text-secondary">
        Ã«—Ì «· Õ„Ì·...
      </p>
    </div>
  </div>
);

// ===============================
// «· ÿ»Ìﬁ
// ===============================

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter basename="/rubou-albilad/">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>

            {/* =========================
                «·’›Õ… «·—∆Ì”Ì…
            ========================= */}

            <Route
              path="/"
              element={<Index />}
            />

            {/* =========================
                «·„Ÿ·« 
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
                «·”Ê« —
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
                «·»—ÃÊ·«  Ê«· ·»Ì”«  «·Œ‘»Ì…
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
                «· ﬂ”Ì« 
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
                «·Â‰«Ã—
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
                «·‘»Êﬂ
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
                «·ﬁ—«„Ìœ
            ========================= */}
            <Route
              path="/roofing-tiles"
              element={<RoofingTilesPage />}
            />

            {/* =========================
                √Ì —«»ÿ €Ì— „ÊÃÊœ
            ========================= */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </Suspense>

        {/* √“—«— «·« ’«· «·⁄«∆„… */}
        <FloatingButtons />

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

