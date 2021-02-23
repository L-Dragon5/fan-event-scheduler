import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-scroll';

import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BaseLayout from './BaseLayout';
import Copyright from './components/Copyright';

const useStyles = makeStyles((theme) => ({
  introSection: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(14, 2),
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20, 2, 16),
    },
  },
  introSectionContent: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    textAlign: 'center',
  },
  actions: {
    margin: theme.spacing(4, 'auto'),
    display: 'flex',
    maxWidth: theme.breakpoints.values.sm,
    '& > a': {
      margin: theme.spacing(0, 1),
    },
  },
  title: {
    flexGrow: 1,
    '& > a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
    },
  },
  mobileNav: {
    '& > a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
  },
  desktopNav: {
    '& > a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      padding: '12px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    '& > a:hover': {
      borderWidth: 2,
      borderStyle: 'none none solid',
      borderColor: theme.palette.primary.contrastText,
    },
  },
  featureSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 2),
  },
  pricingSection: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(10, 2),
  },
  pricingBox: {
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
  pricingBoxHeader: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    textTransform: 'uppercase',
    fontSize: '1.2rem',
    color: theme.palette.text.primary,
  },
  pricingBoxPrice: {
    padding: theme.spacing(2),
    fontSize: '3rem',
    color: theme.palette.text.primary,
  },
  pricingBoxFeatures: {
    margin: theme.spacing(1, 0, 2),
    padding: theme.spacing(0, 2),
  },
  faqSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 2),
  },
  footer: {
    padding: theme.spacing(10, 2),
    color: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[800],
  },
  footerSection: {
    display: 'flex',
    flex: '1 1 0',
    flexDirection: 'column',
    padding: theme.spacing(0, 4),
  },
}));

