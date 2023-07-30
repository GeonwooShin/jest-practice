import { useState } from "react";

const App = () => {
  const [isClicked, setIsCliked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const btnText = isClicked ? "Red" : "Blue";
  const handleButton = () => {
    setIsCliked(!isClicked);
  };
  return (
    <div>
      <button
        style={
          isClicked ? { backgroundColor: "blue" } : { backgroundColor: "red" }
        }
        onClick={handleButton}
        disabled={isDisabled}
      >
        Change to {btnText}
      </button>
      <input
        type="checkbox"
        onChange={(e) => setIsDisabled(e.target.checked)}
      />
    </div>
  );
};
export default App;
