import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error boundary to show errors instead of white page
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(e) { return { error: e } }
  componentDidCatch(e, info) { console.error('App crashed:', e, info) }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight:'100vh', background:'#0d0d0d', color:'#fff',
          display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', padding:'24px', fontFamily:'sans-serif'
        }}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>⚠️</div>
          <h1 style={{color:'#C9F53B',marginBottom:'8px'}}>Something went wrong</h1>
          <p style={{color:'rgba(255,255,255,0.5)',marginBottom:'24px'}}>
            {this.state.error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background:'#C9F53B', color:'#0d0d0d', border:'none',
              padding:'12px 28px', borderRadius:'8px', fontWeight:'700',
              fontSize:'16px', cursor:'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
