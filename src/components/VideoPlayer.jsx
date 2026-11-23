
function VideoPlayer() {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white">
        <h5 className="mb-0">Video seleccionado</h5>
      </div>

      <div className="card-body">
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/3IxSSiLPT4A"
            title="Video sobre transcripción con API"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer