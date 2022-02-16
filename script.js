
let m = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let offset = 0;
if (localStorage.getItem("offset")) offset = Number(localStorage.getItem("offset"));

function get(offset, d) {
  if (offset != null && offset != undefined)
    d.setMonth(d.getMonth() + Number(offset));

  let month = d.getMonth();
  let date = d.getDate();
  let year = d.getFullYear();
  let days = new Date(year, month + 1, 0).getDate();

  let weeks = parseInt(days / 7);

  let general = [];
  let iter = 0;

  for (let i = 1; i < days; i++) {
    if (general[iter] == undefined) general[iter] = [];
    general[iter].push({
      date: i,
      passed: i < date,
      today: i == date,
    });
    if (i % 7 == 0) iter++;
    if (i + 1 == days) {
      let calendar = {
        month,
        monthName: m[month],
        date,
        year,
        days,
        weeks,
        general,
      };

      return calendar;
    }
  }
}

function save() {
  localStorage.setItem("offset", offset);
}
function left() {
  offset = offset - 1;
  save();
  load();
}
function right() {
  offset = offset + 1;
  save();
  load();
}

function load() {
  let c = get(offset, new Date());
  let elem = document.getElementById('calendar');
  elem.innerHTML = '';
  document.getElementById('month').innerHTML = c.monthName;
  document.getElementById('year').innerHTML = c.year;
  for(let i = 0; i < c.general.length; i++) {
    let r = document.createElement('div');
    r.className = 'row';
    for(let k = 0; k < c.general[i].length; k++) {
      let t = c.general[i][k];
      let e = document.createElement('div');
      e.className = 'day';
      let l = document.createElement('label');
      l.innerHTML = t.date;
      let p = document.createElement('p');
      p.innerHTML = `Some text.`;
      e.appendChild(l);
      e.appendChild(p);
      r.appendChild(e);
    }
    elem.appendChild(r);
  }
}

load();
