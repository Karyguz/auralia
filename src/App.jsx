import { useState, useEffect, useRef } from "react"

// ─── DISCIPLINAS DEL PROGRAMA URUGUAYO ───
const DISCIPLINAS = {
  "Educación Inicial y Primaria": [
    "Lengua Española", "Matemática", "Ciencias Sociales", "Ciencias Naturales",
    "Educación Artística", "Educación Física", "Inglés", "Tecnología e Informática"
  ],
  "Educación Media Básica": [
    "Español", "Matemática", "Historia", "Geografía", "Biología",
    "Física", "Química", "Inglés", "Educación Visual y Plástica",
    "Música", "Educación Física", "Tecnología"
  ],
  "Educación Media Superior": [
    "Literatura", "Matemática", "Historia Reciente", "Geografía",
    "Biología", "Física", "Química", "Filosofía", "Sociología", "Inglés"
  ]
}

const PERFILES_DUA = [
  { id: "tdah", label: "TDAH", color: "#FF9F43", desc: "Actividades cortas, cronómetros, instrucciones directas" },
  { id: "cea", label: "CEA - Condición del Espectro Autista", color: "#A29BFE", desc: "Pictogramas, rutinas visuales, lenguaje literal" },
  { id: "dislexia", label: "Dislexia", color: "#FD79A8", desc: "Fuente OpenDyslexic, espaciado, soporte audio" },
  { id: "baja_vision", label: "Persona con disminución significativa de la capacidad visual", color: "#74B9FF", desc: "Alto contraste, fuente grande, audio descripción" },
  { id: "ceguera", label: "Persona no vidente", color: "#55EFC4", desc: "Lector pantalla, síntesis de voz, navegación teclado" },
  { id: "hipoacusia", label: "Persona con disminución significativa de la capacidad auditiva", color: "#FDCB6E", desc: "Subtítulos, alertas visuales, glosario ilustrado" },
  { id: "sorda", label: "Persona sorda", color: "#FF7675", desc: "Lengua de señas, contenido visual, sin dependencia del audio" },
  { id: "di", label: "Discapacidad Intelectual", color: "#00FFA0", desc: "Lectura fácil, pictogramas, instrucciones paso a paso" },
]

// ─── CLAUDE API CALL ───
async function callClaude(messages, system = "") {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages,
    }),
  })
  const data = await response.json()
  return data.content?.[0]?.text || "Error al conectar con la IA."
}

