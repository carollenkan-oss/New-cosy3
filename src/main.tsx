import { Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: '4rem auto', textAlign: 'center' }}>
          <h2 style={{ color: '#c0392b' }}>Something went wrong</h2>
          <p style={{ color: '#555', marginTop: '0.5rem' }}>
            The page failed to load. Please try refreshing.
          </p>
          <pre style={{ textAlign: 'left', background: '#f5f5f5', padding: '1rem', borderRadius: 8, fontSize: 12, overflow: 'auto', marginTop: '1rem' }}>
            {(this.state.error as Error).message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1.5rem', padding: '0.6rem 1.5rem', background: '#1e3a8a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
