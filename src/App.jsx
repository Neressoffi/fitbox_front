import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Box from './pages/Box'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'
import { legalNotice, privacyPolicy, termsOfSale } from './data/legal'

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
