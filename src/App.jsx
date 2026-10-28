import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import PageShell from "@/components/layout/PageShell";
import { SITE } from "@/data/site.config";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ModelsPage = lazy(() => import("@/pages/ModelsPage"));
const ModelDetailPage = lazy(() => import("@/pages/ModelDetailPage"));
const SimulationPage = lazy(() => import("@/pages/SimulationPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function LoadingPage() {
  return <div className="page-loading" role="status" aria-label="Memuat halaman"><span /></div>;
}

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PageShell />,
      children: [
        { index: true, element: <Suspense fallback={<LoadingPage />}><HomePage /></Suspense> },
        { path: SITE.routes.models.slice(1), element: <Suspense fallback={<LoadingPage />}><ModelsPage /></Suspense> },
        { path: `${SITE.routes.models.slice(1)}/:slug`, element: <Suspense fallback={<LoadingPage />}><ModelDetailPage /></Suspense> },
        { path: SITE.routes.simulation.slice(1), element: <Suspense fallback={<LoadingPage />}><SimulationPage /></Suspense> },
        { path: SITE.routes.contact.slice(1), element: <Suspense fallback={<LoadingPage />}><ContactPage /></Suspense> },
        { path: "*", element: <Suspense fallback={<LoadingPage />}><NotFoundPage /></Suspense> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
