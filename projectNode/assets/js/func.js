export const ready = function () {
    fetch("students", {
        method: "POST",
        headers: {
        Accept: "application/json, text/plain, */*",
        //'Content-Type': 'application/json'
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
    obj.sort((a,b) => (a.lastname > b.lastname) ? 1 : ((b.lastname > a.lastname) ? -1 : 0));

    const list = obj.slice(1).map((el) => {
        return `
            <li><div class="student">${el.lastname}-${el.name}-${el.age}</div></li>
            `;
    });
    document.querySelector(".students__wrap").innerHTML = `
            <ol>${list.join("")}</ol>
            `;
};
