
const areaVisualizer = () => {
  var areas = document.querySelectorAll("area");
  areas.forEach(function (area) {
    var coords = area.coords.split(",");
    var shape = area.shape;
    var div = document.createElement("div");
    div.classList.add("myDiv");
    div.style.position = "absolute";
    div.style.border = "2px solid red";
    div.style.pointerEvents = "none"; // Per evitare di interferire con i clic
    if (shape === "rect") {
      div.style.left = coords[0] + "px";
      div.style.top = coords[1] + "px";
      div.style.width = coords[2] - coords[0] + "px";
      div.style.height = coords[3] - coords[1] + "px";
    }

    document.querySelector(".ct_space.lslide").appendChild(div);
  });
};
areaVisualizer();
