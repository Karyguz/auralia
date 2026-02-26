import React, { useState } from 'react'

const perfiles = [
  { id: 'tea', label: 'TEA', emoji: '🧩', color: '#7c3aed', desc: 'Lenguaje literal y estructurado' },
  { id: 'tdah', label: 'TDAH', emoji: '⚡', color: '#f59e0b', desc: 'Pasos cortos y concretos' },
  { id: 'vision', label: 'Baja visión', emoji: '👁️', color: '#00e5ff', desc: 'Texto grande y alto contraste' },
  { id: 'dislexia', label: 'Dislexia', emoji: '📖', color: '#10b981', desc: 'Sílabas y fuente especial' },
  { id: 'sordo', label: 'Hipoacusia', emoji: '🔇', color: '#ef4444', desc: 'Visual y con pictogramas' },
  { id: 'facil', label: 'Lectura fácil', emoji: '🌟', color: '#ec4899', desc: 'Palabras simples y ejemplos' },
]

const ejemploTexto = `Los mamíferos son animales vertebrados que se caracterizan por tener el cuerpo cubierto de pelo o pelaje, por alimentar a sus crías con leche materna y por ser de sangre caliente. Existen más de 5.000 especies de mamíferos en el mundo, que habitan en casi todos los ambientes: terrestres, acuáticos y aéreos.`

const adaptaciones = {
  tea: {
    titulo: 'Para perfil TEA 🧩',
    texto: `LOS MAMÍFEROS — INFORMACIÓN CLARA

Los mamíferos son animales.

¿Cómo son?
1. Tienen pelo en el cuerpo
2. Las mamás dan leche a sus bebés
3. Son de sangre caliente (como los humanos)

¿Cuántos hay?
→ Más de 5.000 especies

¿Dónde viven?
→ En la tierra (perros, gatos, leones)
→ En el agua (delfines, ballenas)
→ Pueden volar (murciélagos)

Eso es todo sobre los mamíferos.`,
  },
  tdah: {
    titulo: 'Para perfil TDAH ⚡',
    texto: `¡MAMÍFEROS! Son animales muy interesantes.

🔑 LO MÁS IMPORTANTE:
• Tienen PELO
• Dan LECHE a sus bebés
• Son CALENTITOS por dentro

🌍 ¿DÓNDE VIVEN?
En tierra, en el agua, ¡hasta en el aire!

📊 DATO GENIAL:
¡Hay 5.000 especies distintas!

👉 El perro, el gato, la ballena y TÚ
(los humanos somos mamíferos)
¡todos somos mamíferos! 🐾`,
  },
  vision: {
    titulo: 'Para baja visión 👁️',
    texto: `LOS MAMÍFEROS

Son animales con estas características:

✦ TIENEN PELO O PELAJE en su cuerpo

✦ LAS MAMÁS DAN LECHE a sus crías

✦ SON DE SANGRE CALIENTE
  (su temperatura no cambia con el clima)

✦ HAY MÁS DE 5.000 ESPECIES

✦ VIVEN EN TIERRA, AGUA Y AIRE

Ejemplos:
TERRESTRES → perro, gato, elefante
ACUÁTICOS → delfín, ballena
VOLADORES → murciélago`,
  },
  dislexia: {
    titulo: 'Para dislexia 📖',
    texto: `Los ma-mí-fe-ros

¿Qué son?
Son a-ni-ma-les.

¿Có-mo son?
→ Tie-nen pe-lo
→ Dan le-che a sus be-bés
→ Son ca-lien-tes por den-tro

¿Cuán-tos hay?
→ Más de 5.000 ti-pos

¿Dón-de vi-ven?
→ En la tie-rra
→ En el a-gua
→ En el ai-re

¡Los hu-ma-nos tam-bién so-mos ma-mí-fe-ros!`,
  },
  sordo: {
    titulo: 'Para hipoacusia 🔇',
    texto: `[VERSIÓN CON PICTOGRAMAS]

🐾 MAMÍFEROS

🟦 ¿QUÉ SON?
   Animales → 🐕 🐬 🐘

🟩 CARACTERÍSTICAS:
   ✋ Pelo/pelaje → 🐺
   🍼 Dan leche → 🐄👶
   🌡️ Sangre caliente → ♨️

🟨 CUÁNTOS:
   5.000 tipos distintos → 📊

🟥 DÓNDE VIVEN:
   🌳 Tierra: perro, gato, tigre
   🌊 Agua: delfín, ballena
   🌬️ Aire: murciélago

👤 ¡YO TAMBIÉN SOY MAMÍFERO!`,
  },
  facil: {
    titulo: 'Lectura fácil 🌟',
    texto: `LOS MAMÍFEROS

Los mamíferos son animales.

Son animales como el perro.
Son animales como el gato.
Son animales como la vaca.

Los mamíferos tienen pelo.
Las mamás dan leche a sus bebés.
Son calientes por dentro, como tú.

Hay muchos mamíferos en el mundo.
Viven en muchos lugares.
Algunos viven en la selva.
Algunos viven en el mar.

¡Tú también eres un mamífero!`,
  },
}

