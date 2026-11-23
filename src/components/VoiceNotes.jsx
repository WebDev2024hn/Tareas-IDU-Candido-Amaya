
import { useState, useEffect, useRef } from 'react'

function VoiceNotes() {
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)

  const recognitionRef = useRef(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = 'es-HN'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event) => {
      let finalText = ''
      let temporaryText = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalText += text + ' '
        } else {
          temporaryText += text
        }
      }

      if (finalText) {
        setTranscript((previous) => previous + finalText)
      }

      setInterimTranscript(temporaryText)
    }

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript('')
    }

    recognition.onerror = (event) => {
      console.error('Error de reconocimiento:', event.error)
      setIsListening(false)
    }

    recognitionRef.current = recognition
    setIsSupported(true)

    return () => {
      recognition.stop()
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const clearTranscript = () => {
    setTranscript('')
    setInterimTranscript('')
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white">
        <h5 className="mb-0">Notas de voz</h5>
      </div>

      <div className="card-body">
        <div className="d-flex align-items-center gap-2 mb-3">
          <button
            className="btn btn-success"
            onClick={startListening}
            disabled={isListening || !isSupported}
            >
            Iniciar micrófono
            </button>

          <button
            className="btn btn-danger"
            onClick={stopListening}
            disabled={!isListening}
          >
            Detener
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={clearTranscript}
          >
            Limpiar
          </button>
        </div>

        <p className="small text-secondary">
         {!isSupported 
          ? 'Reconocimiento de voz no disponible en este navegador.'
          : isListening
           ? 'Escuchando...'
           : 'Micrófono detenido'}
        </p>

        <label className="form-label">
          Transcripción
        </label>

        <div className="form-control transcript-box">
          {transcript}
          <span className="text-secondary">
            {interimTranscript}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VoiceNotes
