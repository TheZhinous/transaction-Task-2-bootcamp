const loadDataBtn = document.querySelector(".load-data");
const totalList = document.querySelector(".transaction-list");
const searchBoxContainer = document.querySelector(".search-box_container");
const searchBox = document.querySelector(".search-box");
const bodyTable = document.querySelector(".table-body");
const sortDate = document.querySelector(".sorting-date");
const sortPrice = document.querySelector(".sorting-price");

// const app = axios.create({
//   baseURL: "http://localhost:3000/transactions",
// });

// *events
let allData = [];
const filters = {
  order: "",
  type: "",
};

loadDataBtn.addEventListener("click", (e) => {
  fetch("http://localhost:3000/transactions", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      loadDataBtn.classList.add("hidden");
      totalList.classList.remove("hidden");
      searchBoxContainer.classList.remove("hidden");
      allData = res;
      domRendering(allData);
    })
    .catch((err) => console.log(err));
});

searchBox.addEventListener("input", (e) => {
  const query = e.target.value;
  fetch(`http://localhost:3000/transactions?refId_like=${query}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      domRendering(res);
      // console.log(res);
    })
    .catch((err) => console.log(err));
});

sortDate.addEventListener("click", (e) => {
  filters.type = "date";
  sortDate.classList.contains("asce")
    ? (filters.order = "asce")
    : (filters.order = "desc");
  sortDate.classList.toggle("asce");
  filteringData(filters);
});

sortPrice.addEventListener("click", (e) => {
  filters.type = "price";
  sortPrice.classList.contains("asce")
    ? (filters.order = "asce")
    : (filters.order = "desc");
  sortPrice.classList.toggle("asce");
  filteringData(filters);
});

function domRendering(_data) {
  let result = "";
  _data.map((action) => {
    result += `<tr>
                <td class="data-number">${action.id}</td>
                <td class='${`data-type ${
                  action.type == "افزایش اعتبار" ? "green" : "red"
                }`}'>${action.type}</td>
                <td class="data-price">${Number(
                  action.price
                ).toLocaleString()}</td>
                <td class="data-id">${action.refId}</td>
                <td class="data-time">${new Date(
                  action.date
                ).toLocaleDateString("fa-IR")} ساعت ${new Date(
      action.date
    ).toLocaleTimeString("fa-IR")}</td>
              </tr>`;
  });
  bodyTable.innerHTML = result;
}

function filteringData(_filters) {
  const { type, order } = _filters;
  console.log(type, order);
  switch (type) {
    case "price": {
      fetch(`http://localhost:3000/transactions?_sort=price&_order=${order}`)
        .then((res) => res.json())
        .then((data) => {
          domRendering(data);
        })
        .catch((err) => console.log(err.message));
      break;
    }
    case "date": {
      fetch(`http://localhost:3000/transactions?_sort=date&_order=${order}`)
        .then((res) => res.json())
        .then((data) => {
          domRendering(data);
        })
        .catch((err) => console.log(err.message));
      break;
    }
  }
}

// ? we can also use this function instead of .tolocaleString()
// function splitDigits(num){
//   const [int, fra] = num.toString().split(".");
//     return Number(int).toLocaleString() + (fra ?? "");
// }
