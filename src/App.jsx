
import './App.css'
import VideoPlayer from './components/VideoPlayer'
import VoiceNotes from './components/VoiceNotes'

function App() {
  return (
    <div className="container-fluid py-4">
      <header className="text-center mb-4">
        <h1>Video Notes</h1>
        <p className="text-secondary">
          Transcripción y toma de notas por voz
        </p>
      </header>

      <div className="row g-4">
        <div className="col-lg-7">
          <VideoPlayer />
        </div>

        <div className="col-lg-5">
          <VoiceNotes />
        </div>
      </div>
    </div>
  )
}

export default App