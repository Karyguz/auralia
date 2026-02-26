import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const alumnos = [
  { id: 1, nombre: 'Martina G.', perfil: 'TEA', emoji: '🧩', color: '#7c3aed', progreso: 78, ultima: 'Hoy', actividades: 5 },
  { id: 2, nombre: 'Tomás R.', perfil: 'TDAH', emoji: '⚡', color: '#f59e0b', progreso: 65, ultima: 'Ayer', actividades: 3 },
  { id: 3, nombre: 'Valeria M.', perfil: 'Baja visión', emoji: '👁️', color: '#00e5ff', progreso: 90, ultima: 'Hoy', actividades: 7 },
  { id: 4, nombre: 'Bruno P.', perfil: 'Dislexia', emoji: '📖', color: '#10b981', progreso: 55, ultima: 'Hace 3 días', actividades: 2 },
  { id: 5, nombre: 'Lucía F.', perfil: 'Hipoacusia', emoji: '🔇', color: '#ef4444', progreso: 82, ultima: 'Hoy', actividades: 6 },
]

const actividadesEjemplo = [
  { titulo: 'Matemática: Sumas', adaptaciones: 5, fecha: 'Hoy', estado: 'activa' },
  { titulo: 'Lectura: El zorro', adaptaciones: 5, fecha: 'Ayer', estado: 'activa' },
  { titulo: 'Ciencias: El agua', adaptaciones: 3, fecha: '3 días', estado: 'borrador' },
]

export default function Docente() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('alumnos')
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [exito, setExito] = useState(false)

  const handleSubir = async () => {
    if (!titulo.trim() || !contenido.trim()) return
    setSubiendo(true)
    await new Promise(r => setTimeout(r, 2000))
    setSubiendo(false)
    setExito(true)
    setTitulo('')
    setContenido('')
    setTimeout(() => { setExito(false); setTab('actividades') }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060a14', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <p style={{ color: '#7c3aed', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>PANEL DOCENTE</p>
            <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.5px' }}>Bienvenida 👩‍🏫</h1>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>Tenés {alumnos.length} alumnos activos</p>
          </div>
          <button
            onClick={() => navigate('/adaptador')}
            style={{
              background: '#00e5ff', color: '#000', border: 'none',
              padding: '12px 24px', borderRadius: '10px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            🤖 Adaptador IA
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', background: '#111c30', padding: '4px', borderRadius: '12px', width: 'fit-content' }}>
          {['alumnos', 'actividades', 'subir'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: tab === t ? '#1e2d47' : 'transparent',
                color: tab === t ? '#e2e8f0' : '#94a3b8',
                border: 'none', padding: '10px 20px', borderRadius: '8px',
                cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {t === 'subir' ? '+ Subir actividad' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ALUMNOS */}
        {tab === 'alumnos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {alumnos.map((a, i) => (
              <div key={a.id} style={{
                background: '#111c30', border: '1px solid #1e2d47', borderRadius: '16px',
                padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '24px',
                transition: 'all 0.2s', animation: `fadeUp 0.4s ease ${i * 0.08}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2d47'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `${a.color}22`, border: `1.5px solid ${a.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', flexShrink: 0,
                }}>{a.emoji}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '17px' }}>{a.nombre}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: '999px', fontSize: '12px',
                      fontWeight: 600, background: `${a.color}22`, color: a.color,
                      border: `1px solid ${a.color}44`,
                    }}>{a.perfil}</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '13px' }}>
                    {a.actividades} actividades · Última conexión: {a.ultima}
                  </p>
                </div>

                {/* Barra de progreso */}
                <div style={{ width: '160px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Progreso</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: a.color }}>{a.progreso}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#1e2d47', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${a.progreso}%`,
                      background: a.color, borderRadius: '999px',
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVIDADES */}
        {tab === 'actividades' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {actividadesEjemplo.map((act, i) => (
              <div key={i} style={{
                background: '#111c30', border: '1px solid #1e2d47', borderRadius: '16px',
                padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '17px', marginBottom: '6px' }}>{act.titulo}</h3>
                  <p style={{ color: '#64748b', fontSize: '13px' }}>
                    {act.adaptaciones} adaptaciones generadas · Subida: {act.fecha}
                  </p>
                </div>
                <div style={{
                  padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                  background: act.estado === 'activa' ? 'rgba(16,185,129,0.2)' : 'rgba(100,116,139,0.2)',
                  color: act.estado === 'activa' ? '#10b981' : '#94a3b8',
                  border: `1px solid ${act.estado === 'activa' ? '#10b98144' : '#1e2d47'}`,
                }}>
                  {act.estado}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBIR */}
        {tab === 'subir' && (
          <div style={{ maxWidth: '680px' }}>
            <div style={{ background: '#111c30', border: '1px solid #1e2d47', borderRadius: '20px', padding: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Subir nueva actividad</h2>
              <p style={{ color: '#94a3b8', marginBottom: '32px' }}>La IA va a generar adaptaciones para cada perfil automáticamente</p>

              <div style={{ marginBottom: '20px' }}>
                <label>Título de la actividad</label>
                <input
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  placeholder="Ej: Matemática — Sumas hasta el 10"
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label>Contenido de la actividad</label>
                <textarea
                  value={contenido}
                  onChange={e => setContenido(e.target.value)}
                  placeholder="Escribí o pegá aquí el texto de la actividad que querés adaptar..."
                  style={{ height: '180px', resize: 'vertical' }}
                />
              </div>

              {exito && (
                <div style={{
                  background: 'rgba(16,185,129,0.15)', border: '1px solid #10b98144',
                  borderRadius: '10px', padding: '16px', marginBottom: '20px',
                  color: '#10b981', fontWeight: 600, textAlign: 'center',
                }}>
                  ✅ ¡Actividad subida! La IA generó 5 adaptaciones.
                </div>
              )}

              <button
                onClick={handleSubir}
                disabled={subiendo || !titulo || !contenido}
                style={{
                  width: '100%',
                  background: subiendo ? '#1e2d47' : '#7c3aed',
                  color: '#fff', border: 'none',
                  padding: '16px', borderRadius: '10px',
                  fontSize: '16px', fontWeight: 700, cursor: subiendo ? 'wait' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                  opacity: (!titulo || !contenido) ? 0.5 : 1,
                }}
              >
                {subiendo ? '⏳ La IA está generando adaptaciones...' : '🤖 Subir y adaptar con IA →'}
              </button>
            </div>
          </div>
        )}
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
