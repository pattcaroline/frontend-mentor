async function timeTracker() {
  //1. Fetch the data from data.json file
  const response = await fetch("./data.json");
  const data = await response.json();

  const tracker = document.querySelector(".activity-tracker");
  const buttons = document.querySelectorAll(".activity-tracker__option-btn");

  function createCardHtml(item, timeframe) {
    const { current, previous } = item.timeframes[timeframe];
    const slug = item.title.toLowerCase().replace(" ", "-");
    const previousLabel = {
      daily: "Yesterday",
      weekly: "Last Week",
      monthly: "Last Month",
    }[timeframe];

    return `
    <section class="card-activity">
        <div class="card-activity__bg-img ${slug}">
          <img src="./images/icon-${slug}.svg" alt="" />
        </div>
        <div class="card-activity__info">
          <header class="card-activity__header">
            <h2 class="card-activity__type">${item.title}</h2>
            <div class="card-activity__dropdown">
              <button>
                <img src="./images/icon-ellipsis.svg" alt="" />
              </button>
              <div class="dropdown">
                <div class="dropdown__options">
                  <div class="align-end">
                    <i class="fa-solid fa-x"></i>
                  </div>

                  <button class="dropdown__option-btn" data-option="daily">
                    Daily
                  </button>
                  <button class="dropdown__option-btn" data-option="weekly">
                    Weekly
                  </button>
                  <button class="dropdown__option-btn" data-option="monthly">
                    Monthly
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div class="card-activity__timeframes">
            <h3 class="card-activity__current-timeframe">${current}hrs</h3>

            <div class="card-activity__previous-timeframe">
              <p class="previous-timeframe">${previousLabel}</p>
              <p>-</p>
              <p class="previous-time">${previous}hrs</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderCards(timeframe) {
    document
      .querySelectorAll(".card-activity")
      .forEach((card) => card.remove());
    const cardsHTML = data
      .map((item) => createCardHtml(item, timeframe))
      .join("");
    tracker.insertAdjacentHTML("beforeend", cardsHTML);
  }

  function setupDropdowns() {
    const wrappers = document.querySelectorAll(".card-activity__dropdown");

    wrappers.forEach((wrapper) => {
      const ellipsisBtn = wrapper.querySelector("button");
      const dropdown = wrapper.querySelector(".dropdown");

      //Add event listener to each ellispsis button inside card-activity__dropdown
      ellipsisBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("open");
      });

      //Handle dropdown option clicks
      wrapper.querySelectorAll(".dropdown__option-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const timeframe = btn.dataset.option;
          const card = wrapper.closest(".card-activity");
          const title = card.querySelector(".card-activity__type").textContent;
          const item = data.find((d) => d.title === title);
          const { current, previous } = item.timeframes[timeframe];
          const previousLabel = {
            daily: "Yesterday",
            weekly: "Last Week",
            monthly: "Last Month",
          }[timeframe];

          card.querySelector(".card-activity__current-timeframe").textContent =
            `${current}hrs`;
          card.querySelector(".previous-timeframe").textContent = previousLabel;
          card.querySelector("previous-time").textContent = `${previous}hrs`;

          dropdown.classList.remove("open");
        });
      });
    });
  }

  //Button listeners
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(btn.dataset.option);
      setupDropdowns();
    });
  });

  //Default on load
  document.querySelector('[data-option="weekly"]').classList.add("active");
  renderCards("weekly");
  setupDropdowns();

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown.open")
      .forEach((d) => d.classList.remove("open"));
  });
}

//catch any fetch/ parse errors
timeTracker().catch((err) => console.error("Failed to load data", err));
