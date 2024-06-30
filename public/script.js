async function showdata(cat) {
  const data = await eel.dat(cat)();
  data.forEach((item) => {
    htm = `<td ><button class='item' onclick='order("${cat}" ,"${item[0]}")' >${item[1]}</button></td>
    <td>${item[2]}</td>
    <td>${item[3]}</td>
    <td>${item[4]}</td>`;
    document.querySelector(`#${cat}`).insertAdjacentHTML("beforeend", htm);
    console.log(data);
  });
}
let k;
function mencha(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "initial";
  evt.currentTarget.className += " active";
}

const order = function (cat, prdno) {
  eel.placeinOrder(prdno, cat);
  updateOrder();
};

async function updateOrder() {
  // Get the order data
  const k = await eel.getorder()();

  // Select the table element
  const table = document.querySelector("#order");

  // Delete all rows except the header
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  let pr = 0;
  for (const item in k) {
    pr += k[item][0];
    const htm = `<tr>
                  <td><button class='item'>${item}</button></td>
                  <td>${k[item][0]}</td>
                  <td>${k[item][1]}</td>
                </tr>`;
    table.insertAdjacentHTML("beforeend", htm);
  }
  document.querySelector(".sum").innerHTML = ` Amount : ${pr}`;
}

document
  .querySelector(".order-btn")
  .addEventListener("click", async function () {
    eel.ordernow()();
    eel.clo()();
    updateOrder();
    const total = await eel.edf()();
    addtotal(total);
  });

document.querySelector(".new-btn").addEventListener("click", function () {
  eel.clo()();
  updateOrder();
});

function addtotal(t) {
  document.querySelector(".tot").innerHTML = `Total Amount : ${t}`;
}
