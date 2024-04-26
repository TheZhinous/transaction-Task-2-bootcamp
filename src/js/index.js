
const loadDataBtn = document.querySelector(".load-data");

const app = axios.create({
  baseURL: "http://localhost:3000/transactions",
});


// *events
let allData = [];
loadDataBtn.addEventListener("click", (e) => {
  app
    .get("")
      .then(({ data }) => {
          allData = data;
    })
    .catch((err) => console.log(err));
});

function domRendering(_data) {
    
}