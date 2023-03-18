// components
const elementIdentifier = document.getElementById("elementName");
const search = document.getElementById("search");
const main = document.getElementById("main");
const inputArea = document.querySelector(".inputArea");
const helperText = document.querySelector(".helperText");
const footer = document.querySelector(".footer");

// state management
let displayingInfo = false;

// fetch method
async function fetchElementFromAPI(url) {
  const response = await fetch(url);
  const data = response.json();
  return data; 
}

// display fetched info
function displayInfo(info) {
  displayingInfo = true;

  main.removeChild(inputArea);
  main.removeChild(helperText);
  document.body.removeChild(main);

  let newMain = document.createElement("div");
  newMain.classList.add("newMain");

  let exitContainer = document.createElement("div");
  exitContainer.classList.add("exitContainer");

  let exitIcon = document.createElement("img");
  exitIcon.src = "exit.svg";
  exitIcon.addEventListener("mouseover", () => exitIcon.src = "exit2.svg");
  exitIcon.addEventListener("mouseout", () => exitIcon.src = "exit.svg");
  exitIcon.classList.add("exitIcon");

  let symbolContainer = document.createElement("div");
  symbolContainer.classList.add("symbolContainer");

  let symbol = document.createElement("div");
  symbol.classList.add("symbol");
  symbol.style.backgroundColor = "#" + info.cpkHexColor;

  let symbolAtomicMass = document.createElement("h1");
  symbolAtomicMass.classList.add("symbolAtomicMass");
  symbolAtomicMass.innerText = info.atomicMass;

  let symbolText = document.createElement("h1");
  symbolText.classList.add("symbolText");
  symbolText.innerText = info.symbol;

  let symbolAtomicNumber = document.createElement("h1");
  symbolAtomicNumber.classList.add("symbolAtomicNumber");
  symbolAtomicNumber.innerText = info.atomicNumber;

  let remInfo = document.createElement("div");
  remInfo.classList.add("remInfo");
  let remInfoLeft = document.createElement("div");
  remInfoLeft.classList.add("remInfoLeft");
  let remInfoRight = document.createElement("div");
  remInfoRight.classList.add("remInfoRight");

  let atomicNumber = document.createElement("p");
  let s = document.createElement("p");
  let name = document.createElement("p");
  let atomicMass = document.createElement("p");
  let electronicConfiguration = document.createElement("p");

  atomicNumber.classList.add("remText");
  s.classList.add("remText");
  name.classList.add("remText");
  atomicMass.classList.add("remText");
  electronicConfiguration.classList.add("remText");

  atomicNumber.innerText = "Atomic number : " + info.atomicNumber;
  s.innerText = "Symbol : " + info.symbol;
  name.innerText = "Name : " + info.name;
  atomicMass.innerText = "Atomic mass : " + info.atomicMass;
  electronicConfiguration.innerText =
    "Electronic configuration : " + info.electronicConfiguration;

  let oxidationStates = document.createElement("p");
  let standardState = document.createElement("p");
  let density = document.createElement("p");
  let groupBlock = document.createElement("p");
  let yearDiscovered = document.createElement("p");

  oxidationStates.classList.add("remText");
  standardState.classList.add("remText");
  density.classList.add("remText");
  groupBlock.classList.add("remText");
  yearDiscovered.classList.add("remText");

  oxidationStates.innerText = "Oxidation states : " + info.oxidationStates;
  standardState.innerText = "Standard physical state : " + info.standardState;
  density.innerText = "Density : " + info.density + " g/cm^3";
  groupBlock.innerText = "Type : " + info.groupBlock;
  yearDiscovered.innerText = "Year discovered : " + info.yearDiscovered;

  document.body.appendChild(newMain);
  newMain.appendChild(exitContainer);
  exitContainer.appendChild(exitIcon);
  newMain.appendChild(symbolContainer);
  symbolContainer.appendChild(symbol);
  symbol.appendChild(symbolAtomicMass);
  symbol.appendChild(symbolText);
  symbol.appendChild(symbolAtomicNumber);
  newMain.appendChild(remInfo);
  remInfo.appendChild(remInfoLeft);
  remInfo.appendChild(remInfoRight);
  remInfoLeft.appendChild(atomicNumber);
  remInfoLeft.appendChild(s);
  remInfoLeft.appendChild(name);
  remInfoLeft.appendChild(atomicMass);
  remInfoLeft.appendChild(electronicConfiguration);
  remInfoRight.appendChild(oxidationStates);
  remInfoRight.appendChild(standardState);
  remInfoRight.appendChild(density);
  remInfoRight.appendChild(groupBlock);
  remInfoRight.appendChild(yearDiscovered);

  exitIcon.addEventListener("click", () => {
    document.body.removeChild(newMain);
    document.body.appendChild(main);
    main.appendChild(inputArea);
    main.appendChild(helperText);
    main.appendChild(footer);
    displayingInfo = false;
  });
}

// fetch element according to given info
async function fetchElement(info) {
  let element = null;
  if (isNaN(info)) {
    if (info.length <= 2) {
      // fetch by symbol
      element = await fetchElementFromAPI(`https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${info.toString().toLowerCase()}`);    
    } else {
      // fetch by name
      element = await fetchElementFromAPI(`https://neelpatel05.pythonanywhere.com/element/atomicname?atomicname=${info.toString().toLowerCase()}`);
    }
  } else {
    // fetch my number
    element = await fetchElementFromAPI(`https://neelpatel05.pythonanywhere.com/element/atomicnumber?atomicnumber=${info.toString()}`);
  }

  if (element.message =="does not exists") {
    window.alert("This element does not exist. Try again.");
  } else displayInfo(element);
}

// focus on input box on window load
window.addEventListener("load", () => {
  elementIdentifier.focus();
});
window.addEventListener("keypress", async (e) => {
  if ((e.key == "Enter") & (elementIdentifier.value != "")) {
    await fetchElement(elementIdentifier.value);
  }
});
search.addEventListener("click", async () => {
  if (elementIdentifier.value != "") {
    await fetchElement(elementIdentifier.value);
  }
});
