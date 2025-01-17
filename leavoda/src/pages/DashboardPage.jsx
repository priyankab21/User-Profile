import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardContent, Typography, Avatar, Grid, Box } from "@mui/material";
import axios from "axios";
import '../css/DashboardPage.scss'; // Importing SCSS for custom styles

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/${user.id}`);
          setProfile(response.data.user);
        } catch (error) {
          console.error("Failed to fetch profile:", error.message);
        }
      };
      fetchProfile();
    }
  }, [user, navigate]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="dashboard-container">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card className="profile-card">
            <CardContent>
              <Box className="profile-header">
                <Avatar alt={profile.name} src={profile.profileImage} sx={{ width: 100, height: 100 }} />
                <Typography variant="h5" className="profile-name">
                  {profile.name}
                </Typography>
              </Box>

              <Typography variant="subtitle1" className="profile-info">
                <strong>Gender:</strong> {profile.gender}
              </Typography>
              <Typography variant="subtitle1" className="profile-info">
                <strong>Age:</strong> {profile.age}
              </Typography>
              <Typography variant="subtitle1" className="profile-info">
                <strong>Address:</strong> {profile.address.fullAddress}
              </Typography>
              <Typography variant="subtitle1" className="profile-info">
                <strong>Company:</strong> {profile.workingPlace.companyName}
              </Typography>
              <Typography variant="subtitle1" className="profile-info">
                <strong>Job Title:</strong> {profile.workingPlace.jobTitle}
              </Typography>
              <Typography variant="subtitle1" className="profile-info">
                <strong>Email:</strong> {profile.contactInformation.email}
              </Typography>
              <Typography variant="subtitle1" className="profile-info">
                <strong>Phone:</strong> {profile.contactInformation.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
