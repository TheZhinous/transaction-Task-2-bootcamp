const loadDataBtn = document.querySelector(".load-data");
const totalList = document.querySelector(".transaction-list");
const searchBoxContainer = document.querySelector(".search-box_container");
const searchBox = document.querySelector(".search-box");
const bodyTable = document.querySelector(".table-body");
const sortDate = document.querySelector(".sorting-date");
const sortPrice = document.querySelector(".sorting-price");

const app = axios.create({
  baseURL: "http://localhost:3000/transactions",
});

// *events
let allData = [];
const filters = {
  date: "ascending",
  price: "ascending",
};
loadDataBtn.addEventListener("click", (e) => {
  app
    .get("")
    .then(({ data }) => {
      loadDataBtn.classList.add("hidden");
      totalList.classList.remove("hidden");
      searchBoxContainer.classList.remove("hidden");
      allData = data;
      domRendering(allData);
    })
    .catch((err) => console.log(err));
});
sortDate.addEventListener("click", (e) => {
  sortDate.classList.toggle("ascending");
  if (sortDate.classList.contains("ascending")) {
    domRendering(
      allData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      })
    );
  } else {
    domRendering(
      allData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
    );
  }
});

searchBox.addEventListener("input", (e) => {
  const query = e.target.value;
  app
    .get(`?refId_like=${query}`)
    .then((res) => {
      //   console.log(URLSearchParams.get())
    })
    .catch((err) => console.log(err));
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

// ? we can also use this function instead of .tolocaleString()
// function splitDigits(num){
//   const [int, fra] = num.toString().split(".");
//     return Number(int).toLocaleString() + (fra ?? "");
// }
