import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Landing from './pages/Landing.jsx';
import ProblemList from './pages/ProblemList.jsx';
import ProblemDetail from './pages/ProblemDetail.jsx';
import TopicPage from './pages/TopicPage.jsx';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,             element: <Landing /> },
      { path: 'problems',        element: <ProblemList /> },
      { path: 'problems/:slug',  element: <ProblemDetail /> },
      { path: 'topics',          element: <Landing /> },
      { path: 'topics/:topicId', element: <TopicPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
