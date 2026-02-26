import React, { useState } from 'react'

const mensajes = [
  { de: 'Docente', texto: 'Martina completó todas las actividades de matemática esta semana. ¡Excelente progreso!', hora: 'Ayer 15:30', mio: false },
  { de: 'Yo', texto: 'Muchas gracias! En casa también la vemos muy motivada. ¿Podemos hablar sobre las actividades de lectura?', hora: 'Ayer 16:10', mio: true },
  { de: 'Docente', texto: 'Por supuesto. La próxima semana comenzamos un nuevo módulo de lectura adaptado para ella.', hora: 'Hoy 09:15', mio: false },
]

export default function Familia() {
  const [tab, setTab] = useState('progreso')
  const [mensaje, setMensaje] = useState('')
  const [msgs, setMsgs] = useState(mensajes)

  const enviar = () => {
    if (!mensaje.trim()) return
    setMsgs([...msgs, { de: 'Yo', texto: mensaje, hora: 'Ahora', mio: true }])
    setMensaje('')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060a14', paddingTop: '72px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: '#10b981', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>PORTAL FAMILIAR</p>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Seguimiento de Martina 👧
          </h1>
          <p style={{ color: '#94a3b8' }}>Perfil: TEA · 3er grado</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', background: '#111c30', padding: '4px', borderRadius: '12px', width: 'fit-content' }}>
          {['progreso', 'mensajes'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: tab === t ? '#1e2d47' : 'transparent',
                color: tab === t ? '#e2e8f0' : '#94a3b8',
                border: 'none', padding: '10px 24px', borderRadius: '8px',
                cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {t === 'progreso' ? '📊 Progreso' : '💬 Mensajes'}
            </button>
          ))}
        </div>

        {/* PROGRESO */}
        {tab === 'progreso' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { label: 'Actividades completadas', value: '12', icon: '✅', color: '#10b981' },
                { label: 'Racha de días', value: '5 días', icon: '🔥', color: '#f59e0b' },
                { label: 'Progreso general', value: '78%', icon: '📈', color: '#7c3aed' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#111c30', border: '1px solid #1e2d47',
                  borderRadius: '16px', padding: '24px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: s.color, fontFamily: "'Space Mono', monospace", marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Actividades recientes */}
            <div style={{ background: '#111c30', border: '1px solid #1e2d47', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Actividades recientes</h3>
              {[
                { titulo: 'Matemática: Sumas', estado: 'Completada', nota: '⭐⭐⭐', fecha: 'Hoy' },
                { titulo: 'Lectura: El zorro', estado: 'En progreso', nota: '⭐⭐', fecha: 'Ayer' },
                { titulo: 'Ciencias: El agua', estado: 'Completada', nota: '⭐⭐⭐', fecha: 'Hace 2 días' },
              ].map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: i < 2 ? '1px solid #1e2d47' : 'none',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{a.titulo}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{a.fecha}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '16px' }}>{a.nota}</span>
                    <span style={{
                      padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                      background: a.estado === 'Completada' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                      color: a.estado === 'Completada' ? '#10b981' : '#f59e0b',
                    }}>{a.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MENSAJES */}
        {tab === 'mensajes' && (
          <div style={{ background: '#111c30', border: '1px solid #1e2d47', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Header del chat */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1e2d47', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px',
              }}>👩‍🏫</div>
              <div>
                <div style={{ fontWeight: 700 }}>Maestra Laura</div>
                <div style={{ fontSize: '13px', color: '#10b981' }}>● En línea</div>
              </div>
            </div>

            {/* Mensajes */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '300px' }}>
              {msgs.map((m, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: m.mio ? 'flex-end' : 'flex-start',
                }}>
                  {!m.mio && <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>{m.de}</div>}
                  <div style={{
                    background: m.mio ? '#7c3aed' : '#192338',
                    padding: '12px 16px', borderRadius: m.mio ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    maxWidth: '70%', fontSize: '15px', lineHeight: 1.6,
                  }}>
                    {m.texto}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{m.hora}</div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #1e2d47', display: 'flex', gap: '12px' }}>
              <input
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && enviar()}
                placeholder="Escribí un mensaje..."
                style={{ flex: 1 }}
              />
              <button
                onClick={enviar}
                style={{
                  background: '#10b981', color: '#fff', border: 'none',
                  padding: '12px 20px', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: 700, fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Enviar →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
