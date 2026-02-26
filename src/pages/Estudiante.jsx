import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const actividades = [
  {
    id: 1, titulo: 'Matemática: Sumas', tipo: 'ejercicio', emoji: '🔢',
    color: '#7c3aed', estado: 'pendiente', dificultad: 'fácil',
    desc: 'Practicamos sumas del 1 al 10 con dibujos',
  },
  {
    id: 2, titulo: 'Lectura: El zorro', tipo: 'lectura', emoji: '📚',
    color: '#00e5ff', estado: 'en progreso', dificultad: 'medio',
    desc: 'Leemos el cuento del zorro astuto con audio',
  },
  {
    id: 3, titulo: 'Ciencias: El agua', tipo: 'video', emoji: '💧',
    color: '#10b981', estado: 'completada', dificultad: 'fácil',
    desc: 'Aprendemos sobre el ciclo del agua',
  },
]

export default function Estudiante() {
  const navigate = useNavigate()
  const [actividadAbierta, setActividadAbierta] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#060a14', paddingTop: '72px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Saludo */}
        <div style={{ marginBottom: '40px', animation: 'fadeUp 0.5s ease forwards' }}>
          <p style={{ color: '#00e5ff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>MI ESPACIO</p>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
            ¡Hola! 👋
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Tenés {actividades.filter(a => a.estado !== 'completada').length} actividades para hacer hoy
          </p>
        </div>

        {/* Progreso general */}
        <div style={{
          background: '#111c30', border: '1px solid #1e2d47',
          borderRadius: '16px', padding: '24px 28px',
          marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '32px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: 600 }}>Mi progreso de hoy</span>
              <span style={{ color: '#00e5ff', fontWeight: 700 }}>1/3 completadas</span>
            </div>
            <div style={{ height: '10px', background: '#1e2d47', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: '33%',
                background: 'linear-gradient(90deg, #00e5ff, #7c3aed)',
                borderRadius: '999px',
              }} />
            </div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: '36px', fontWeight: 700, fontFamily: "'Space Mono', monospace", color: '#f59e0b' }}>⭐ 45</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>puntos</div>
          </div>
        </div>

        {/* Actividades */}
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Mis actividades</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {actividades.map((a, i) => (
            <div
              key={a.id}
              style={{
                background: '#111c30', border: '1px solid #1e2d47',
                borderRadius: '16px', padding: '24px 28px',
                display: 'flex', alignItems: 'center', gap: '20px',
                cursor: 'pointer', transition: 'all 0.2s',
                animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
                opacity: a.estado === 'completada' ? 0.7 : 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2d47'; e.currentTarget.style.transform = 'translateX(0)' }}
              onClick={() => setActividadAbierta(actividadAbierta === a.id ? null : a.id)}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: `${a.color}22`, border: `1.5px solid ${a.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', flexShrink: 0,
              }}>{a.emoji}</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>{a.titulo}</div>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>{a.desc}</p>
              </div>

              <div style={{
                padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, flexShrink: 0,
                background: a.estado === 'completada' ? 'rgba(16,185,129,0.2)'
                  : a.estado === 'en progreso' ? 'rgba(245,158,11,0.2)'
                  : 'rgba(100,116,139,0.2)',
                color: a.estado === 'completada' ? '#10b981'
                  : a.estado === 'en progreso' ? '#f59e0b'
                  : '#94a3b8',
              }}>
                {a.estado === 'completada' ? '✅ Completada' : a.estado === 'en progreso' ? '▶ En progreso' : '○ Pendiente'}
              </div>
            </div>
          ))}
        </div>

        {/* Motivación */}
        <div style={{
          marginTop: '40px',
          background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(124,58,237,0.1))',
          border: '1px solid rgba(0,229,255,0.2)',
          borderRadius: '16px', padding: '28px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌟</div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>¡Lo estás haciendo genial!</h3>
          <p style={{ color: '#94a3b8' }}>Seguí así y completá las actividades de hoy</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
