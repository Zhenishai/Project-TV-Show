let allEpisodes = [];
let container;
let countDisplay;

window.onload = setup;

function setup() {
  allEpisodes = getAllEpisodes();
  buildPageStructure();
  renderEpisodes(allEpisodes);
}

function buildPageStructure() {
  const root = document.getElementById("root");

  const title = document.createElement("h1");
  title.className = "page-title";
  title.textContent = "Game of Thrones Episodes";

  const controls = createControls();

  container = document.createElement("section");
  container.className = "episodes";

  root.append(title, controls, container, createFooter());
}

function createControls() {
  const controls = document.createElement("div");
  controls.className = "controls";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search episodes...";

  countDisplay = document.createElement("p");
  countDisplay.className = "count";

  const select = document.createElement("select");

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "All Episodes";
  select.append(defaultOption);

  allEpisodes.forEach((ep) => {
    const option = document.createElement("option");
    option.value = ep.id;
    option.textContent = `${createEpisodeCode(ep)} - ${ep.name}`;
    select.append(option);
  });

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    const filtered = allEpisodes.filter(
      (ep) =>
        ep.name.toLowerCase().includes(term) ||
        ep.summary.toLowerCase().includes(term),
    );

    renderEpisodes(filtered);
  });

  select.addEventListener("change", () => {
    if (!select.value) {
      renderEpisodes(allEpisodes);
      return;
    }

    const selected = allEpisodes.filter((ep) => ep.id == select.value);

    renderEpisodes(selected);
  });

  controls.append(select, searchInput, countDisplay);
  return controls;
}

function renderEpisodes(episodeList) {
  container.innerHTML = "";

  const cards = episodeList.map(createEpisodeCard);
  cards.forEach((card) => container.append(card));

  countDisplay.textContent = `Displaying ${episodeList.length} / ${allEpisodes.length} episodes`;
}

function createEpisodeCard(episode) {
  const card = document.createElement("article");
  card.className = "episode-card";

  const title = document.createElement("h2");
  title.textContent = `${createEpisodeCode(episode)} — ${episode.name}`;

  const image = document.createElement("img");
  image.src = episode.image?.medium;
  image.alt = episode.name;

  const summary = document.createElement("div");
  summary.className = "summary";
  summary.innerHTML = episode.summary || "<p>No summary available.</p>";

  card.append(title, image, summary);
  return card;
}

function createEpisodeCode({ season, number }) {
  const s = String(season).padStart(2, "0");
  const e = String(number).padStart(2, "0");
  return `S${s}E${e}`;
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <p>
      Data originally from 
      <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">
        TVMaze.com
      </a>
    </p>
  `;
  return footer;
}
