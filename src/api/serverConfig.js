// Server configuration for when connecting to real backend
export const SERVER_CONFIG = {
  // Development - use local simulation
  development: {
    useSimulation: true,
    baseUrl: 'http://localhost:3001'
  },
  
  // Production - connect to real server
  production: {
    useSimulation: false,
    baseUrl: process.env.REACT_APP_API_URL || 'https://your-server.com'
  }
};

export const API_ENDPOINTS = {
  chat: '/api',
  ping: '/api/ping',
  status: '/api/status',
  bondStatus: '/api/bond-status'
};

// Helper to check if we should use simulation
export const shouldUseSimulation = () => {
  return SERVER_CONFIG.development.useSimulation || !process.env.REACT_APP_API_URL;
};

// Helper to get base URL
export const getBaseUrl = () => {
  return shouldUseSimulation() 
    ? SERVER_CONFIG.development.baseUrl 
    : SERVER_CONFIG.production.baseUrl;
};