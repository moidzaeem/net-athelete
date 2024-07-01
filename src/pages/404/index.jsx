// 404Page.js
import { Link } from "react-router-dom";
import { Typography, Button, Container, Grid } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item>
          <Typography variant="h1" align="center" gutterBottom>
            404 - Page Not Found
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" align="center" gutterBottom>
            Oops! The page you are looking for does not exist.
          </Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to="/" variant="contained" color="primary">
            Return to Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
