
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/Tooltip';
import AppProviders from '@/providers/AppProviders';
import { AppLayout } from './components/layout/AppLayout';
import routes from '@/components/App.routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  const renderRoutes = (routeConfigs: any[]) =>
    routeConfigs.map((route, index) =>
      route.index ? (
        <Route key={index} index element={route.element} />
      ) : route.children ? (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      ) : (
        <Route key={index} path={route.path} element={route.element} />
      )
    );

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProviders>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col w-full">
              <AppLayout>
                <Routes>{renderRoutes(routes)}</Routes>
              </AppLayout>
            </div>
          </TooltipProvider>
        </AppProviders>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