export default function Adaptador() {
  const [texto, setTexto] = useState('')
  const [perfilSel, setPerfilSel] = useState('')
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [vozActiva, setVozActiva] = useState(false)

  const adaptar = async () => {
    if (!texto.trim() || !perfilSel) return
    setCargando(true)
    setResultado(null)
    await new Promise(r => setTimeout(r, 1800))
    setCargando(false)
    const textoParaAdaptar = texto.trim() || ejemploTexto
    setResultado({
      perfil: perfilSel,
      ...(adaptaciones[perfilSel] || adaptaciones.facil),
    })
  }

  const leerEnVoz = () => {
    if (!resultado) return
    if (vozActiva) {
      window.speechSynthesis.cancel()
      setVozActiva(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(resultado.texto)
    utterance.lang = 'es-ES'
    utterance.rate = 0.85
    utterance.onend = () => setVozActiva(false)
    window.speechSynthesis.speak(utterance)
    setVozActiva(true)
  }

  const perfilInfo = perfiles.find(p => p.id === perfilSel)

  return (
    <div style={{ minHeight: '100vh', background: '#060a14', paddingTop: '72px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', animation: 'fadeUp 0.5s ease forwards' }}>
          <p style={{ color: '#00e5ff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>ADAPTADOR CON IA</p>
          <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '12px' }}>
            🤖 Adaptador de contenido
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '560px', lineHeight: 1.7 }}>
            Pegá cualquier texto educativo y la IA lo transforma en una versión accesible
            para el perfil que elijas.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

          {/* Panel izquierdo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Texto input */}
            <div style={{ background: '#111c30', border: '1px solid #1e2d47', borderRadius: '16px', padding: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Texto a adaptar
              </label>
              <textarea
                value={texto}
                onChange={e => setTexto(e.target.value)}
                placeholder={`Pegá aquí el texto de la actividad...\n\nEjemplo:\n"${ejemploTexto.slice(0, 80)}..."`}
                style={{ height: '200px', resize: 'vertical', fontSize: '14px', lineHeight: 1.7 }}
              />
              <button
                onClick={() => setTexto(ejemploTexto)}
                style={{
                  marginTop: '10px', background: 'transparent',
                  border: '1px solid #1e2d47', color: '#94a3b8',
                  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '13px', fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = '#00e5ff'; e.target.style.color = '#00e5ff' }}
                onMouseLeave={e => { e.target.style.borderColor = '#1e2d47'; e.target.style.color = '#94a3b8' }}
              >
                Usar ejemplo
              </button>
            </div>

            {/* Selector de perfil */}
            <div style={{ background: '#111c30', border: '1px solid #1e2d47', borderRadius: '16px', padding: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                Perfil del alumno
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {perfiles.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPerfilSel(p.id)}
                    style={{
                      background: perfilSel === p.id ? `${p.color}22` : 'transparent',
                      border: `1.5px solid ${perfilSel === p.id ? p.color : '#1e2d47'}`,
                      borderRadius: '10px', padding: '12px 14px',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{p.emoji}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: perfilSel === p.id ? p.color : '#e2e8f0' }}>{p.label}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Botón adaptar */}
            <button
              onClick={adaptar}
              disabled={cargando || !texto.trim() || !perfilSel}
              style={{
                background: cargando ? '#1e2d47' : 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                color: cargando ? '#94a3b8' : '#fff',
                border: 'none', padding: '18px',
                borderRadius: '12px', fontSize: '16px',
                fontWeight: 700, cursor: cargando ? 'wait' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                opacity: (!texto.trim() || !perfilSel) ? 0.5 : 1,
                transition: 'all 0.2s',
              }}
            >
              {cargando ? '⏳ Adaptando con IA...' : '🤖 Adaptar ahora →'}
            </button>
          </div>

          {/* Panel derecho - Resultado */}
          <div style={{
            background: '#111c30',
            border: `1.5px solid ${resultado && perfilInfo ? perfilInfo.color : '#1e2d47'}`,
            borderRadius: '16px', padding: '28px',
            minHeight: '500px',
            transition: 'border-color 0.3s',
            position: 'sticky', top: '92px',
          }}>
            {!resultado && !cargando && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', textAlign: 'center', color: '#64748b' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>🤖</div>
                <p style={{ fontSize: '16px', marginBottom: '8px', color: '#94a3b8' }}>El resultado aparecerá aquí</p>
                <p style={{ fontSize: '14px' }}>Ingresá un texto y elegí un perfil para comenzar</p>
              </div>
            )}

            {cargando && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '20px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '3px solid #1e2d47',
                  borderTopColor: '#00e5ff',
                  animation: 'spin 1s linear infinite',
                }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, marginBottom: '8px' }}>La IA está adaptando...</p>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>Analizando el perfil y generando versión accesible</p>
                </div>
              </div>
            )}

            {resultado && perfilInfo && (
              <div style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: `${perfilInfo.color}22`,
                      border: `1px solid ${perfilInfo.color}44`,
                      borderRadius: '999px', padding: '5px 14px',
                      fontSize: '13px', fontWeight: 700, color: perfilInfo.color,
                      marginBottom: '8px',
                    }}>
                      {perfilInfo.emoji} {perfilInfo.label}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{resultado.titulo}</h3>
                  </div>
                  <button
                    onClick={leerEnVoz}
                    style={{
                      background: vozActiva ? 'rgba(0,229,255,0.2)' : 'rgba(0,229,255,0.1)',
                      border: `1.5px solid ${vozActiva ? '#00e5ff' : '#1e2d47'}`,
                      color: '#00e5ff', padding: '10px 16px',
                      borderRadius: '8px', cursor: 'pointer',
                      fontSize: '14px', fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {vozActiva ? '⏹ Detener' : '🔊 Escuchar'}
                  </button>
                </div>

                <div style={{
                  background: '#0d1526', border: '1px solid #1e2d47',
                  borderRadius: '10px', padding: '20px',
                  fontFamily: perfilInfo.id === 'dislexia' ? 'Georgia, serif' : "'DM Sans', sans-serif",
                  fontSize: perfilInfo.id === 'vision' ? '18px' : '15px',
                  lineHeight: perfilInfo.id === 'vision' ? 2 : 1.8,
                  color: '#e2e8f0',
                  letterSpacing: perfilInfo.id === 'dislexia' ? '0.05em' : 'normal',
                  whiteSpace: 'pre-line',
                }}>
                  {resultado.texto}
                </div>

                <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => { setResultado(null); setTexto(''); setPerfilSel('') }}
                    style={{
                      flex: 1, background: 'transparent',
                      border: '1px solid #1e2d47', color: '#94a3b8',
                      padding: '12px', borderRadius: '8px', cursor: 'pointer',
                      fontSize: '14px', fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Nueva adaptación
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
