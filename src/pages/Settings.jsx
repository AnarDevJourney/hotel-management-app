// Component to update settings
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

// Styled components
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Settings = () => {
  return (
    <>
      <Row>
        <Heading>Settings</Heading>
      </Row>
      <Row>
        <UpdateSettingsForm />
      </Row>
    </>
  );
};

export default Settings;
