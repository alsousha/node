export const ready = function () {
  fetch("students", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .then((res) => {
      showClass(res);
    });
};
export const showClass = function (obj) {
  obj.sort((a, b) =>
    a.lastname > b.lastname ? 1 : b.lastname > a.lastname ? -1 : 0
  );
  let i = 0;
  let activeClass = "";
  const list = obj.slice(1).map((el) => {
    activeClass = i == 0 ? "active" : "";
    return `
            <li class="student ${activeClass}" id="student_${++i}">${
      el.lastname
    } ${el.name} ${
      el.age
    } years old <button class="btn_delete" data-stud_id ="${i}">Delete</button></li>
            `;
  });
  document.querySelector(".students__wrap").innerHTML = `
            <ol class="class_inner">${list.join("")}</ol>
            `;
};
export const buildLibrary = function (data, parentElement) {
  const gallery = document.querySelector(parentElement);

  data.forEach((img) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
  	   <img src=${img.url} alt=${img.alt}>
  	  `;
    gallery.append(figure);
  });
};
//get parent by class
export const parentByClass = function (item, className) {
  var node = item;

  while (node) {
    if (node.classList.contains(className)) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};
//toggle active element
export const addActiveClass = function (elem) {
  if (elem !== null) elem.classList.add("active");
};
export const removeActiveClass = function (elemClass) {
  const elem = document.querySelector(`.${elemClass}.active`);
  if (elem !== null) elem.classList.remove("active");
};
