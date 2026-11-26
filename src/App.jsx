import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import { legalNotice, privacyPolicy, termsOfSale } from './data/legal'

// La page d'accueil est chargée tout de suite ; les autres pages sont
// téléchargées seulement quand le visiteur les ouvre.
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Box = lazy(() => import('./pages/Box'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="boutique" element={<Shop />} />
        <Route path="produit/:slug" element={<ProductDetail />} />
        <Route path="la-box" element={<Box />} />
        <Route path="contact" element={<Contact />} />
        <Route path="panier" element={<Cart />} />
        <Route path="commande" element={<Checkout />} />
        <Route path="connexion" element={<Login />} />
        <Route path="inscription" element={<Register />} />
        <Route path="mentions-legales" element={<LegalPage title="Mentions légales" sections={legalNotice} />} />
        <Route path="confidentialite" element={<LegalPage title="Politique de confidentialité" sections={privacyPolicy} />} />
        <Route path="cgv" element={<LegalPage title="Conditions générales de vente" sections={termsOfSale} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
