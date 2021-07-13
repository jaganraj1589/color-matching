const model = {
  basicColor: [
    "blue",
    "cyan",
    "yellow",
    "green",
    "red",
    "hotpink",
    "purple",
    "orange",
  ],
  steps: 0,
  bgColor: [],
  chosenIndex: null,
  chosenColor: [],
  colorBoard: document.querySelector(".board"),
  target: Array.prototype.slice.call(document.getElementById("board").children),
  vor: [],
  shuffleBg: () => {
    model.bgColor = model.basicColor
      .map((item) => [item, item])
      .flat()
      .sort(() => Math.random() - 0.5);
  },
  incrementSteps: () => model.steps++,
};
const controller = {
  handleClick: (e) => {
    view.updateSteps(model.incrementSteps());

    currentElement = model.target.indexOf(e.target);
    e.target.style.backgroundColor = model.bgColor[currentElement];
    model.chosenIndex = e.indexOf(e.target);
    model.chosenColor.push(model.bgColor[currentElement]);
    e.target.classList.add("active");
    e.target.style.pointerEvents = "none";
    const activeEle = document.querySelectorAll(".active");
    console.log(model.chosenIndex, currentElement);

    if (model.chosenColor.length === 2 && currentElement != model.chosenIndex) {
      model.chosenColor.length = 0;
      let time = () => {
        activeEle.forEach(function (a) {
          a.removeAttribute("style");
          a.classList.remove("active");
        });
      };
      setTimeout(time, 600);
    }

    if (
      model.chosenColor.length === 2 &&
      currentElement === model.chosenIndex
    ) {
      model.chosenColor.length = 0;
      let time = () => {
        activeEle.forEach(function (a) {
          a.style.pointerEvents = "none";
          a.classList.remove("active");
        });
      };
      setTimeout(time, 600);
    }
  },
  load: (v) => {
    // let shuffled = model.bgColor.sort((a,b) => 0.5 - Math.random());
    // shuffled.forEach(function(e, index){
    //    model.vor.push({id : index, color: e})
    //  })
  },
};
const view = {
  pickColor: () => {},
  updateSteps: () => {
    document.getElementById("steps").innerHTML = `Steps: ${model.steps}`;
  },
};

model.colorBoard.addEventListener("click", controller.handleClick);
model.shuffleBg();
