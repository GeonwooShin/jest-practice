import { Alert } from "react-bootstrap";

const AlertBanner = ({
  message,
  variant,
}: {
  message?: string;
  variant?: string;
}) => {
  const alertMessage =
    message || "예상치 못한 에러가 발생했습니다. 다음에 다시 시도해주세요.";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
