//Alrighty then, since u came here to check my code, I'll explain u the mental model of my code.

//Step 1.I am wondering- when should this code run?-When the page loads. So I write my first line of code "window.onload = setup;"

//Then stub the function 
function setup() {
  const allEpisodes = getAllEpisodes();// Step 2. Where the data comes from? From the episode.js.
  makePageForEpisodes(allEpisodes);//Step 3. The function for building UI. At this point is emty.
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");//Step 4. Where on the page should everything go? in the #root(index.html)
  rootElem.innerHTML = "";

  const title = document.createElement("h1");//creating title
  title.className = "page-title";//css
  title.textContent = "Game of thrones.Episodes";

  const container = document.createElement("section");//Step 5.Do I append each episode directly to root?No, I need to create a container
  container.className = "episodes";

  const episodeCards = episodeList.map(createEpisodeCard);//Step 8. I have many episodes. How do I turn them into many cards?by mapping
  episodeCards.forEach(card => container.append(card));//Step 9. side effect, rendering

  rootElem.append(title, container, createFooter());//Step 10.Appending once.
}


//Step 6.One item → one element,creating a card.
function createEpisodeCard(episode) {
  const card = document.createElement("article");//Step 7. starting with a shall. Returning card.
  card.className = "episode-card";

  const title = document.createElement("h2");
  title.textContent = `${createEpisodeCode(episode)} — ${episode.name}`;

  const image = document.createElement("img");
  image.src = episode.image?.medium;
  image.alt = episode.name;

  const summary = document.createElement("div");
  summary.className = "summary";
  summary.innerHTML = episode.summary || "<p>No summary available.</p>";

  const link = document.createElement("a");
  link.href = episode.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View on TVMaze";

  card.append(title, image, summary, link);
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

window.onload = setup;
