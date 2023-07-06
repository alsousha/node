export const ready = function () {
  fetch('students', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': '',
    },
    body: JSON.stringify(),
  })
    .then(res => res.json())
    .then(res => {
      showClass(res);
    });
};
export const showClass = function (obj) {
  //   console.log("show");
  //   console.log(obj);
  obj.sort((a, b) =>
    a.lastname > b.lastname ? 1 : b.lastname > a.lastname ? -1 : 0,
  );
  let i = 0;
  let activeClass = '';
  const list = obj.slice(1).map(el => {
    activeClass = i == 0 ? 'active' : '';
    return `
            <li class="student ${activeClass} d-flex jcsb aic g1 w100 mb2" id="student_${++i}">
			<div class="user_surname info">${el.lastname}</div>
			<div class="user_name info">${el.name}</div>
            <div class="user_age info">${el.age} </div>
			<button class="btn_edit bstyle">Edit</button>
			<button class="btn_delete bstyle">Delete</button></li>
            `;
  });
  document.querySelector('.students__wrap').innerHTML = `
            <ol class="class_inner w100 mt6">${list.join('')}</ol>
            `;
};
export const buildLibrary = function (data, parentElement) {
  const gallery = document.querySelector(parentElement);

  data.forEach(img => {
    const figure = document.createElement('figure');
    figure.innerHTML = `
  	   <img src=${img.url} alt=${img.alt}>
  	  `;
    gallery.append(figure);
  });
};
export const buildUserLibrary = function (data, parentElement) {
  const gallery = document.querySelector(parentElement);

  data.forEach(user => {
    const figure = document.createElement('li');
    figure.innerHTML = `
      <p>${user.name}</p>
  	   <img src=${user.img} alt=userPic>
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
  if (elem !== null) elem.classList.add('active');
};
export const removeActiveClass = function (elemClass) {
  const elem = document.querySelector(`.${elemClass}.active`);
  if (elem !== null) elem.classList.remove('active');
};
export const addInputsForEdit = function (...elementWrap) {
  for (let elem of elementWrap) {
    //add inputs
    elem.innerHTML = '<input value="' + elem.innerText + '">';
  }
};
export const removeInputsForEdit = function (
  prevActiveStudentItem,
  ...elementWrap
) {
  for (let elem of elementWrap) {
    const elemWrap = prevActiveStudentItem.querySelector(elem);
    //remove inputs
    //console.log(elemWrap.querySelector("input"));
    if (elemWrap.querySelector('input') !== null)
      elemWrap.innerHTML = elemWrap.querySelector('input').value;
  }
};
