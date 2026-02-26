import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { AdminAuthProvider } from './hooks/useAdminAuth';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPDFsPage from './pages/admin/AdminPDFsPage';
import AdminVideosPage from './pages/admin/AdminVideosPage';

// Root route with Layout wrapper (public pages)
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const coursesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/courses',
  component: CoursesPage,
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/video/$id',
  component: VideoPlayerPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

// Admin routes (no public Layout wrapper)
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const adminPDFsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/pdfs',
  component: AdminPDFsPage,
});

const adminVideosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/videos',
  component: AdminVideosPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  coursesRoute,
  videoRoute,
  aboutRoute,
  contactRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminPDFsRoute,
  adminVideosRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  );
}