// ─── WAVE LOGO ───
function WaveLogo({ size = 20 }) {
  const s = size
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 12 Q6 7 9 12 Q12 17 15 12 Q18 7 21 12" stroke="#080810" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 17 Q8 14 10 17" stroke="#080810" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 7 Q16 4 18 7" stroke="#080810" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

// ─── MODAL DOCENTE ───
function ModalDocente({ onClose }) {
  const [step, setStep] = useState(1) // 1=config, 2=preview
  const [perfilSel, setPerfilSel] = useState(null)
  const [nivelSel, setNivelSel] = useState("")
  const [disciplinaSel, setDisciplinaSel] = useState("")
  const [texto, setTexto] = useState("")
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState("")
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) {
      setFileName(f.name)
      const reader = new FileReader()
      reader.onload = (ev) => setTexto(ev.target.result.slice(0, 3000))
      reader.readAsText(f)
    }
  }

  const handleAdaptar = async () => {
    if (!perfilSel || !texto.trim()) return
    setLoading(true)
    setStep(2)
    const perfil = PERFILES_DUA.find(p => p.id === perfilSel)
    const system = `Sos AuralIA, un sistema experto en adaptación pedagógica inclusiva. Tu función es transformar materiales educativos respetando los siguientes marcos de referencia obligatorios:

MARCOS DE REFERENCIA (no negociables):
1. DISEÑO UNIVERSAL PARA EL APRENDIZAJE (DUA): Aplicás los 3 principios — múltiples medios de representación, múltiples medios de acción y expresión, múltiples medios de implicación. Nunca adaptás para "bajar el nivel", sino para ampliar el acceso.
2. PROGRAMA EDUCATIVO URUGUAYO OFICIAL (ANEP/CEIP/CES): Respetás los objetivos curriculares, competencias y contenidos del nivel indicado. Las adaptaciones mantienen la exigencia académica del programa.
3. CONVENCIÓN ONU SOBRE DERECHOS DE PERSONAS CON DISCAPACIDAD: Partís del modelo social de la discapacidad — las barreras son del entorno, no de la persona. El estudiante tiene plena capacidad de aprender cuando se eliminan esas barreras.
4. ENFOQUE DE NEURODIVERSIDAD: La neurodiversidad es una variación natural del ser humano, no un déficit ni una enfermedad. Usás siempre lenguaje de potencial, fortalezas y posibilidades.

RESTRICCIONES ABSOLUTAS — NUNCA HARÁS:
- Usar lenguaje médico, clínico o de déficit ("padece", "sufre", "problema", "trastorno", "discapacitado/a").
- Asumir que el estudiante no puede aprender algo — solo que necesita otro camino de acceso.
- Emitir diagnósticos, etiquetas clínicas ni recomendaciones terapéuticas.
- Recomendar actividades por debajo del nivel curricular sin justificación pedagógica explícita.
- Inventar información, citar fuentes inexistentes ni afirmar certezas sin datos suficientes.
- Generalizar perfiles ("todos los niños con TDAH...") — cada estudiante es único.
- Sugerir que la familia debe buscar tratamiento médico o psicológico.

TERMINOLOGÍA CORRECTA OBLIGATORIA:
- "CEA (Condición del Espectro Autista)" — nunca "autista" como etiqueta aislada.
- "Persona con disminución significativa de la capacidad visual/auditiva" para baja visión/audición.
- "Persona sorda" o "Persona no vidente" solo cuando corresponde al perfil seleccionado.
- Siempre persona primero: "estudiante con TDAH", "persona con dislexia".
- "Diversidad funcional", "neurodiversidad", "barreras de acceso" — nunca "limitación" ni "déficit".

CALIDAD Y PRECISIÓN:
- Solo devolvés información pedagógica verificable y basada en evidencia.
- Si el material es insuficiente para hacer una adaptación correcta, lo indicás claramente.
- Revisás internamente cada respuesta para asegurar coherencia, precisión pedagógica y lenguaje respetuoso antes de entregarla.
- Respondés siempre en español rioplatense, con lenguaje claro, cálido y profesional.`
    const prompt = `Adaptá el siguiente material educativo para un estudiante con ${perfil.label}.
${disciplinaSel ? `Disciplina: ${disciplinaSel} (Programa uruguayo - ${nivelSel})` : ""}

PRINCIPIOS DUA A APLICAR: ${perfil.desc}

MATERIAL ORIGINAL:
${texto}

Generá la versión adaptada con:
1. Título claro
2. Objetivos simplificados
3. Contenido adaptado al perfil
4. Actividades sugeridas
5. Recursos adicionales recomendados`

    const res = await callClaude([{ role: "user", content: prompt }], system)
    setResultado(res)
    setLoading(false)
  }

  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...styles.modal, maxWidth: '780px' }}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <span style={styles.sectionLabel}>Panel Docente</span>
            <h2 style={styles.modalTitle}>Adaptador de Materiales</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* PERFIL DEL ESTUDIANTE */}
            <div>
              <label style={styles.label}>1. Perfil del estudiante (DUA)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {PERFILES_DUA.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPerfilSel(p.id)}
                    style={{
                      ...styles.tag,
                      borderColor: perfilSel === p.id ? p.color : 'rgba(255,255,255,0.12)',
                      background: perfilSel === p.id ? `${p.color}18` : 'transparent',
                      color: perfilSel === p.id ? p.color : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {perfilSel && (
                <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                  ✦ {PERFILES_DUA.find(p => p.id === perfilSel)?.desc}
                </p>
              )}
            </div>

            {/* DISCIPLINA */}
            <div>
              <label style={styles.label}>2. Disciplina (Programa Educativo Uruguayo)</label>
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
                <select
                  value={nivelSel}
                  onChange={e => { setNivelSel(e.target.value); setDisciplinaSel("") }}
                  style={styles.select}
                >
                  <option value="">Nivel educativo...</option>
                  {Object.keys(DISCIPLINAS).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                {nivelSel && (
                  <select value={disciplinaSel} onChange={e => setDisciplinaSel(e.target.value)} style={styles.select}>
                    <option value="">Disciplina...</option>
                    {DISCIPLINAS[nivelSel].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                )}
              </div>
            </div>

            {/* MATERIAL */}
            <div>
              <label style={styles.label}>3. Material a adaptar</label>
              <div
                style={styles.dropzone}
                onClick={() => fileRef.current.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); fileRef.current.files = e.dataTransfer.files; handleFile({ target: { files: e.dataTransfer.files } }) }}
              >
                <input ref={fileRef} type="file" accept=".txt,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFile} />
                {fileName
                  ? <><span style={{ color: '#00FFA0', fontSize: '1.5rem' }}>📄</span><span style={{ color: '#00FFA0', fontWeight: 600 }}>{fileName}</span></>
                  : <><span style={{ fontSize: '2rem', opacity: 0.4 }}>📁</span><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Arrastrá o hacé click para subir PDF, Word o TXT</span></>
                }
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={{ ...styles.label, fontSize: '0.75rem', marginBottom: '6px' }}>O pegá el texto directamente:</label>
                <textarea
                  value={texto}
                  onChange={e => setTexto(e.target.value)}
                  placeholder="Pegá aquí el contenido del material educativo..."
                  style={styles.textarea}
                  rows={5}
                />
              </div>
            </div>

            <button
              onClick={handleAdaptar}
              disabled={!perfilSel || !texto.trim()}
              style={{
                ...styles.btnPrimary,
                opacity: (!perfilSel || !texto.trim()) ? 0.4 : 1,
                cursor: (!perfilSel || !texto.trim()) ? 'not-allowed' : 'pointer',
              }}
            >
              ✦ Adaptar con IA →
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={styles.sectionLabel}>Material Adaptado</span>
              <button onClick={() => { setStep(1); setResultado("") }} style={styles.backBtn}>← Volver</button>
            </div>

            {loading ? (
              <div style={styles.loadingBox}>
                <div style={styles.spinner} />
                <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '16px', fontSize: '0.9rem' }}>
                  La IA está adaptando el material...
                </p>
              </div>
            ) : (
              <div style={styles.resultBox}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                  {resultado}
                </pre>
              </div>
            )}

            {!loading && resultado && (
              <button
                onClick={() => navigator.clipboard.writeText(resultado)}
                style={{ ...styles.btnGhost, alignSelf: 'flex-start' }}
              >
                📋 Copiar material adaptado
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MODAL PERFIL ESTUDIANTE ───
function ModalPerfil({ onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [perfilDetectado, setPerfilDetectado] = useState(null)
  const bottomRef = useRef()

  const SYSTEM = `Sos AuralIA, una IA especializada en educación inclusiva con enfoque de derechos. Tu tarea es conversar con docentes o familias para comprender las necesidades educativas de un estudiante y orientar sus adaptaciones pedagógicas.

CÓMO INTERACTUAR:
- Hacé UNA sola pregunta por turno, de forma amable, clara y sin tecnicismos.
- Escuchá activamente y reformulá lo que entendés antes de seguir preguntando.
- Después de 4 a 6 intercambios con información suficiente, presentá el perfil detectado.
- Si no tenés suficiente información, seguí preguntando con naturalidad.

MARCOS QUE GUÍAN TUS RESPUESTAS (obligatorios):
1. DUA (Diseño Universal para el Aprendizaje): tus recomendaciones siempre amplían el acceso, nunca reducen la exigencia curricular.
2. Convención ONU sobre Derechos de Personas con Discapacidad: modelo social, no médico. Las barreras están en el entorno.
3. Enfoque de neurodiversidad: variación humana natural, no déficit. Lenguaje de fortalezas y potencial siempre.
4. Programa educativo uruguayo (ANEP): las recomendaciones son compatibles con el currículo oficial.

RESTRICCIONES ABSOLUTAS:
- NUNCA emitir diagnósticos clínicos ni sugerir que el estudiante "tiene" una condición.
- NUNCA usar lenguaje de déficit: "no puede", "le falta", "padece", "sufre", "problema".
- NUNCA recomendar tratamientos médicos, psicológicos ni farmacológicos.
- NUNCA asumir limitaciones — solo identificar barreras de acceso y formas de removerlas.
- NUNCA generalizar: cada estudiante es único aunque comparta características con otros.
- NUNCA inventar datos ni afirmar certezas sin respaldo en lo que la persona te contó.

TERMINOLOGÍA CORRECTA:
- "CEA (Condición del Espectro Autista)" — nunca solo "autismo" como etiqueta.
- "Persona con disminución significativa de la capacidad visual/auditiva".
- "Persona sorda" / "Persona no vidente" cuando corresponde al perfil.
- Siempre persona primero: "estudiante con TDAH", "persona con dislexia".

CUANDO TENGAS SUFICIENTE INFORMACIÓN, respondé con este formato exacto:
PERFIL_DETECTADO: [nombre del perfil según terminología correcta]
RECOMENDACIONES: [3 a 5 recomendaciones pedagógicas concretas, basadas en DUA y el programa uruguayo]
RESUMEN: [síntesis breve de las necesidades de acceso del estudiante, en lenguaje de fortalezas]

Perfiles posibles: TDAH, CEA (Condición del Espectro Autista), Dislexia, Persona con disminución significativa de la capacidad visual, Persona no vidente, Persona con disminución significativa de la capacidad auditiva, Persona sorda, Discapacidad Intelectual, Sin perfil específico identificado.`

  const iniciar = async () => {
    setStarted(true)
    setLoading(true)
    const primerMensaje = await callClaude(
      [{ role: "user", content: "Hola, quiero que me ayudes a entender el perfil de aprendizaje de mi estudiante." }],
      SYSTEM
    )
    setMessages([
      { role: "user", content: "Hola, quiero que me ayudes a entender el perfil de aprendizaje de mi estudiante." },
      { role: "assistant", content: primerMensaje }
    ])
    setLoading(false)
  }

  const enviar = async () => {
    if (!input.trim() || loading) return
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const respuesta = await callClaude(newMessages, SYSTEM)
    const updated = [...newMessages, { role: "assistant", content: respuesta }]
    setMessages(updated)

    // Detectar si la IA determinó el perfil
    if (respuesta.includes("PERFIL_DETECTADO:")) {
      const match = respuesta.match(/PERFIL_DETECTADO:\s*(.+)/)
      if (match) setPerfilDetectado(match[1].trim())
    }
    setLoading(false)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const formatMsg = (text) => {
    // Resaltar secciones del perfil detectado
    if (text.includes("PERFIL_DETECTADO:")) {
      return text
        .replace(/PERFIL_DETECTADO:/g, "🎯 **Perfil detectado:**")
        .replace(/RECOMENDACIONES:/g, "📋 **Recomendaciones:**")
        .replace(/RESUMEN:/g, "📝 **Resumen:**")
    }
    return text
  }

  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...styles.modal, maxWidth: '620px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <span style={styles.sectionLabel}>Análisis de Perfil</span>
            <h2 style={styles.modalTitle}>IA Detectora de Perfil</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {perfilDetectado && (
          <div style={styles.perfilBanner}>
            <span style={{ fontSize: '1.2rem' }}>🎯</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Perfil detectado</div>
              <div style={{ fontWeight: 700, color: '#00FFA0', fontSize: '1rem' }}>{perfilDetectado}</div>
            </div>
          </div>
        )}

        {/* Chat area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 4px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!started ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px', padding: '40px' }}>
              <div style={{ fontSize: '3rem' }}>🧩</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800 }}>
                Análisis de Perfil con IA
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: '0.95rem', maxWidth: '360px' }}>
                La IA va a hacerte preguntas sobre el estudiante para detectar su perfil y darte recomendaciones pedagógicas personalizadas basadas en DUA.
              </p>
              <button onClick={iniciar} style={styles.btnPrimary}>
                Comenzar análisis →
              </button>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: m.role === 'user' ? 'linear-gradient(135deg, #00FFA0, #00C27C)' : 'rgba(255,255,255,0.06)',
                    color: m.role === 'user' ? '#080810' : 'rgba(255,255,255,0.85)',
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    fontWeight: m.role === 'user' ? 600 : 400,
                    border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {formatMsg(m.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={styles.typingDots}>
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Input */}
        {started && (
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && enviar()}
              placeholder="Contame sobre el estudiante..."
              style={styles.chatInput}
              disabled={loading}
            />
            <button onClick={enviar} disabled={loading || !input.trim()} style={{ ...styles.btnPrimary, padding: '12px 20px', opacity: loading || !input.trim() ? 0.4 : 1 }}>
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── STYLES ───
const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    width: '100%',
    background: 'rgba(10,10,20,0.98)',
    border: '1px solid rgba(0,255,160,0.15)',
    borderRadius: '24px',
    padding: '36px',
    boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(0,255,160,0.06)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: '28px',
  },
  modalTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.6rem',
    letterSpacing: '-0.02em', color: '#fff',
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.5)', borderRadius: '50%', width: '36px', height: '36px',
    cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  sectionLabel: {
    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: '#00FFA0', display: 'block', marginBottom: '4px',
  },
  label: {
    fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.04em', marginBottom: '10px', display: 'block',
  },
  tag: {
    padding: '8px 16px', borderRadius: '50px', border: '1px solid',
    fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
    transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
    background: 'transparent',
  },
  select: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.8)', borderRadius: '12px', padding: '10px 16px',
    fontSize: '0.88rem', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
    outline: 'none', flex: 1, minWidth: '180px',
  },
  dropzone: {
    border: '2px dashed rgba(0,255,160,0.2)', borderRadius: '16px',
    padding: '32px', textAlign: 'center', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
    transition: 'all 0.2s', marginTop: '10px',
    background: 'rgba(0,255,160,0.02)',
  },
  textarea: {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
    color: 'rgba(255,255,255,0.8)', padding: '14px 16px',
    fontSize: '0.88rem', fontFamily: "'DM Sans', sans-serif",
    resize: 'vertical', outline: 'none', lineHeight: 1.6,
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #00FFA0, #00C27C)', color: '#080810',
    border: 'none', borderRadius: '50px', padding: '14px 32px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', fontWeight: 700,
    cursor: 'pointer', transition: 'all 0.2s',
    boxShadow: '0 0 30px rgba(0,255,160,0.3)',
  },
  btnGhost: {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.7)', borderRadius: '50px', padding: '10px 20px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.2s',
  },
  backBtn: {
    background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'DM Sans', sans-serif",
    transition: 'color 0.2s',
  },
  loadingBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '60px 20px',
    background: 'rgba(255,255,255,0.02)', borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  spinner: {
    width: '40px', height: '40px', borderRadius: '50%',
    border: '3px solid rgba(0,255,160,0.1)',
    borderTop: '3px solid #00FFA0',
    animation: 'spin 0.8s linear infinite',
  },
  resultBox: {
    background: 'rgba(0,255,160,0.03)', border: '1px solid rgba(0,255,160,0.12)',
    borderRadius: '16px', padding: '24px', maxHeight: '400px', overflowY: 'auto',
  },
  perfilBanner: {
    display: 'flex', alignItems: 'center', gap: '12px',
    background: 'rgba(0,255,160,0.08)', border: '1px solid rgba(0,255,160,0.2)',
    borderRadius: '12px', padding: '12px 16px', marginBottom: '16px',
  },
  chatInput: {
    flex: 1, background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px',
    color: '#fff', padding: '12px 20px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
    outline: 'none',
  },
  typingDots: {
    display: 'flex', gap: '5px', alignItems: 'center',
  },
}


