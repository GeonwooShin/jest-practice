import { useState } from "react";

export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

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
        style={{
          backgroundColor: isDisabled ? "gray" : isClicked ? "blue" : "red",
        }}
        onClick={handleButton}
        disabled={isDisabled}
      >
        Change to {btnText}
      </button>
      <label>
        <input
          type="checkbox"
          onChange={(e) => setIsDisabled(e.target.checked)}
        />
        버튼 비활성화
      </label>
    </div>
  );
};
export default App;
