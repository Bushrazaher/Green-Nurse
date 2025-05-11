import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../Images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteseedling, getSeedling } from '../Features/ImportedSeedlingSlice';
import { deleteLocalseedling, getLocalSeedling } from '../Features/LocalSeedlingSlice';
import { GrUpdate } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import Profile from './Profile';  
import axios from 'axios';
import { login, logout } from '../Features/UserSlice';
import Location from "./Location";
const Home = () => {
const { user, isLogin } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const { seedlings, status, error } = useSelector(state => state.seedlings);
  const { localseedlings, status: localStatus, error: localError } = useSelector(state => state.localseedlings);
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    dispatch(getSeedling());
    dispatch(getLocalSeedling());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login');
  };
  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToSeedlings = () => {
    navigate('/local');
  };

  const navigateToImportedDetails = () => {
    navigate('/import');
  };

  const handleUpdateImported = (id) => {
    navigate(`/updateimport/${id}`);
  };
  const handleUpdateLocal = (id) => {
    navigate(`/updatelocal/${id}`);
  };




//Handel thr Delete of Imported seedling
 const deleteImported = (id) => {
  if (window.confirm('Are you sure you want to delete this imported seedling?')) {
    dispatch(deleteseedling(id));
    navigate('/home')
  }
};
//Handel thr Delete of Imported seedling
 const deletelocal = (id) => {
  if (window.confirm('Are you sure you want to delete this Local seedling?')) {
    dispatch(deleteLocalseedling(id));
    navigate('/home')
  }
};
  return (
    <div style={styles.container}>
      {/* Profile Section */}
      <div style={styles.profileSection}>
        <div style={styles.profileHeader}>
          <div style={styles.profileCircle} onClick={toggleMenu}>
            <span style={styles.profileInitial}> {user ? `${user.fname.charAt(0)}${user.lname.charAt(0)}`:
              <img 
                src={logo} 
                alt="Company Logo" 
                style={{ 
                  width: '80px',
                  height: 'auto',
                }} 
              />}
            </span>
          </div>
          <div style={styles.profileInfo}>
            <h3 style={styles.profileName}>{/*{user?.fname} {user?.lname}*/}</h3> 
            <p style={styles.profileEmail}>{/*user?.email*/}</p>
          </div>
        </div>

        {menuVisible && (
          <div style={styles.menu}>
            { /*   <button style={styles.menuItem} onClick={profile}  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>My Profile</button>*/}
          <h3 style={styles.profileName}> Name :{user?.fname} {user?.lname}</h3> 
            <h3 style={styles.profileName}> Email: {user?.email}</h3>
            <h3 style={styles.profileName}>City:<Location/></h3>
          
            <button style={styles.menuItem} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} 
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>About Us</button>
            <button style={styles.menuItem} onClick={handleLogout} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'} 
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Exit</button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={styles.contentSection}>
        <h2 style={styles.sectionTitle}>Welcome  {user?.fname} {user?.lname} To Green Nurser Store</h2>
        <div style={styles.cardContainer}>
          <div 
            style={styles.card} 
            onClick={navigateToSeedlings}
            className="clickable-card"
            onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={styles.cardTitle}>LOCAL SEEDLINGS</h3>
            <p style={styles.cardText}>Details about local seedlings</p>
          </div>
          <div 
            style={styles.card} 
            onClick={navigateToImportedDetails}
            className="clickable-card"
            onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <h3 style={styles.cardTitle}>IMPORTED SEEDLINGS</h3>
            <p style={styles.cardText}>Details about imported seedlings</p>
          </div>
        </div>

        {/* Imported Seedlings Table */}
        <div style={styles.tableSection}>
          <h2 style={styles.sectionTitle}>Imported Seedlings</h2>
          {status === 'loading' && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {seedlings && seedlings.length > 0 ? (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Quantity</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Date Added</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {seedlings.map((seedling) => (
                    <tr key={seedling._id} style={styles.tr}>
                      <td style={styles.td}>{seedling.name}</td>
                      <td style={styles.td}>{seedling.type}</td>
                      <td style={styles.td}>{seedling.quantity}</td>
                      <td style={styles.td}>${seedling.price.toFixed(2)}</td>
                      <td style={styles.td}>${seedling.total.toFixed(2)}</td>
                      <td style={styles.td}>
                        {new Date(seedling.createdAt).toLocaleDateString()}
                      </td>
                      <td style={styles.actionCell}>
                        <button 
                          onClick={() => handleUpdateImported(seedling._id)} 
                          style={styles.updateButton}
                          aria-label="Update"
                          title="Update"
                        >
                          <GrUpdate style={styles.updateIcon} />
                        </button>
                        <button 
                          onClick={() => deleteImported(seedling._id)} 
                          style={styles.deleteButton}
                          aria-label="Delete"
                          title="Delete"
                        >
                          <MdOutlineDeleteForever style={styles.deleteIcon} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No seedlings found</p>
          )}
        </div>
        <div style={{ padding: '30px' }}/>


        {/* Local Seedlings Table */}
        <div style={styles.tableSection}>
          <h2 style={styles.sectionTitle}>Local Seedlings</h2>
          {localStatus === 'loading' && <p>Loading...</p>}
          {localError && <p style={{ color: 'red' }}>{localError}</p>}
          {localseedlings && localseedlings.length > 0 ? (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Quantity</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Date Added</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {localseedlings.map((local) => (
                    <tr key={local._id} style={styles.tr}>
                      <td style={styles.td}>{local.name}</td>
                      <td style={styles.td}>{local.type}</td>
                      <td style={styles.td}>{local.quantity}</td>
                      <td style={styles.td}>${local.price.toFixed(2)}</td>
                      <td style={styles.td}>${local.total.toFixed(2)}</td>
                      <td style={styles.td}>
                        {new Date(local.createdAt).toLocaleDateString()}
                      </td>
                      <td style={styles.actionCell}>
                       <button onClick={() => handleUpdateLocal(local._id)} style={styles.updateButton}aria-label="Update"title="Update">
                      <GrUpdate style={styles.updateIcon} />
                       </button>
  
                      <button onClick={() => deletelocal(local._id)} style={styles.deleteButton}aria-label="Delete"title="Delete">
                       <MdOutlineDeleteForever style={styles.deleteIcon} />
                      </button>
                  </td>
              </tr>))}
                </tbody>
              </table>
            </div>) : (<p>No seedlings found</p>)}
        </div>
      </div>
    </div>
  );
};


//_______________________(STYLING SECTION)__________________________
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  profileSection: {
    width: '250px',
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
    width: '80px',
    height: '80px',
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
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    width: '100%',
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
  actionCell: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 8px',
  },
  updateButton: {
    background: '#e8f5e9',
    border: 'none',
    borderRadius: '6px',
    padding: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#2e8b57',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ':hover': {
      background: '#c8e6c9',
      transform: 'scale(1.1)',
      boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
    },
  },
  deleteButton: {
    background: '#ffebee',
    border: 'none',
    borderRadius: '6px',
    padding: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#f44336',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    ':hover': {
      background: '#ffcdd2',
      transform: 'scale(1.1)',
      boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
    },
  },
  updateIcon: {
    fontSize: '18px',
    color: '#2e8b57',
  },
  deleteIcon: {
    fontSize: '20px',
    color: '#f44336',
  },
  profileInitial: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#2e8b57'
},
};

export default Home;