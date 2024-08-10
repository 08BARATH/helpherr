// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Grid,
//   Paper,
//   Button,
//   Typography,
//   IconButton,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   AppBar,
//   Toolbar,
//   CssBaseline
// } from '@mui/material';
// import {
//   Add,
//   Edit,
//   Delete,
//   People,
//   DirectionsBike,
//   Security,
//   LocalHospital
// } from '@mui/icons-material';

// const drawerWidth = 240;

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [bikeRides, setBikeRides] = useState([]);
//   const [complaints, setComplaints] = useState([]);
//   const [napkinRequests, setNapkinRequests] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogType, setDialogType] = useState('');
//   const [currentItem, setCurrentItem] = useState(null);
//   const [selectedView, setSelectedView] = useState('users');
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phonenumber: '',
//     name: '',
//     age: '',
//     phoneNumber: '',
//     complaintText: '',
//     address: '',
//     location: '',
//     requestDate: ''
//   });

//   useEffect(() => {
//     if (selectedView === 'users') {
//       fetchUsers();
//     } else if (selectedView === 'bikeRides') {
//       fetchBikeRides();
//     } else if (selectedView === 'cyberCrime') {
//       fetchComplaints();
//     } else if (selectedView === 'napkinRequests') {
//       fetchNapkinRequests();
//     }
//   }, [selectedView]);

//   const fetchUsers = () => {
//     axios.get('http://localhost:8080/login')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the users!', error);
//       });
//   };

//   const fetchBikeRides = () => {
//     axios.get('http://localhost:8080/api/ride-requests/getall')
//       .then(response => {
//         setBikeRides(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the bike rides!', error);
//       });
//   };

//   const fetchComplaints = () => {
//     axios.get('http://localhost:8080/api/complaints/getall')
//       .then(response => {
//         setComplaints(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the complaints!', error);
//       });
//   };

//   const fetchNapkinRequests = () => {
//     axios.get('http://localhost:8080/api/delivery-requests/getall')
//       .then(response => {
//         setNapkinRequests(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the napkin requests!', error);
//       });
//   };

//   const handleClickOpen = (type, item) => {
//     setDialogType(type);
//     setCurrentItem(item);
//     setFormData(item ? { ...item } : { username: '', email: '', phonenumber: '', name: '', age: '', phoneNumber: '', complaintText: '', address: '', location: '', requestDate: '' });
//     setOpenDialog(true);
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//     setCurrentItem(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     if (dialogType === 'users') {
//       if (currentItem) {
//         axios.put(http://localhost:8080/login/${currentItem.id}, formData)
//           .then(() => {
//             fetchUsers(); // Re-fetch users after update
//           })
//           .catch(error => {
//             console.error('There was an error updating the user!', error);
//           });
//       } else {
//         axios.post('http://localhost:8080/login', formData)
//           .then(() => {
//             fetchUsers(); // Re-fetch users after addition
//           })
//           .catch(error => {
//             console.error('There was an error creating the user!', error);
//           });
//       }
//     } else if (dialogType === 'bikeRides') {
//       // Handle bike rides similarly if needed
//     } else if (dialogType === 'cyberCrime') {
//       if (currentItem) {
//         axios.put(http://localhost:8080/api/complaints/${currentItem.id}, formData)
//           .then(() => {
//             fetchComplaints(); // Re-fetch complaints after update
//           })
//           .catch(error => {
//             console.error('There was an error updating the complaint!', error);
//           });
//       } else {
//         axios.post('http://localhost:8080/api/complaints/file', formData)
//           .then(() => {
//             fetchComplaints(); // Re-fetch complaints after addition
//           })
//           .catch(error => {
//             console.error('There was an error creating the complaint!', error);
//           });
//       }
//     } else if (dialogType === 'napkinRequests') {
//       if (currentItem) {
//         axios.put(http://localhost:8080/api/period-requests/${currentItem.id}, formData)
//           .then(() => {
//             fetchNapkinRequests(); // Re-fetch napkin requests after update
//           })
//           .catch(error => {
//             console.error('There was an error updating the napkin request!', error);
//           });
//       } else {
//         axios.post('http://localhost:8080/api/period-requests/request', formData)
//           .then(() => {
//             fetchNapkinRequests(); // Re-fetch napkin requests after addition
//           })
//           .catch(error => {
//             console.error('There was an error creating the napkin request!', error);
//           });
//       }
//     }
//     handleClose();
//   };

