import React from 'react';

import { Box, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';

import ExternalLink from '../../components/ExternalLink';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '80vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
    },
  },
  guestTitle: {
    margin: theme.spacing(0, 0, 0.5, 0),
  },
  guestSubtitle: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  iconLink: {
    color: theme.palette.grey[900],
    marginRight: theme.spacing(0.5),
  },
}));

const GuestModal = ({ guest }) => {
  const classes = useStyles();

  const socialIcons = (
    <>
      {guest?.social_fb && (
        <ExternalLink href={guest.social_fb} className={classes.iconLink}>
          <FacebookIcon />
        </ExternalLink>
      )}
      {guest?.social_tw && (
        <ExternalLink href={guest.social_tw} className={classes.iconLink}>
          <TwitterIcon />
        </ExternalLink>
      )}
      {guest?.social_ig && (
        <ExternalLink href={guest.social_ig} className={classes.iconLink}>
          <InstagramIcon />
        </ExternalLink>
      )}
    </>
  );

  return (
    <Box className={classes.modalContent}>
      <Typography variant="h4" className={classes.guestTitle}>
        {guest.name}
      </Typography>
      <Typography variant="h5" className={classes.guestSubtitle}>
        {guest.category}
      </Typography>
      {socialIcons}
      <Typography variant="body1">{guest.description}</Typography>
    </Box>
  );
};

export default GuestModal;
