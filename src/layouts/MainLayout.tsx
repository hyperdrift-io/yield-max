import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />

      {/* Gradient blurs for visual appeal */}
      <div className="blur-background blur-primary" />
      <div className="blur-background blur-secondary" />
    </div>
  )
}

export default MainLayout