// ─── MODAL NOSOTROS ───
function ModalNosotros({ onClose }) {
  const [historia, setHistoria] = useState("")
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const textoDefault = `AuralIA nació de una pregunta simple: ¿por qué los materiales educativos no llegan a todos los estudiantes por igual?

Desde el encuentro entre docentes comprometidos, familias de estudiantes con diversidad funcional y personas convencidas de que la tecnología puede ser una herramienta de inclusión real, surgió esta plataforma.

No somos una empresa de tecnología que descubrió la educación. Somos educadores, familias y desarrolladores que entendemos que cada estudiante merece acceder al conocimiento sin barreras, con la dignidad y el respeto que merece.

AuralIA usa inteligencia artificial para hacer lo que siempre debió existir: adaptar los materiales al estudiante, y no el estudiante al material.

Nos guían los principios del Diseño Universal para el Aprendizaje, la Convención ONU sobre Derechos de las Personas con Discapacidad, y el enfoque de neurodiversidad que ve la diferencia como riqueza, no como déficit.

Esta es nuestra historia. Y estamos escribiéndola juntos.`

  useEffect(() => {
    setHistoria(textoDefault)
  }, [])

  const guardar = () => {
    // guardado en estado
    setGuardado(true)
    setEditando(false)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...styles.modal, maxWidth: '720px' }}>
        <div style={styles.modalHeader}>
          <div>
            <span style={styles.sectionLabel}>Quiénes somos</span>
            <h2 style={styles.modalTitle}>Nuestra Historia</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Decorative line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, #00FFA0, transparent)', marginBottom: '28px', borderRadius: '2px' }} />

        {!editando ? (
          <>
            <div style={{ background: 'rgba(0,255,160,0.03)', border: '1px solid rgba(0,255,160,0.1)', borderRadius: '16px', padding: '28px 32px', marginBottom: '24px' }}>
              {historia.split('\n\n').map((parrafo, i) => (
                parrafo.trim() && (
                  <p key={i} style={{ color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)', fontSize: i === 0 ? '1.05rem' : '0.95rem', lineHeight: 1.75, marginBottom: '18px', fontWeight: i === 0 ? 500 : 400 }}>
                    {parrafo}
                  </p>
                )
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button onClick={() => setEditando(true)} style={{ ...styles.btnGhost, fontSize: '0.85rem' }}>
                ✏️ Editar historia
              </button>
              {guardado && <span style={{ color: '#00FFA0', fontSize: '0.85rem', fontWeight: 600 }}>✓ Guardado</span>}
            </div>
          </>
        ) : (
          <>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '12px' }}>
              Escribí la historia de cómo surgió AuralIA. Podés contar el origen, quiénes son el equipo, la misión y los valores.
            </p>
            <textarea
              value={historia}
              onChange={e => setHistoria(e.target.value)}
              style={{ ...styles.textarea, minHeight: '320px', marginBottom: '16px' }}
              placeholder="Contá cómo surgió AuralIA..."
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={guardar} style={styles.btnPrimary}>Guardar historia</button>
              <button onClick={() => setEditando(false)} style={styles.btnGhost}>Cancelar</button>
            </div>
          </>
        )}

        {/* Valores */}
        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { icon: '🤝', titulo: 'Inclusión real', desc: 'No adaptamos para "facilitar". Ampliamos el acceso sin reducir la exigencia.' },
            { icon: '⚖️', titulo: 'Modelo de derechos', desc: 'Las barreras están en el entorno. Cada estudiante tiene potencial pleno.' },
            { icon: '🧠', titulo: 'Neurodiversidad', desc: 'La diferencia es riqueza. Usamos lenguaje de fortalezas, siempre.' },
          ].map(({ icon, titulo, desc }) => (
            <div key={titulo} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px 18px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '6px' }}>{titulo}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN APP ───
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [modal, setModal] = useState(null) // 'docente' | 'perfil' | null

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = {
    Planes: ['Instituciones', 'Docentes', 'Familias', 'Freemium'],
    Usos: ['Estudiantes con TDAH', 'CEA - Condición del Espectro Autista', 'Dislexia', 'Persona con disminución significativa de la capacidad visual', 'Persona con disminución significativa de la capacidad auditiva', 'Persona sorda'],
    Franquicias: null,
    Nosotros: 'modal',
  }

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: '#080810', color: '#fff', overflowX: 'hidden', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .glow-green { text-shadow: 0 0 30px rgba(0,255,160,0.6), 0 0 60px rgba(0,255,160,0.3); }
        .nav-link { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.75); text-decoration: none; padding: 6px 2px; transition: color 0.2s; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; position: relative; }
        .nav-link:hover { color: #00FFA0; }
        .dropdown { position: absolute; top: calc(100% + 16px); left: 50%; transform: translateX(-50%); background: rgba(12,12,24,0.97); border: 1px solid rgba(0,255,160,0.2); border-radius: 14px; padding: 12px 8px; min-width: 210px; backdrop-filter: blur(20px); box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,160,0.08); z-index: 200; }
        .dropdown-item { display: block; padding: 10px 16px; color: rgba(255,255,255,0.75); font-size: 0.85rem; font-weight: 500; text-decoration: none; border-radius: 8px; cursor: pointer; transition: background 0.15s, color 0.15s; }
        .dropdown-item:hover { background: rgba(0,255,160,0.1); color: #00FFA0; }
        .btn-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.85); border-radius: 50px; padding: 10px 22px; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600; cursor: pointer; text-decoration: none; letter-spacing: 0.04em; transition: all 0.2s; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.6); color: #fff; }
        .btn-nav-green { background: transparent; border: 1px solid rgba(0,255,160,0.3); color: rgba(0,255,160,0.9); border-radius: 50px; padding: 10px 22px; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600; cursor: pointer; text-decoration: none; letter-spacing: 0.04em; transition: all 0.2s; }
        .btn-nav-green:hover { background: rgba(0,255,160,0.08); }
        .btn-primary-nav { background: linear-gradient(135deg, #00FFA0, #00C27C); color: #080810; border: none; border-radius: 50px; padding: 11px 24px; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 700; cursor: pointer; text-decoration: none; letter-spacing: 0.04em; transition: all 0.2s; box-shadow: 0 0 20px rgba(0,255,160,0.3); }
        .btn-primary-nav:hover { transform: translateY(-1px); box-shadow: 0 0 35px rgba(0,255,160,0.5); }
        .btn-hero { background: linear-gradient(135deg, #00FFA0, #00C27C); color: #080810; border: none; border-radius: 50px; padding: 18px 44px; font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; text-decoration: none; transition: all 0.2s; box-shadow: 0 0 40px rgba(0,255,160,0.35); }
        .btn-hero:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(0,255,160,0.55); }
        .btn-outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.3); border-radius: 50px; padding: 16px 40px; font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; text-decoration: none; transition: all 0.2s; }
        .btn-outline:hover { border-color: #00FFA0; color: #00FFA0; box-shadow: 0 0 20px rgba(0,255,160,0.2); }
        .action-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 40px 36px; transition: all 0.3s; cursor: pointer; position: relative; overflow: hidden; }
        .action-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,255,160,0.4), transparent); opacity: 0; transition: opacity 0.3s; }
        .action-card:hover { border-color: rgba(0,255,160,0.3); background: rgba(0,255,160,0.04); transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .action-card:hover::before { opacity: 1; }
        .feature-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 36px 32px; transition: all 0.3s; position: relative; overflow: hidden; }
        .feature-card:hover { border-color: rgba(0,255,160,0.2); background: rgba(0,255,160,0.03); transform: translateY(-3px); }
        .profile-tag { display: inline-block; background: rgba(0,255,160,0.08); border: 1px solid rgba(0,255,160,0.2); color: #00FFA0; border-radius: 50px; padding: 8px 18px; font-size: 0.8rem; font-weight: 600; margin: 5px; transition: all 0.2s; cursor: default; }
        .profile-tag:hover { background: rgba(0,255,160,0.18); transform: scale(1.04); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.9s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.55s; }
        @keyframes float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        .orb { animation: float 8s ease-in-out infinite; }
        .orb-2 { animation-delay: -3s; animation-duration: 11s; }
        .orb-3 { animation-delay: -6s; animation-duration: 9s; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,80%,100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
        span[style*="typingDots"] span, .typing-dot { width: 7px; height: 7px; background: rgba(255,255,255,0.4); border-radius: 50%; display: inline-block; animation: bounce 1.2s infinite ease-in-out; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,160,0.3); border-radius: 4px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .features-grid { grid-template-columns: 1fr !important; } .actions-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(8,8,16,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none', padding: '0 5%', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s' }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <a href="javascript:void(0)" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #00FFA0, #00C27C)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(0,255,160,0.4)' }}>
            <WaveLogo size={20} />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#fff' }}>
            Aural<span style={{ color: '#00FFA0' }}>IA</span>
          </span>
        </a>

        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {Object.entries(menuItems).map(([label, items]) => (
            <div key={label} style={{ position: 'relative' }}>
              <button className="nav-link" onMouseEnter={() => setActiveMenu(items && items !== 'modal' ? label : null)} onClick={() => { if(items === 'modal'){ setModal('nosotros'); setActiveMenu(null) } else { setActiveMenu(activeMenu === label ? null : (items ? label : null)) } }}>
                {label}{items && <span style={{ marginLeft: '4px', fontSize: '0.6rem', opacity: 0.6 }}>▾</span>}
              </button>
              {items && activeMenu === label && (
                <div className="dropdown">
                  {items.map(item => <a key={item} className="dropdown-item" href="javascript:void(0)">{item}</a>)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="javascript:void(0)" className="btn-ghost">Ingresar</a>
          <a href="javascript:void(0)" className="btn-nav-green">Ver Planes</a>
          <a href="javascript:void(0)" className="btn-primary-nav">Pruébalo Gratis</a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 6% 80px', overflow: 'hidden' }}>
        <div className="orb" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,255,160,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="orb orb-2" style={{ position: 'absolute', bottom: '0%', right: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(100,80,255,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="orb orb-3" style={{ position: 'absolute', top: '40%', right: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,255,160,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <span className="fade-up" style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00FFA0', marginBottom: '24px', display: 'block' }}>✦ Plataforma Educativa con IA · 2026</span>

          <h1 className="fade-up fade-up-1" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: '0.92', letterSpacing: '-0.04em', marginBottom: '32px' }}>
            AURAL<br />
            <span className="glow-green" style={{ color: '#00FFA0', fontStyle: 'italic' }}>IA</span>
          </h1>

          <p className="fade-up fade-up-2" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'rgba(255,255,255,0.65)', maxWidth: '560px', lineHeight: '1.6', marginBottom: '48px' }}>
            La pedagogía del cuidado se encuentra con la tecnología más disruptiva.
            <span style={{ color: '#00FFA0' }}> Inclusión real</span>, adaptada a cada estudiante con neurodiversidad o diversidad funcional.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '64px' }}>
            <button className="btn-hero" onClick={() => setModal('docente')}>Panel Docente →</button>
            <button className="btn-outline" onClick={() => setModal('perfil')}>Analizar Perfil</button>
          </div>

          <div className="fade-up fade-up-4" style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            {[{ n: '+5', label: 'Perfiles de neurodiversidad' }, { n: '100%', label: 'Accesible por diseño' }, { n: 'DUA', label: 'Diseño Universal de Aprendizaje' }].map(({ n, label }) => (
              <div key={n}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: '#00FFA0', lineHeight: 1, textShadow: '0 0 20px rgba(0,255,160,0.5)' }}>{n}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginTop: '4px', letterSpacing: '0.04em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '40px', right: '6%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px 24px', backdropFilter: 'blur(10px)', zIndex: 2 }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Tecnología</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Powered by Claude AI</div>
        </div>
      </section>

      {/* ─── ACCIONES PRINCIPALES ─── */}
      <section style={{ padding: '80px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00FFA0', display: 'block', marginBottom: '16px' }}>Herramientas IA</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '40px' }}>
            Dos herramientas, <span style={{ color: '#00FFA0' }}>un solo propósito</span>
          </h2>

          <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* CARD DOCENTE */}
            <div className="action-card" onClick={() => setModal('docente')}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>👩‍🏫</div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00FFA0', display: 'block', marginBottom: '10px' }}>Para docentes</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px' }}>Panel de Adaptación</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '24px' }}>
                Subí cualquier material educativo y la IA lo transforma automáticamente según el perfil del estudiante y el programa uruguayo.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {['PDF', 'Word', 'Video', 'DUA', 'Prog. Uruguayo'].map(t => (
                  <span key={t} style={{ background: 'rgba(0,255,160,0.08)', border: '1px solid rgba(0,255,160,0.15)', color: 'rgba(0,255,160,0.8)', borderRadius: '50px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              <div style={{ color: '#00FFA0', fontWeight: 700, fontSize: '0.9rem' }}>Abrir panel →</div>
            </div>

            {/* CARD PERFIL */}
            <div className="action-card" onClick={() => setModal('perfil')}>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🧩</div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A29BFE', display: 'block', marginBottom: '10px' }}>Análisis con IA</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px' }}>Detector de Perfil</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '24px' }}>
                La IA hace preguntas conversacionales sobre el estudiante y deduce su perfil de neurodiversidad para orientar las adaptaciones.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {['Conversacional', 'TDAH', 'CEA', 'Dislexia', 'Recomendaciones'].map(t => (
                  <span key={t} style={{ background: 'rgba(162,155,254,0.08)', border: '1px solid rgba(162,155,254,0.15)', color: 'rgba(162,155,254,0.8)', borderRadius: '50px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              <div style={{ color: '#A29BFE', fontWeight: 700, fontSize: '0.9rem' }}>Iniciar análisis →</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PERFILES ─── */}
      <section style={{ padding: '80px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00FFA0', display: 'block', marginBottom: '16px' }}>Perfiles de accesibilidad</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Una plataforma, <span style={{ color: '#00FFA0' }}>infinitas adaptaciones</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '580px', marginBottom: '40px', lineHeight: 1.6 }}>
            Cada material se adapta automáticamente según el perfil del estudiante, siguiendo los principios del Diseño Universal para el Aprendizaje.
          </p>
          <div>
            {PERFILES_DUA.map(p => (
              <span key={p.id} className="profile-tag" style={{ borderColor: `${p.color}40`, color: p.color, background: `${p.color}10` }}>{p.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #00FFA0, #00C27C)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <WaveLogo size={16} />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1rem' }}>Aural<span style={{ color: '#00FFA0' }}>IA</span></span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>© 2026 AuralIA · Educación sin barreras</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacidad', 'Términos', 'Contacto'].map(l => (
            <a key={l} href="javascript:void(0)" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00FFA0'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
            >{l}</a>
          ))}
        </div>
      </footer>

      {/* ─── MODALES ─── */}
      {modal === 'docente' && <ModalDocente onClose={() => setModal(null)} />}
      {modal === 'perfil' && <ModalPerfil onClose={() => setModal(null)} />}
      {modal === 'nosotros' && <ModalNosotros onClose={() => setModal(null)} />}
    </div>
  )
}

