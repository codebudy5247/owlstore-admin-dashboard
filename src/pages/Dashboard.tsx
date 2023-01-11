import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar";
import YearlySales from "../components/YearlySales";
import CurrentBalance from "../components/CurrentBalance";
import EcommerceWidgetSummary from "../components/WidgetSummary";
import { useTheme } from "@mui/material/styles";
import { green, grey, red } from "@mui/material/colors";

const mdTheme = createTheme();

const Dashboard = () => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Navbar title="Dashboard" />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <EcommerceWidgetSummary
                  title="Product Sold"
                  percent={2.6}
                  total={765}
                  chartColor={green["A700"]}
                  chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <EcommerceWidgetSummary
                  title="Total Balance"
                  percent={-0.1}
                  total={18765}
                  chartColor={red[500]}
                  chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <EcommerceWidgetSummary
                  title="Sales Profit"
                  percent={0.6}
                  total={4876}
                  chartColor={grey[500]}
                  chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
                />
              </Grid>
              <Grid item xs={12} md={18} lg={18}>
                <YearlySales />
              </Grid>
              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={4}>
                <CurrentBalance />
              </Grid> */}
              {/* Recent Orders */}
              <Grid item xs={12}>
                {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper> */}
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
