const BackButton = ({ onClick, className = "", children = "Volver" }) => {
  return (
    <button
      onClick={onClick}
      className={`glass-enhanced px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus-ring flex items-center gap-3 ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>{children}</span>
    </button>
  )
}

export default BackButton