//   const handleDelete = (type, id) => {
//     if (type === 'users') {
//       axios.delete(http://localhost:8080/login/${id})
//         .then(() => {
//           fetchUsers(); // Re-fetch users after deletion
//         })
//         .catch(error => {
//           console.error('There was an error deleting the user!', error);
//         });
//     } else if (type === 'bikeRides') {
//       // Handle bike rides similarly if needed
//     } else if (type === 'cyberCrime') {
//       axios.delete(http://localhost:8080/api/complaints/${id})
//         .then(() => {
//           fetchComplaints(); // Re-fetch complaints after deletion
//         })
//         .catch(error => {
//           console.error('There was an error deleting the complaint!', error);
//         });
//     } else if (type === 'napkinRequests') {
//       axios.delete(http://localhost:8080/api/period-requests/${id})
//         .then(() => {
//           fetchNapkinRequests(); // Re-fetch napkin requests after deletion
//         })
//         .catch(error => {
//           console.error('There was an error deleting the napkin request!', error);
//         });
//     }
//   };

//   const renderTable = (data = [], type) => (
//     <TableContainer component={Paper} style={{ marginTop: 10, backgroundColor: '#ffffff', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>{type === 'users' ? 'Name' : type === 'bikeRides' ? 'Ride ID' : type === 'cyberCrime' ? 'Complaint ID' : 'Request ID'}</TableCell>
//             <TableCell>{type === 'users' ? 'Email' : type === 'bikeRides' ? 'User Name' : type === 'cyberCrime' ? 'Name' : 'Name'}</TableCell>
//             <TableCell>{type === 'users' ? 'Phone Number' : type === 'bikeRides' ? 'Pickup Location' : type === 'cyberCrime' ? 'Age' : 'Address'}</TableCell>
//             {type !== 'users' && type !== 'cyberCrime' && type !== 'napkinRequests' && (
//               <>
//                 <TableCell>Destination Location</TableCell>
//                 <TableCell>Booking Time</TableCell>
//               </>
//             )}
//             {type === 'cyberCrime' && (
//               <>
//                 <TableCell>Phone Number</TableCell>
//                 <TableCell>Complaint Text</TableCell>
//               </>
//             )}
//             {type === 'napkinRequests' && (
//               <>
//                 <TableCell>Location</TableCell>
//                 <TableCell>Request Date</TableCell>
//               </>
//             )}
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item) => (
//             <TableRow key={item.id}>
//               <TableCell>{type === 'users' ? item.username : type === 'bikeRides' ? item.id : type === 'cyberCrime' ? item.id : item.id}</TableCell>
//               <TableCell>{type === 'users' ? item.email : type === 'bikeRides' ? item.username : type === 'cyberCrime' ? item.name : item.name}</TableCell>
//               <TableCell>{type === 'users' ? item.phonenumber : type === 'bikeRides' ? item.pickupLocation : type === 'cyberCrime' ? item.age : item.address}</TableCell>
//               {type !== 'users' && type !== 'cyberCrime' && type !== 'napkinRequests' && (
//                 <>
//                   <TableCell>{item.destinationLocation}</TableCell>
//                   <TableCell>{item.bookingTime}</TableCell>
//                 </>
//               )}
//               {type === 'cyberCrime' && (
//                 <>
//                   <TableCell>{item.phoneNumber}</TableCell>
//                   <TableCell>{item.complaintText}</TableCell>
//                 </>
//               )}
//               {type === 'napkinRequests' && (
//                 <>
//                   <TableCell>{item.location}</TableCell>
//                   <TableCell>{item.requestDate}</TableCell>
//                 </>
//               )}
//               <TableCell>
//                 <IconButton onClick={() => handleClickOpen(type, item)}>
//                   <Edit />
//                 </IconButton>
//                 <IconButton onClick={() => handleDelete(type, item.id)}>
//                   <Delete />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );

//   const renderDialog = () => (
//     <Dialog open={openDialog} onClose={handleClose}>
//       <DialogTitle>{dialogType === 'users' ? (currentItem ? 'Edit User' : 'Add User') : dialogType === 'bikeRides' ? 'Add/Edit Bike Ride' : dialogType === 'cyberCrime' ? 'Add/Edit Complaint' : 'Add/Edit Napkin Request'}</DialogTitle>
//       <DialogContent>
//         {dialogType === 'users' && (
//           <>
//             <TextField name="username" label="Name" value={formData.username} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="email" label="Email" value={formData.email} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="phonenumber" label="Phone Number" value={formData.phonenumber} onChange={handleInputChange} fullWidth margin="dense" />
//           </>
//         )}
//         {dialogType === 'bikeRides' && (
//           <>
//             <TextField name="username" label="User Name" value={formData.username} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="pickupLocation" label="Pickup Location" value={formData.pickupLocation} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="destinationLocation" label="Destination Location" value={formData.destinationLocation} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="bookingTime" label="Booking Time" value={formData.bookingTime} onChange={handleInputChange} fullWidth margin="dense" />
//           </>
//         )}
//         {dialogType === 'cyberCrime' && (
//           <>
//             <TextField name="name" label="Name" value={formData.name} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="age" label="Age" value={formData.age} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="complaintText" label="Complaint Text" value={formData.complaintText} onChange={handleInputChange} fullWidth margin="dense" />
//           </>
//         )}
//         {dialogType === 'napkinRequests' && (
//           <>
//             <TextField name="name" label="Name" value={formData.name} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="address" label="Address" value={formData.address} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="location" label="Location" value={formData.location} onChange={handleInputChange} fullWidth margin="dense" />
//             <TextField name="requestDate" label="Request Date" value={formData.requestDate} onChange={handleInputChange} fullWidth margin="dense" />
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           {currentItem ? 'Update' : 'Add'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap>
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [& .MuiDrawer-paper]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             <ListItem button onClick={() => setSelectedView('users')}>
//               <ListItemIcon>
//                 <People />
//               </ListItemIcon>
//               <ListItemText primary="Manage Users" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedView('bikeRides')}>
//               <ListItemIcon>
//                 <DirectionsBike />
//               </ListItemIcon>
//               <ListItemText primary="Manage Bike Rides" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedView('cyberCrime')}>
//               <ListItemIcon>
//                 <Security />
//               </ListItemIcon>
//               <ListItemText primary="Manage Cyber Crime Complaints" />
//             </ListItem>
//             <ListItem button onClick={() => setSelectedView('napkinRequests')}>
//               <ListItemIcon>
//                 <LocalHospital />
//               </ListItemIcon>
//               <ListItemText primary="Manage Napkin Requests" />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         <Container maxWidth="lg">
//           <Typography variant="h4" gutterBottom>
//             {selectedView === 'users'
//               ? 'Manage Users'
//               : selectedView === 'bikeRides'
//               ? 'Manage Bike Rides'
//               : selectedView === 'cyberCrime'
//               ? 'Manage Cyber Crime Complaints'
//               : 'Manage Napkin Requests'}
//           </Typography>
//           <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleClickOpen(selectedView, null)}>
//             Add {selectedView === 'users' ? 'User' : selectedView === 'bikeRides' ? 'Bike Ride' : selectedView === 'cyberCrime' ? 'Complaint' : 'Napkin Request'}
//           </Button>
//           {selectedView === 'users' && renderTable(users, 'users')}
//           {selectedView === 'bikeRides' && renderTable(bikeRides, 'bikeRides')}
//           {selectedView === 'cyberCrime' && renderTable(complaints, 'cyberCrime')}
//           {selectedView === 'napkinRequests' && renderTable(napkinRequests, 'napkinRequests')}
//         </Container>
//         {renderDialog()}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  AppBar,
  Toolbar,
  CssBaseline
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  People,
  DirectionsBike,
  Security,
  LocalHospital
} from '@mui/icons-material';

const drawerWidth = 240;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [bikeRides, setBikeRides] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [napkinRequests, setNapkinRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedView, setSelectedView] = useState('users');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    name: '',
    age: '',
    phoneNumber: '',
    complaintText: '',
    address: '',
    location: '',
    requestDate: ''
  });

  useEffect(() => {
    if (selectedView === 'users') {
      fetchUsers();
    } else if (selectedView === 'bikeRides') {
      fetchBikeRides();
    } else if (selectedView === 'cyberCrime') {
      fetchComplaints();
    } else if (selectedView === 'napkinRequests') {
      fetchNapkinRequests();
    }
  }, [selectedView]);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/login')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  };

  const fetchBikeRides = () => {
    axios.get('http://localhost:8080/api/ride-requests/getall')
      .then(response => {
        setBikeRides(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bike rides!', error);
      });
  };

  const fetchComplaints = () => {
    axios.get('http://localhost:8080/api/complaints')
      .then(response => {
        setComplaints(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the complaints!', error);
      });
  };

  const fetchNapkinRequests = () => {
    axios.get('http://localhost:8080/api/delivery-requests/getall')
      .then(response => {
        setNapkinRequests(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the napkin requests!', error);
      });
  };

  const handleClickOpen = (type, item) => {
    setDialogType(type);
    setCurrentItem(item);
    setFormData(item ? { ...item } : { username: '', email: '', phonenumber: '', name: '', age: '', phoneNumber: '', complaintText: '', address: '', location: '', requestDate: '' });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (dialogType === 'users') {
      if (currentItem) {
        axios.put(`http://localhost:8080/login/${currentItem.id}`, formData)
        .then(() => {
            fetchUsers(); // Re-fetch users after update
          })
          .catch(error => {
            console.error('There was an error updating the user!', error);
          });
      } else {
        axios.post('http://localhost:8080/login', formData)
          .then(() => {
            fetchUsers(); // Re-fetch users after addition
          })
          .catch(error => {
            console.error('There was an error creating the user!', error);
          });
      }
    } else if (dialogType === 'bikeRides') {
      // Handle bike rides similarly if needed
    } else if (dialogType === 'cyberCrime') {
      if (currentItem) {
        axios.put(`http://localhost:8080/login/${currentItem.id}`, formData)
        .then(() => {
            fetchComplaints(); // Re-fetch complaints after update
          })
          .catch(error => {
            console.error('There was an error updating the complaint!', error);
          });
      } else {
        axios.post('http://localhost:8080/api/complaints', formData)
          .then(() => {
            fetchComplaints(); // Re-fetch complaints after addition
          })
          .catch(error => {
            console.error('There was an error creating the complaint!', error);
          });
      }
    } else if (dialogType === 'napkinRequests') {
      if (currentItem) {
        axios.put(`http://localhost:8080/api/period-requests/${currentItem.id}`, formData)
          .then(() => {
            fetchNapkinRequests(); // Re-fetch napkin requests after update
          })
          .catch(error => {
            console.error('There was an error updating the napkin request!', error);
          });
      } else {
        axios.post('http://localhost:8080/api/period-requests/request', formData)
          .then(() => {
            fetchNapkinRequests(); // Re-fetch napkin requests after addition
          })
          .catch(error => {
            console.error('There was an error creating the napkin request!', error);
          });
      }
    }
    handleClose();
  };

  const handleDelete = (type, id) => {
    if (type === 'users') {
      axios.delete(`http://localhost:8080/login/${id}`)
        .then(() => {
          fetchUsers(); // Re-fetch users after deletion
        })
        .catch(error => {
          console.error('There was an error deleting the user!', error);
        });
    } else if (type === 'bikeRides') {
      // Handle bike rides similarly if needed
    } else if (type === 'cyberCrime') {
      axios.delete(`http://localhost:8080/api/complaints/${id}`)
        .then(() => {
          fetchComplaints(); // Re-fetch complaints after deletion
        })
        .catch(error => {
          console.error('There was an error deleting the complaint!', error);
        });
    } else if (type === 'napkinRequests') {
      axios.delete(`http://localhost:8080/api/period-requests/${id}`)
        .then(() => {
          fetchNapkinRequests(); // Re-fetch napkin requests after deletion
        })
        .catch(error => {
          console.error('There was an error deleting the napkin request!', error);
        });
    }
  };

  const renderTable = (data = [], type) => (
    <TableContainer component={Paper} style={{ marginTop: 10, backgroundColor: '#ffffff', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{type === 'users' ? 'Name' : type === 'bikeRides' ? 'Ride ID' : type === 'cyberCrime' ? 'Complaint ID' : 'Request ID'}</TableCell>
            <TableCell>{type === 'users' ? 'Email' : type === 'bikeRides' ? 'User Name' : type === 'cyberCrime' ? 'Name' : 'Name'}</TableCell>
            <TableCell>{type === 'users' ? 'Phone Number' : type === 'bikeRides' ? 'Pickup Location' : type === 'cyberCrime' ? 'Phone Number' : 'Address'}</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.username || item.name || item.rideId || item.requestId}</TableCell>
              <TableCell>{item.email || item.userName || item.phoneNumber || item.address}</TableCell>
              <TableCell>{item.phonenumber || item.pickupLocation || item.phoneNumber || item.location}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleClickOpen(type, item)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(type, item.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => setSelectedView('users')}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button onClick={() => setSelectedView('bikeRides')}>
              <ListItemIcon>
                <DirectionsBike />
              </ListItemIcon>
              <ListItemText primary="Manage Bike Rides" />
            </ListItem>
            <ListItem button onClick={() => setSelectedView('cyberCrime')}>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText primary="Cyber Crime Complaints" />
            </ListItem>
            <ListItem button onClick={() => setSelectedView('napkinRequests')}>
              <ListItemIcon>
                <LocalHospital />
              </ListItemIcon>
              <ListItemText primary="Napkin Requests" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Container>
          {selectedView === 'users' && renderTable(users, 'users')}
          {selectedView === 'bikeRides' && renderTable(bikeRides, 'bikeRides')}
          {selectedView === 'cyberCrime' && renderTable(complaints, 'cyberCrime')}
          {selectedView === 'napkinRequests' && renderTable(napkinRequests, 'napkinRequests')}
        </Container>
      </Box>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{dialogType === 'users' ? 'User' : dialogType === 'bikeRides' ? 'Bike Ride' : dialogType === 'cyberCrime' ? 'Complaint' : 'Napkin Request'} Details</DialogTitle>
        <DialogContent>
          {dialogType === 'users' && (
            <>
              <TextField margin="dense" name="username" label="Username" value={formData.username} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="email" label="Email" value={formData.email} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="phonenumber" label="Phone Number" value={formData.phonenumber} onChange={handleInputChange} fullWidth />
            </>
          )}
          {dialogType === 'bikeRides' && (
            <>
              <TextField margin="dense" name="rideId" label="Ride ID" value={formData.rideId} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="userName" label="User Name" value={formData.userName} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="pickupLocation" label="Pickup Location" value={formData.pickupLocation} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="dropLocation" label="Drop Location" value={formData.dropLocation} onChange={handleInputChange} fullWidth />
            </>
          )}
          {dialogType === 'cyberCrime' && (
            <>
              <TextField margin="dense" name="name" label="Name" value={formData.name} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="complaintText" label="Complaint Text" value={formData.complaintText} onChange={handleInputChange} fullWidth multiline rows={4} />
            </>
          )}
          {dialogType === 'napkinRequests' && (
            <>
              <TextField margin="dense" name="name" label="Name" value={formData.name} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="address" label="Address" value={formData.address} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="location" label="Location" value={formData.location} onChange={handleInputChange} fullWidth />
              <TextField margin="dense" name="requestDate" label="Request Date" value={formData.requestDate} onChange={handleInputChange} fullWidth />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;