import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './layout/ProtectedRoute';
import { ToastProvider } from './components/ToastProvider';
import protectedRoutes from './route/ProtectedRoute';
import publicRoutes from './route/PublicRoute';

const App: React.FC = () => {
  const protectedRouteElements = useMemo(
    () =>
      protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <AppLayout>{element}</AppLayout>
            </ProtectedRoute>
          }
        />
      )),
    [protectedRoutes],
  );

  const publicRouteElements = useMemo(
    () =>
      publicRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />),
    [publicRoutes],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {publicRouteElements}
            {protectedRouteElements}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
