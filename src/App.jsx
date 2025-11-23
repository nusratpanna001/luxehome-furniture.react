import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppRoutes from './routes';
import LoadingSpinner from './components/ui/LoadingSpinner';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </div>
  );
}

export default App;
