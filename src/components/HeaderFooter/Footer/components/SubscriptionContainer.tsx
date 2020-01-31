import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  CircularProgress,
  Grid
} from "@material-ui/core";


//import { Services } from "../../../helpers/services";

export interface ISubscriptionContainerProps {
  i18n: Map<string, string>;
  initial: any;
}

const SubscriptionContainer: React.SFC<ISubscriptionContainerProps> = props => {
  const { i18n, initial, ...rest } = props;
  const initialState = {
    email: "",
    errors: { email: false },
    success: { email: "" },
    popupMsg: {
      title: "",
      body: ""
    }
  };
  const [subscription, setSubscription] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const postSuscpripcion = async (email: String) => {
    let cobId = initial.currentSelection.cobrandedId,
      culCode = initial.currentSelection.cultureCode,
      url = `${initial.footerItems.footerSubscription.url}/cd,c2-sin,-5-${culCode},${cobId},${email}`;
//    return Services.postSubscription(url, {});
  };

  const handleSubmitSubscription = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let editSubscription = { ...subscription };
    setLoading(true);
    let isValid = validateForm();
    if (isValid) {
      postSuscpripcion(subscription.email)
        .then(() => {
          editSubscription.errors.email = false;
          editSubscription.success.email = "subscription-success";
          editSubscription.popupMsg.title = i18n.get("footer.email.popup.title.success") || "";
          editSubscription.popupMsg.body = i18n.get("footer.email.popup.body.success") || "";
          setSubscription(editSubscription);
          handleClickOpen();
          setLoading(false);
        })
        .catch(() => {
          editSubscription.errors.email = true;
          editSubscription.success.email = "";
          editSubscription.popupMsg.title = i18n.get("footer.email.popup.title.error") || "";
          editSubscription.popupMsg.body = i18n.get("footer.email.popup.body.error") || "";
          setSubscription(editSubscription);
          handleClickOpen();
          setLoading(false);
        });
    } else {
      //error
      editSubscription.errors.email = true;
      editSubscription.success.email = "";
      editSubscription.popupMsg.title = i18n.get("footer.email.popup.title.error") || "";
      editSubscription.popupMsg.body = i18n.get("footer.email.popup.body.error") || "";
      setSubscription(editSubscription);
      handleClickOpen();
      setLoading(false);
    }
  };
  const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSubscription({
      ...subscription,
      [event.target.name]: event.target.value
    });
  };
  const validateForm = (): boolean => {
    let regexpEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regexpEmail.test(subscription.email);
  };
  const clearForm = (): void => {
    setSubscription(initialState);
  };
  return (
    <Grid container item xs={12} sm={4} className="footer-subscriber">
      <h5>{i18n.get("footer.offers.release")}</h5>
      <h6>{i18n.get("footer.hotels.flights.offers")}</h6>
      <form onSubmit={handleSubmitSubscription} noValidate>
        <TextField
          id="subscriber-email"
          name="email"
          label={i18n.get("footer.intruduce.mail")}
          margin="normal"
          className={subscription.success.email}
          type="email"
          disabled={loading}
          value={subscription.email}
          onChange={handleUserInputChange}
          error={subscription.errors.email}
          autoComplete="off"
          fullWidth
        />
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="alert-dialog-slide-title">
            {subscription.popupMsg.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {subscription.popupMsg.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" className="primary-button" onClick={handleClose}>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          type="submit"
          variant="outlined"
          className="primary-button"
          disabled={loading}
          fullWidth>
          {!loading && i18n.get("footer.subscribe")}
          {loading && <CircularProgress size={24} className="subscription-loader" />}
        </Button>
      </form>
    </Grid>
  );
};

export default SubscriptionContainer;
