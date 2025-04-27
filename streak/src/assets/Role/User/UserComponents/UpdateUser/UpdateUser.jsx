import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../../../../Context/AppContext';

export default function UpdateUser() {
    const { userId, userType } = useAppContext();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            setError('User ID is missing. Please log in again.');
            setLoading(false);
            return;
        }

        // Fetch current user data to populate the form
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/streak/api/users/get/${userId}`);
                const userData = response.data;
                setFormData({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || '',
                    password: '',  // Don't populate password for security
                    phone: userData.phone || '',
                    address: userData.address || '',
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load user data. Please try again.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('Cannot update profile without a valid user ID.');
            return;
        }
        try {
            await axios.patch(`http://localhost:8080/streak/api/users/update/${userId}`, formData);
            navigate(`/${userType}/${userId}/profile`);
        } catch (err) {
            setError('Failed to update user. Please try again.');
            console.error('Update error:', err);
        }
    };

    if (loading) {
        return <Typography>Loading user data...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
      <Container>
          <Typography variant="h4" gutterBottom>
              Update Profile
          </Typography>
          <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                placeholder="Leave empty to keep current password"
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                  Update
              </Button>
          </form>
      </Container>
    );
}

UpdateUser.propTypes = {
    userId: PropTypes.string,
};