const Index = () => {
  const classes = useStyles();

  const navOffset = -65;

  const PricingCard = ({ plan, price, features }) => (
    <Paper className={classes.pricingBox}>
      <Typography className={classes.pricingBoxHeader}>{plan}</Typography>
      <Typography className={classes.pricingBoxPrice}>${price}/yr</Typography>
      <Box className={classes.pricingBoxFeatures}>
        {features.map((feature) => (
          <Typography key={feature}>{feature}</Typography>
        ))}
      </Box>

      <Button href="/register" variant="outlined" color="primary" size="large">
        Get Started
      </Button>
    </Paper>
  );

  return (
    <BaseLayout title="Home">
      <Helmet>
        <title>Schedule & Agenda Builder for Events | FES</title>
        <meta
          name="description"
          content="Make simple schedules and agendas for your virtual and in-person events. Try it now, for free."
        />
        <meta
          property="og:title"
          content="Schedule & Agenda Builder for Events | FES"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Make simple schedules and agendas for your virtual and in-person events. Try it now, for free."
        />
      </Helmet>

      <Box className={classes.nav}>
        <Hidden smDown>
          <AppBar position="fixed">
            <Container maxWidth="md">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <a href="#home">FES</a>
                </Typography>
                <nav className={classes.desktopNav}>
                  <Link to="home" spy smooth offset={navOffset}>
                    Home
                  </Link>
                  <Link to="features" spy smooth offset={navOffset}>
                    Features
                  </Link>
                  <Link to="pricing" spy smooth offset={navOffset}>
                    Pricing
                  </Link>
                  <Link to="faq" spy smooth offset={navOffset}>
                    FAQs
                  </Link>
                  <a href="/login">Login</a>
                </nav>
              </Toolbar>
            </Container>
          </AppBar>
        </Hidden>
      </Box>

      <Box id="home" className={classes.introSection}>
        <Container maxWidth="md" style={{ display: 'flex' }}>
          <Box className={classes.introSectionContent}>
            <Typography component="h1" variant="h2">
              Fan Event Scheduler
            </Typography>
            <Typography component="h2" variant="h5">
              Built for conventions, conferences, and fan events
            </Typography>
            <Typography variant="subtitle1">
              Make simple schedules and agendas for your virtual and in-person
              events.
            </Typography>
            <Box className={classes.actions}>
              <Button
                href="/register"
                variant="contained"
                color="primary"
                size="large"
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="features"
                smooth
                spy
                offset={navOffset}
                variant="outlined"
                color="primary"
                size="large"
              >
                Features
              </Button>
              <Button
                component={InertiaLink}
                href="/s/c2c5ed4f-f3ac-4bba-9e22-7a756f53ca54"
                variant="outlined"
                color="secondary"
              >
                Example Schedule
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box id="features" className={classes.featureSection}>
        <Container maxWidth="md">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            style={{ marginBottom: '32px' }}
          >
            Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography component="h4" variant="h6">
                CMS Features
              </Typography>
              <Typography component="h5" variant="body1">
                Manage your event schedules within our easy to use admin
                interface. Just add, edit, and delete your content as needed and
                it will automatically update and be viewable for all your
                attendees.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography component="h4" variant="h6">
                Accessible on any modern device
              </Typography>
              <Typography component="h5" variant="body1">
                Designed and built responsively, all web pages on the site for
                both admin and attendees can be accessed and viewed on any
                modern desktop, tablet, or mobile device using up-to-date
                internet browsers. (Internet Explorer not supported)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Typography component="h4" variant="h6">
                Unlimited Content
              </Typography>
              <Typography component="h5" variant="body1">
                Although you are limited to how many schedules your account can
                manage, you can add and edit as much content within those
                schedules as you want. Whether your event handles a 1-day small
                venue or a multi-day large conference hall, FES can handle it.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="pricing" className={classes.pricingSection}>
        <Container maxWidth="md">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            style={{ marginBottom: '32px' }}
          >
            Pricing
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <PricingCard
                plan="Free"
                price="0"
                features={['1 Schedule', 'Email support', "It's free :D"]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PricingCard
                plan="Supporter"
                price="50"
                features={[
                  '3 Schedules',
                  'Priority email support',
                  'Event displayed here as supporter',
                ]}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="faq" className={classes.faqSection}>
        <Container maxWidth="md">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            style={{ marginBottom: '32px' }}
          >
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Typography component="h4" variant="h6">
                Is this free?
              </Typography>
              <Typography component="h5" variant="body1">
                When you register a new account, it will automatically be on the
                free plan. If you like our service and want to support it in
                development of new features, you can subscribe to one of our
                paid options.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Typography component="h4" variant="h6">
                How can I trust you with my payment info?
              </Typography>
              <Typography component="h5" variant="body1">
                We use Stripe for all our payment processing. All payment
                transactions go through them and all information will use their
                encryption. The only data we store, would be the identifier to
                your stripe subscription payment.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Typography component="h4" variant="h6">
                How is this different from any other event management software?
              </Typography>
              <Typography component="h5" variant="body1">
                There are a lot of different types of event management software
                on the market already. However, a lot of them can be extremely
                cost-prohibitive and most don&apos;t offer any sort of free
                plans. We wanted to provide a solution for smaller,
                budget-constrained events.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Typography component="h4" variant="h6">
                Who are you?
              </Typography>
              <Typography component="h5" variant="body1">
                This was developed in part by a founder of an anime convention
                who happens to do a lot of web development professionally as
                well as for fun.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className={classes.footer}>
        <Container maxWidth="md" style={{ display: 'flex' }}>
          <Box className={classes.footerSection}>
            <Typography variant="body2" gutterBottom>
              This website is in what we consider an alpha-stage. Designed,
              developed, and maintained by a single person. We hope to have this
              service grow with more features and users.
            </Typography>
            <Copyright />
          </Box>

          <Box className={classes.footerSection}>
            <Typography variant="body2" gutterBottom>
              If you need assistance or have any feature requests send us an
              email at:{' '}
              <span
                style={{
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  padding: '4px',
                }}
              >
                support@fesapp.net
              </span>
            </Typography>
          </Box>
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default Index;
