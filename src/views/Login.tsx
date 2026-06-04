import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { login, userProfile } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const ok = await login(email, password);
      if (ok) {
        // Redirigir según el rol del usuario cargado en el perfil
        // Si es rol de liderazgo, mandarlo a seleccionar región, si no, a inicio
        setTimeout(() => {
          navigate('/');
        }, 100);
      } else {
        setErrorMsg('Correo o contraseña incorrectos.');
        setSubmitting(false);
      }
    } catch (err) {
      setErrorMsg('Error de conexión con el servidor.');
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <span className="eyebrow">La Crêpe Parisienne</span>
          <h1 className="login-title">
            <span className="accent">étoile</span>
            <span className="sub">Dashboard</span>
          </h1>
          <p className="login-subtitle">
            Ingresa tus credenciales para acceder al monitoreo regional de reseñas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errorMsg && (
            <div className="login-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="login-email">Correo Electrónico</label>
            <div className="input-container">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                id="login-email"
                required
                placeholder="correo@lacrepeparisienne.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Contraseña</label>
            <div className="input-container">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                id="login-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="login-btn" id="login-submit-btn" disabled={submitting}>
            <span>{submitting ? 'Verificando...' : 'Iniciar Sesión'}</span>
            {!submitting && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 Grupo MYT · Corporativo Alancar</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
