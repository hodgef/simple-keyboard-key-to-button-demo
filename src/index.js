import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "@ .com {space}"
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "@ .com {space}"
    ]
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}

const keyToButton = (event, state) => {
  let layoutKeyName = keyboard.physicalKeyboard.getSimpleKeyboardLayoutKey(
    event
  );

  if (layoutKeyName === "shiftleft" || layoutKeyName === "shiftright") {
    layoutKeyName = "shift";
  }

  if (layoutKeyName === "capslock") {
    layoutKeyName = "lock";
  }

  const buttonElement =
    keyboard.getButtonElement(layoutKeyName) ||
    keyboard.getButtonElement(`{${layoutKeyName}}`);

  if (!buttonElement || !state) return;

  const singleButtonElement = Array.isArray(buttonElement)
    ? buttonElement[0]
    : buttonElement;

  if (state === "onpointerdown") {
    singleButtonElement.classList.add("hg-activeButton");
  }

  if (state === "onpointerup") {
    singleButtonElement.classList.remove("hg-activeButton");
  }

  singleButtonElement[state]();

  console.log("buttonElement", singleButtonElement);
};

document.addEventListener("keydown", event =>
  keyToButton(event, "onpointerdown")
);
document.addEventListener("keyup", event => keyToButton(event, "onpointerup"));
