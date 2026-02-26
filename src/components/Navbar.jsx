import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Inicio', path: '/' },
    { label: 'Docente', path: '/docente' },
    { label: 'Estudiante', path: '/estudiante' },
    { label: 'Familia', path: '/familia' },
    { label: 'Adaptador IA', path: '/adaptador' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '72px',
      background: scrolled ? 'rgba(6,10,20,0.95)' : 'rgba(6,10,20,0.7)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid #1e2d47' : '1px solid transparent',
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%',
      }}>
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '20px',
            fontWeight: 700,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          AURAL-IA
        </div>

        {/* Links desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {links.map(link => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                background: location.pathname === link.path
                  ? 'rgba(0,229,255,0.1)'
                  : 'transparent',
                border: 'none',
                color: location.pathname === link.path ? '#00e5ff' : '#94a3b8',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (location.pathname !== link.path) e.target.style.color = '#e2e8f0'
              }}
              onMouseLeave={e => {
                if (location.pathname !== link.path) e.target.style.color = '#94a3b8'
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => navigate('/perfil')}
            style={{
              marginLeft: '12px',
              background: '#00e5ff',
              color: '#000',
              border: 'none',
              padding: '9px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = '#33eaff'; e.target.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.target.style.background = '#00e5ff'; e.target.style.transform = 'translateY(0)' }}
          >
            Ingresar →
          </button>
        </div>
      </div>
    </nav>
  )
}
