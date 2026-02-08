import { getAllEpisodes } from "./episodes.js";
document.addEventListener("DOMContentLoaded", () => {
  // Setup function
  function setup() {
    const allEpisodes = getAllEpisodes(); // Get all episodes
    makePageForEpisodes(allEpisodes); // Build page when loaded

    // Populate the season filter dropdown dynamically
    populateSeasonFilter(allEpisodes);
  }

  // Populate the season filter dropdown with season options
  function populateSeasonFilter(episodes) {
    const seasonFilter = document.getElementById("season-filter");

    // Create a set of unique seasons
    const seasons = new Set(episodes.map((ep) => ep.season));
    seasons.forEach((season) => {
      const option = document.createElement("option");
      option.value = season;
      option.textContent = `Season ${season}`;
      seasonFilter.appendChild(option);
    });
  }

  // Page rendering function
  function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = ""; // Clear existing content

    // Create page title
    const title = document.createElement("h1");
    title.className = "page-title";
    title.textContent = "Game of Thrones Episodes";

    // Create container for episode cards
    const container = document.createElement("section");
    container.className = "episodes";

    // Create episode cards for each episode
    episodeList.forEach((ep) => {
      const card = createEpisodeCard(ep); // Create individual episode cards
      container.append(card); // Append the card to container
    });

    // Append the title, container, and footer to root
    rootElem.append(title, container, createFooter());
  }

  // Create a single episode card
  function createEpisodeCard(episode) {
    const card = document.createElement("article");
    card.className = "episode-card";

    // Episode title
    const title = document.createElement("h2");
    title.textContent = `${createEpisodeCode(episode)} — ${episode.name}`;

    // Episode image
    const image = document.createElement("img");
    image.src = episode.image?.medium || "default-image-url.jpg"; // Default image URL if not available
    image.alt = episode.name;

    // Episode summary
    const summary = document.createElement("div");
    summary.className = "summary";
    summary.innerHTML = episode.summary || "<p>No summary available.</p>"; // Default if no summary

    // Link to episode
    const link = document.createElement("a");
    link.href = episode.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View on TVMaze";

    // Append elements to card
    card.append(title, image, summary, link);
    return card; // Return the fully created card
  }

  // Format episode code as SxxExx
  function createEpisodeCode({ season, number }) {
    const s = String(season).padStart(2, "0");
    const e = String(number).padStart(2, "0");
    return `S${s}E${e}`;
  }

  // Create footer with external link
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

  // Live search and season filter
  const searchInput = document.getElementById("search-input");
  const seasonFilter = document.getElementById("season-filter");

  // Function to update the status message (e.g., "Showing 2 of 79 episodes")
  function updateStatusMessage(filteredEpisodes, totalEpisodes) {
    const statusMessage = document.getElementById("status-message");
    const filteredCount = filteredEpisodes.length;
    const message = `Showing ${filteredCount} of ${totalEpisodes} episodes`;
    statusMessage.textContent = message;
  }

  // Filter episodes based on search input and season filter
  function filterEpisodes() {
    const query = searchInput.value.toLowerCase();
    const season = seasonFilter.value;

    const allEpisodes = getAllEpisodes(); // Get all episodes on filter change
    const filtered = allEpisodes.filter((ep) => {
      const matchesText =
        ep.name.toLowerCase().includes(query) ||
        ep.summary.toLowerCase().includes(query);
      const matchesSeason = season === "all" || ep.season === Number(season);
      return matchesText && matchesSeason;
    });

    makePageForEpisodes(filtered); // Re-render filtered episodes
    updateStatusMessage(filtered, allEpisodes.length); // Update status message
  }

  searchInput.addEventListener("input", filterEpisodes);
  seasonFilter.addEventListener("change", filterEpisodes);

  setup(); // Initialize when the page loads
});
