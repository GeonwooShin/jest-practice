import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormGroup } from "react-bootstrap";

const SummaryForm = () => {
  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);
  const checkboxLabel = (
    <span>
      <span style={{ color: "blue" }}>약관 확인</span>에 동의합니다.
    </span>
  );
  return (
    <Form>
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
