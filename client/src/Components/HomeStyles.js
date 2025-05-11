// src/styles/HomeStyles.js
export const homeStyles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  profileSection: {
    width: '300px',
    backgroundColor: '#2e8b57',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  profileCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: '#2e8b57',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  profileName: {
    margin: '0',
    fontSize: '18px',
  },
  profileEmail: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    opacity: '0.8',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuItem: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    textAlign: 'left',
    padding: '12px 15px',
    margin: '5px 0',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  contentSection: {
    flex: '1',
    padding: '30px',
  },
  sectionTitle: {
    color: '#2e8b57',
    marginBottom: '30px',
    fontSize: '24px',
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flex: '1',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardTitle: {
    color: '#2e8b57',
    marginTop: '0',
  },
  cardText: {
    color: '#666',
  },
  tableSection: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#2e8b57',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  tr: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
};