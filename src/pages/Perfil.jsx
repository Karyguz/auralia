import React from 'react'
import { useNavigate } from 'react-router-dom'

const roles = [
  {
    icon: '👩‍🏫',
    title: 'Soy docente',
    desc: 'Subí contenido y gestioná los perfiles de tus alumnos',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.25)',
    path: '/docente',
    features: ['Panel de alumnos', 'Subir actividades', 'Ver adaptaciones IA'],
  },
  {
    icon: '👧',
    title: 'Soy estudiante',
    desc: 'Accedé a tus actividades adaptadas para vos',
    color: '#00e5ff',
    glow: 'rgba(0,229,255,0.25)',
    path: '/estudiante',
    features: ['Actividades personalizadas', 'Audio y subtítulos', 'Mi progreso'],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Soy familiar',
    desc: 'Seguí el avance de tu hijo y conectate con la escuela',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
    path: '/familia',
    features: ['Ver progreso', 'Mensajes docente', 'Recursos en casa'],
  },
]

export default function Perfil() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh', background: '#060a14',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 60px',
    }}>
      <div style={{ maxWidth: '960px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeUp 0.5s ease forwards' }}>
          <h1 style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '16px' }}>
            ¿Quién sos?
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>
            Elegí tu rol para acceder a tu espacio personalizado
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {roles.map((r, i) => (
            <div
              key={i}
              onClick={() => navigate(r.path)}
              style={{
                background: '#111c30',
                border: '1.5px solid #1e2d47',
                borderRadius: '20px',
                padding: '40px 28px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                animation: `fadeUp 0.5s ease ${i * 0.12}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = r.color
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = `0 16px 48px ${r.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1e2d47'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '24px', display: 'block', textAlign: 'center' }}>
                {r.icon}
              </div>
              <h3 style={{
                fontSize: '22px', fontWeight: 700, color: r.color,
                marginBottom: '12px', textAlign: 'center',
              }}>{r.title}</h3>
              <p style={{
                color: '#94a3b8', fontSize: '15px', lineHeight: 1.6,
                textAlign: 'center', marginBottom: '28px',
              }}>{r.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {r.features.map((f, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    fontSize: '14px', color: '#64748b',
                  }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: r.color, flexShrink: 0,
                    }} />
                    {f}
                  </div>
                ))}
              </div>

              <div style={{
                background: r.color,
                color: r.color === '#00e5ff' ? '#000' : '#fff',
                padding: '12px',
                borderRadius: '10px',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: 700,
              }}>
                Entrar →
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
