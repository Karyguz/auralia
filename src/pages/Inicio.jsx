import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const perfiles = [
  { emoji: '🧩', label: 'TEA', color: '#7c3aed', desc: 'Trastorno del espectro autista' },
  { emoji: '⚡', label: 'TDAH', color: '#f59e0b', desc: 'Déficit de atención e hiperactividad' },
  { emoji: '👁️', label: 'Baja visión', color: '#00e5ff', desc: 'Adaptación visual y alto contraste' },
  { emoji: '🔇', label: 'Hipoacusia', color: '#ef4444', desc: 'Lengua de señas y subtítulos' },
  { emoji: '📖', label: 'Dislexia', color: '#10b981', desc: 'Fuentes y espaciado adaptado' },
  { emoji: '🌟', label: 'Lectura fácil', color: '#ec4899', desc: 'Lenguaje simple y visual' },
]

const stats = [
  { value: '6', label: 'Perfiles de neurodiversidad' },
  { value: '∞', label: 'Adaptaciones con IA' },
  { value: '3', label: 'Roles: docente, familia, alumno' },
  { value: '100%', label: 'Accesible e inclusivo' },
]

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#060a14', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background gradient orbs */}
        <div style={{
          position: 'absolute', top: '15%', left: '60%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(30,45,71,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(30,45,71,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '680px', animation: 'fadeUp 0.7s ease forwards' }}>
            
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,229,255,0.1)',
              border: '1px solid rgba(0,229,255,0.25)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '32px',
              fontSize: '13px',
              color: '#00e5ff',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00e5ff', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
              PLATAFORMA EDUCATIVA INCLUSIVA CON IA
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 5vw, 68px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '24px',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '-1px',
            }}>
              Educación que{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                se adapta
              </span>
              {' '}a cada niño
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#94a3b8',
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '520px',
            }}>
              AURAL-IA usa inteligencia artificial para transformar cualquier contenido educativo 
              en versiones accesibles para niños con TEA, TDAH, dislexia, baja visión e hipoacusia.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/perfil')}
                style={{
                  background: '#00e5ff',
                  color: '#000',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                  boxShadow: '0 8px 32px rgba(0,229,255,0.25)',
                }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 12px 40px rgba(0,229,255,0.4)' }}
                onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px rgba(0,229,255,0.25)' }}
              >
                Comenzar ahora →
              </button>
              <button
                onClick={() => navigate('/adaptador')}
                style={{
                  background: 'transparent',
                  color: '#e2e8f0',
                  border: '1.5px solid #1e2d47',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = '#00e5ff'; e.target.style.color = '#00e5ff'; e.target.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.target.style.borderColor = '#1e2d47'; e.target.style.color = '#e2e8f0'; e.target.style.transform = 'translateY(0)' }}
              >
                Ver Adaptador IA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '60px 0', borderTop: '1px solid #1e2d47', borderBottom: '1px solid #1e2d47' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px', fontWeight: 700, fontFamily: "'Space Mono', monospace",
                  background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                }}>{s.value}</div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFILES */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              fontSize: '12px', fontWeight: 700, letterSpacing: '2px',
              color: '#00e5ff', marginBottom: '16px', textTransform: 'uppercase',
            }}>PERFILES ATENDIDOS</div>
            <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '16px' }}>
              Una plataforma para todos
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
              La IA detecta el perfil de cada alumno y adapta automáticamente el contenido
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {perfiles.map((p, i) => (
              <div
                key={i}
                style={{
                  background: '#111c30',
                  border: '1px solid #1e2d47',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = p.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}22`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e2d47'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{p.emoji}</div>
                <div style={{
                  fontWeight: 700, fontSize: '20px', marginBottom: '8px',
                  color: p.color,
                }}>{p.label}</div>
                <div style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section style={{ padding: '80px 0', background: '#0d1526' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.5px' }}>
              Tres vistas, una plataforma
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: '👩‍🏫', label: 'Docente', desc: 'Subí actividades y la IA las adapta para cada alumno según su perfil.', color: '#7c3aed', path: '/docente' },
              { icon: '👧', label: 'Estudiante', desc: 'Actividades pensadas para mí, con el apoyo que necesito para aprender.', color: '#00e5ff', path: '/estudiante' },
              { icon: '👨‍👩‍👧', label: 'Familia', desc: 'Seguí el progreso de tu hijo y mantené contacto con la docente.', color: '#10b981', path: '/familia' },
            ].map((r, i) => (
              <div
                key={i}
                onClick={() => navigate(r.path)}
                style={{
                  background: '#111c30',
                  border: '1px solid #1e2d47',
                  borderRadius: '16px',
                  padding: '40px 32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'center',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = r.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e2d47'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{r.icon}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: r.color, marginBottom: '12px' }}>{r.label}</div>
                <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '15px', marginBottom: '24px' }}>{r.desc}</p>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 20px', borderRadius: '8px',
                  border: `1.5px solid ${r.color}`,
                  color: r.color, fontSize: '14px', fontWeight: 600,
                }}>
                  Entrar →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '20px' }}>
            ¿Listo para comenzar?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
            Elegí tu perfil y accedé a la plataforma
          </p>
          <button
            onClick={() => navigate('/perfil')}
            style={{
              background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
              color: '#fff',
              border: 'none',
              padding: '18px 48px',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
              boxShadow: '0 8px 32px rgba(0,229,255,0.2)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 16px 48px rgba(0,229,255,0.35)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px rgba(0,229,255,0.2)' }}
          >
            Comenzar ahora →
          </button>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #1e2d47', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        AURAL-IA — Educación inclusiva con inteligencia artificial · 2024
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
