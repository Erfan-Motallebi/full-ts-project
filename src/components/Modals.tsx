import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

type Props = {
  modalContent: string;
};

const Modals: React.FC<Props> = ({ modalContent }) => {
  const classes = useStyles();
  const [modalOpen, setModal] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setModal(false);
  };

  useEffect(() => {
    const modalTimeOut = setTimeout(() => {
      handleOpen();
    }, 500);
    return () => {
      clearTimeout(modalTimeOut);
    };
  }, []);

  return (
    <Container className={classes.root}>
      <Snackbar open={modalOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {modalContent}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Modals;
