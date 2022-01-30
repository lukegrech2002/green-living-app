import AdminActivityForm from "@/components/AdminActivityForm";

const AddActivity = () => {
  const activityForm = {
    name: "",
    surname: "",
    email: "",
    passportExpiry: "",
    otherEmails: [],
    receiveEmail: "",
  };

  return (
    <div>
      <h1>New Activity</h1>
      <AdminActivityForm
        formId="add-shareholder-form"
        activityForm={activityForm}
      />
    </div>
  );
};

export default AddActivity;