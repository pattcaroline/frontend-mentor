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
            <div class="card-activity__menu-options">
              <img src="./images/icon-ellipsis.svg" alt="" />
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

  //Button listeners
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(btn.dataset.option);
    });
  });

  //Default on load
  document.querySelector('[data-option="weekly"]').classList.add("active");
  renderCards("weekly");
}

//catch any fetch/ parse errors
timeTracker().catch((err) => console.error("Failed to load data", err));
