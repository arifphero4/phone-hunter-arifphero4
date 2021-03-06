const setSpinner = (spinnerValue) => {
  document.getElementById("load-spinner").style.display = spinnerValue;
};
// search button function create
const searchItem = () => {
  const inputFieldItem = document.getElementById("input-text");
  inputField = inputFieldItem.value.toLowerCase();
  // call to spinner
  setSpinner("block");
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`;
  // clear input field
  inputFieldItem.value = "";
  // call the api
  if (inputField.length < 3) {
    setSpinner("none");
    errorMassage.innerText = "NO RESULT FOUND, Try Again!";
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayResult(data.data));
  }
};
// displayResult called for show result
const errorMassage = document.getElementById("result-massage");
const displayResult = (phone) => {
  console.log(phone);
  const displayResultDiv = document.getElementById("details-div");
  displayResultDiv.innerHTML = "";

  errorMassage.innerText = "";
  if (phone.length !== 0) {
    phone.slice(1, 21).forEach(
      (show = (phone) => {
        const phoneDetailsDiv = document.createElement("div");
        // set result dynamic
        phoneDetailsDiv.innerHTML = `
               <div class="card rounded  ">
               <img src="${phone.image}" class="card-img-top p-2 m-auto img-fluid w-25" alt="...">
               <div class="card-body text-center">
               <h4 class="card-title">${phone.phone_name}</h4>
               <p>Brand: <span class="fw-light">${phone.brand}</span></p>
               <button onclick="showDetails('${phone.slug}')" class=" btn btn-success" >About Phone </button>
              </div>
              </div>`;

        displayResultDiv.appendChild(phoneDetailsDiv);
      })
    );
    setSpinner("none");
  } else {
    errorMassage.innerText = "NO RESULT FOUND!";
    setSpinner("none");
  }
};
// detail result show
const showDetails = (phoneDetails) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${phoneDetails}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMoreInformation(data.data));
};
const displayMoreInformation = (detailsInfo) => {
  const showdetailsDiv = document.getElementById("show-details");
  const showDetailsInfo = document.createElement("div");
  showdetailsDiv.innerHTML = "";
  showDetailsInfo.innerHTML = `
  <div class="card  ">
  <div class="row  rounded">
    <div class="col-md-4 align-self-center">
      <img
        src="${detailsInfo.image}"
        class="img-fluid w-50 my-3  "
        alt="..."
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3 class="card-title text-primary">${detailsInfo.name}</h3>
        <p>
          <span class="text-danger"
            >${
              detailsInfo.releaseDate ? detailsInfo.releaseDate : "NOT FOUND"
            }</span
          >
        </p>
        <h4 class="text-success">Main Features</h4>
        <p>
          Storage:
          <span class="fw-light">${detailsInfo.mainFeatures.storage}</span>
        </p>
        <p>
          Display Size:
          <span class="fw-light"
            >${detailsInfo.mainFeatures.displaySize}</span
          >
        </p>
        <p>
          Chip Set:
          <span class="fw-light">${detailsInfo.mainFeatures.chipSet}</span>
        </p>
        <p>
          memory:
          <span class="fw-light">${detailsInfo.mainFeatures.memory}</span>
        </p>

        <h4 class="text-success">Sensors</h4>
        <span class="fw-light">
          ${detailsInfo.mainFeatures.sensors.slice(0, 12)}</span
        >
        <h4 class="text-success mt-2">Others</h4>
        <p>
          Bluetooth:
          <span class="fw-light"
            >${
              detailsInfo.others.Bluetooth
                ? detailsInfo.others.Bluetooth
                : "Not Supportted"
            }</span
          >
        </p>
        <p>GPS: <span class="fw-light">${detailsInfo.others.GPS}</span></p>
        <p>Radio: <span class="fw-light">${detailsInfo.others.Radio}</span></p>
        <p>WALAN: <span class="fw-light">${detailsInfo.others.WLAN}</span></p>
      </div>
    </div>
  </div>
</div>
  
  
  `;
  showdetailsDiv.appendChild(showDetailsInfo);
};
document.getElementById("clear-result").addEventListener(
  "click",
  (clearFunction = () => {
    const div = document.getElementById("show-details");
    div.innerHTML = "";
  })
);
