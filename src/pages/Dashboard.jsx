import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#060a14', paddingTop: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎯</div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Panel principal</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Elegí tu rol para continuar</p>
        <button onClick={() => navigate('/perfil')} style={{
          background: '#00e5ff', color: '#000', border: 'none',
          padding: '14px 32px', borderRadius: '10px', fontSize: '16px',
          fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>
          Elegir perfil →
        </button>
      </div>
    </div>
  )
}
