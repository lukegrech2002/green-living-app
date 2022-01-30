import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

const ShareholderForm = ({
  formId,
  shareholderForm,
  forNewShareholder = true,
}) => {
  const classes = componentStyles();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [permission, setPermissions] = useState("");

  const contentType = "application/json";

  const [form, setForm] = useState({
    name: shareholderForm.name,
    surname: shareholderForm.surname,
    email: shareholderForm.email,
    passportExpiry: shareholderForm.passportExpiry,
    otherEmails: shareholderForm.otherEmails,
    receiveEmail: shareholderForm.receiveEmail,
  });

  const putData = async (form) => {
    const { id } = router.query;
    try {
      const res = await fetch(`/api/shareholders/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/shareholders/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update shareholder");
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/shareholders", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }
      router.push("/");
    } catch (error) {
      setMessage("Failed to add shareholder");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.name === "disabled" ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleDropdownChange = (event) => {
    setPermissions(event.target.value);
    form.receiveEmail = event.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewShareholder ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.surname) err.owner_name = "Surname is required";
    return err;
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form
            id={formId}
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <Typography>Name</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              maxLength="20"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
              fullWidth
            />

            <Typography>Surname</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              maxLength="20"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              required
              fullWidth
            />

            <Typography>Email Address</Typography>
            <TextField
              name="email"
              variant="outlined"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
            />

            <Typography>Passport Expiry</Typography>
            <TextField
              name="passportExpiry"
              variant="outlined"
              margin="normal"
              value={form.passportExpiry}
              onChange={handleChange}
              required
              fullWidth
            />

            <Typography>Other Emails</Typography>
            <TextField
              name="otherEmails"
              variant="outlined"
              margin="normal"
              value={form.otherEmails}
              onChange={handleChange}
              required
              fullWidth
            />

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>
                Receive Emails
              </InputLabel>
              <Select
                name="receiveEmail"
                value={form.receiveEmail}
                onChange={handleDropdownChange}
                label="receiveEmail"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Shareholder
            </Button>
          </form>
          <p>{message}</p>
          <div>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ShareholderForm;