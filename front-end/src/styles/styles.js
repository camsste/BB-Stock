export const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  
  // Login Screen
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#2c3e50',
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '300px',
  },
  loginTitle: {
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  loginSubtitle: {
    color: '#7f8c8d',
    marginBottom: '2rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    border: '1px solid #bdc3c7',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  loginButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '1rem 0',
  },
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: '#3498db',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  
  // Dashboard
  container: {
    padding: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userInfo: {
    color: '#7f8c8d',
  },
  section: {
    backgroundColor: 'white',
    padding: '1.5rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
  },
  metricCard: {
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    color: 'white',
  },
  critical: { backgroundColor: '#e74c3c' },
  warning: { backgroundColor: '#f39c12' },
  info: { backgroundColor: '#3498db' },
  success: { backgroundColor: '#27ae60' },
  metricValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  metricLabel: {
    fontSize: '0.9rem',
  },
  
  // Alertas
  alertItem: {
    borderLeft: '4px solid #e74c3c',
    padding: '1rem',
    marginBottom: '0.5rem',
    backgroundColor: '#fdf2f2',
  },
  alertCodigo: {
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
  }
};