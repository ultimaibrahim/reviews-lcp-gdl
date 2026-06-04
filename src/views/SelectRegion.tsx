import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { REGION_NAME_MAP, SUCURSALES_META_ALL } from '../lib/data';

export const SelectRegion: React.FC = () => {
  const { userProfile, isAuthenticated, setActiveRegion, logout } = useApp();
  const navigate = useNavigate();
  const [exitTransition, setExitTransition] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (userProfile && userProfile.rol === 'gerente') {
      navigate('/');
    }
  }, [isAuthenticated, userProfile, navigate]);

  const handleSelect = (regionId: string) => {
    setExitTransition(true);
    setTimeout(() => {
      setActiveRegion(regionId);
      navigate('/');
    }, 400);
  };

  const getRegionDetails = (id: string) => {
    const branches = SUCURSALES_META_ALL.filter(s => s.region === id);
    const count = branches.length;
    
    let desc = '';
    if (id === 'GDL') desc = 'Jalisco · Regional';
    else if (id === 'CDMX') desc = 'Valle de México';
    else if (id === 'MTY') desc = 'Nuevo León';
    else if (id === 'TJ') desc = 'Baja California';
    else desc = 'Sucursal única';

    return {
      count,
      desc
    };
  };

  if (!isAuthenticated || (userProfile && userProfile.rol === 'gerente')) {
    return null;
  }

  return (
    <div className="srv-wrapper">
      <div className={`srv-container ${exitTransition ? 'exit-transition' : ''}`} id="srvContainer">
        <div className="srv-header">
          <span className="eyebrow" style={{ color: 'var(--verde)', fontWeight: 700 }}>
            Monitoreo Regional
          </span>
          <h1 className="srv-title">Selecciona una Región</h1>
          <p className="srv-subtitle">
            Elige el área operativa que deseas supervisar. Tu perfil administrativo te permite alternar libremente entre regiones.
          </p>
        </div>
        
        <div className="srv-grid">
          {Object.entries(REGION_NAME_MAP).map(([id, name]) => {
            const { count, desc } = getRegionDetails(id);
            return (
              <div 
                key={id} 
                className="srv-card" 
                onClick={() => handleSelect(id)}
              >
                <div className="srv-card-top">
                  <span className="srv-card-code">{id}</span>
                  <span className="srv-card-badge">
                    {count} sucursal{count !== 1 ? 'es' : 'al'}
                  </span>
                </div>
                <div className="srv-card-bottom">
                  <h3 className="srv-card-name">{name}</h3>
                  <p className="srv-card-desc">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="srv-header srv-footer">
          <button className="srv-back-login" onClick={logout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12,19 5,12 12,5" />
            </svg>
            <span>Regresar al Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRegion;
