
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/FakeAuthContext';
import ProtectedRoutes from './Pages/ProtectedRoutes';



import CityList from './components/Citylist';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from "./components/SpinnerFullPage";
import { lazy, Suspense } from 'react';


const Homepage = lazy(() => import('./Pages/Homepage'));
const Product = lazy(() => import('./Pages/Product'));
const Pricing = lazy(() => import('./Pages/Pricing'));
const Login = lazy(() => import('./Pages/Login'));
const AppLayout = lazy(() => import('./Pages/AppLayout'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));




function App() {
  return (
    <div>

      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path='Product' element={<Product />} />
                <Route path='Pricing' element={<Pricing />} />

                <Route path='App' element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>}>
                  <Route index element={<Navigate replace to='cities' />} />
                  <Route path='cities' element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path='countries' element={<CountryList />} />
                  <Route path='form' element={<Form />} />

                </Route>

                <Route path='*' element={<PageNotFound />} />

                <Route path='Login' element={<Login />} />

              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>


    </div>
  )
}

export default App
