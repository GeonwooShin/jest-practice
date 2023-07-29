import { useState } from "react";

const App = () => {
  const [isClicked, setIsCliked] = useState<boolean>(false);
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
      >
        Change to {btnText}
      </button>
    </div>
  );
};
export default App;
