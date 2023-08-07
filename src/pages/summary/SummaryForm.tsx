import { useState } from "react";
import Form from "react-bootstrap/Form";
import { FormGroup, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";

const SummaryForm = ({
  setOrderPhase,
}: {
  setOrderPhase: Dispatch<SetStateAction<string>>;
}) => {
  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOrderPhase("completed");
  };
  const popover = (
    <Popover>
      <Popover.Body>아이스크림이 실제로 배달되지는 않습니다.</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>약관 확인에 동의합니다.</span>
      </OverlayTrigger>
    </span>
  );
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isTermChecked}
          onChange={(e) => setIsTermChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </FormGroup>
      <Button variant="primary" type="submit" disabled={!isTermChecked}>
        주문 확인
      </Button>
    </Form>
  );
};

export default SummaryForm;
