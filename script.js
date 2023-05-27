const episodeTemplate = document.querySelector("[data-episode-template]");
const episodeContainer = document.querySelector("[data-episode-container]");
const showTemplate = document.querySelector("[data-show-template]");
const showContainer = document.querySelector("[data-show-container]");

const searchInput = document.querySelector("[data-search]");
const selectepisodes = document.querySelector("[selectEpisode]");
const selectshows = document.querySelector("[selectShow]");

// Fetching allShows

fetch(`http://api.tvmaze.com/shows`)
  .then((res) => res.json())
  .then((allShows) => {
    allShows
      .sort(function (a, b) {
        var alphabeticSort = a.name
          .toLowerCase()
          .localeCompare(b.name.toLowerCase());

        return alphabeticSort;
      })
      .forEach((show) => {
        const selectshows = document.getElementById("mySelectShow");
        const selectOption2 = document.createElement("option");

        selectshows.appendChild(selectOption2);

        selectOption2.setAttribute("value", `${show.id}`);
        selectOption2.innerHTML = `${show.name}`;
      });
  });

function showFunction() {
  let showId = document.getElementById("mySelectShow").value;
  if (showId === "blanckOption-0-0") {
    let div = document.getElementById("allEpisodes");
    let divShow = document.getElementById("allShows");
    while (div.hasChildNodes()) {
      div.removeChild(div.firstChild);
    }
    while (divShow.hasChildNodes()) {
      divShow.removeChild(divShow.firstChild);
    }

    fetchShows();
  } else {
    let showId = Number(document.getElementById("mySelectShow").value);

    let div = document.getElementById("allEpisodes");
    let divShow = document.getElementById("allShows");

    let selectE = document.getElementById("mySelect");
    while (selectE.hasChildNodes()) {
      selectE.removeChild(selectE.firstChild);
    }

    while (div.hasChildNodes()) {
      div.removeChild(div.firstChild);
    }

    while (divShow.hasChildNodes()) {
      divShow.removeChild(divShow.firstChild);
    }

    let selectE2 = document.getElementById("mySelect");
    let checkChildNode = selectE2.hasChildNodes();
    console.log(checkChildNode);
    if (checkChildNode === false) {
      let selectEOption = document.createElement("option");
      selectEOption.setAttribute("value", "blanckOption-0-0");
      selectEOption.innerHTML = "Episodes";
      selectE2.appendChild(selectEOption);
    }

    fetchEpisodes(showId);
  }
}

function myFunction() {
  let x = document.getElementById("mySelect").value;
  const xvalue = x.split("-")[1];

  episodes.forEach((episode) => {
    const isFalse = episode.name === xvalue;

    const isFact = "0" === xvalue;

    if (isFact) {
      episode.element.classList.toggle("hide", !isFact);
    } else {
      episode.element.classList.toggle("hide", !isFalse);
    }
  });
}
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const episodesList = [];

  episodes.forEach((episode) => {
    const isTrue =
      episode.name.toLowerCase().includes(value) ||
      episode.summary.toLowerCase().includes(value);
    if (isTrue === true) {
      episodesList.push(episode);
    }
    const labelcount = document.querySelector("label");
    labelcount.innerHTML = `Displaying ${episodesList.length}/${episodes.length} episodes`;

    episode.element.classList.toggle("hide", !isTrue);
  });
});

function fetchEpisodes(showId) {
  fetch(`http://api.tvmaze.com/shows/${showId}/episodes`)
    .then((res) => res.json())
    .then((data) => {
      episodes = data.map((episode) => {
        const container = episodeTemplate.content.cloneNode(true).children[0];
        console.log(container);
        const header = container.querySelector("[data-header]");
        const image = container.querySelector("[data-image]");
        const para = container.querySelector("[data-para]");
        const link = container.querySelector("[data-link]");

        header.innerHTML = `${episode.name} - S0${episode.season}E0${episode.number}`;

        const selectEpisode = document.getElementById("mySelect");
        const selectOption = document.createElement("option");
        selectEpisode.appendChild(selectOption);

        selectOption.setAttribute(
          "value",
          `S0${episode.season}E0${episode.number}-${episode.name}`
        );
        selectOption.innerHTML = `S0${episode.season}E0${episode.number} - ${episode.name}`;
        selectOption.addEventListener("click", (e) => {
          const x = e.target.value;
          const isFalse =
            `S0${episode.season}E0${episode.number} - ${episode.name}` === x;

          episode.element.classList.toggle("hide", !isFalse);
        });
        image.src = episode.image.medium;
        para.innerHTML = episode.summary;

        link.setAttribute("href", episode._links.self.href);
        episodeContainer.append(container);

        return {
          name: episode.name,
          image: episode.image.medium,
          summary: episode.summary,
          _links: episode._links.self.href,
          element: container,
        };
      });
    });
}

function fetchShows() {
  fetch(`http://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => {
      episodes = data
        .sort(function (a, b) {
          var alphabeticSort = a.name
            .toLowerCase()
            .localeCompare(b.name.toLowerCase());

          return alphabeticSort;
        })
        .map((episode) => {
          const container = showTemplate.content.cloneNode(true).children[0];
          const header = container.querySelector("[data-header]");
          const image = container.querySelector("[data-image]");
          const para = container.querySelector("[data-para]");
          const link = container.querySelector("[data-link]");
          const rated = container.querySelector("[data-rated]");
          const gener = container.querySelector("[data-gener]");
          const status = container.querySelector("[data-status]");
          const runtime = container.querySelector("[data-runtime]");

          header.innerHTML = `${episode.name}`;
          rated.innerHTML = `Rated: ${episode.rating.average}`;
          gener.innerHTML = `Gener: ${episode.geners}`;
          status.innerHTML = `Status: ${episode.status}`;
          runtime.innerHTML = `Runtime: ${episode.runtime}`;

          const selectEpisode = document.getElementById("mySelect");
          const selectOption = document.createElement("option");
          selectEpisode.appendChild(selectOption);
          // header.setAttribute("onclick", "showFunction()");
          selectOption.setAttribute(
            "value",
            `S0${episode.season}E0${episode.number}-${episode.name}`
          );
          selectOption.innerHTML = `S0${episode.season}E0${episode.number} - ${episode.name}`;
          selectOption.addEventListener("click", (e) => {
            const x = e.target.value;
            const isFalse =
              `S0${episode.season}E0${episode.number} - ${episode.name}` === x;

            episode.element.classList.toggle("hide", !isFalse);
          });
          image.src = episode.image.medium;
          para.innerHTML = episode.summary;

          link.setAttribute("href", episode._links.self.href);
          showContainer.append(container);

          return {
            name: episode.name,
            image: episode.image.medium,
            summary: episode.summary,
            _links: episode._links.self.href,
            element: container,
          };
        });
    });
}

fetch(`http://api.tvmaze.com/shows`)
  .then((res) => res.json())
  .then((data) => {
    episodes = data
      .sort(function (a, b) {
        var alphabeticSort = a.name
          .toLowerCase()
          .localeCompare(b.name.toLowerCase());

        return alphabeticSort;
      })
      .map((episode) => {
        const container = showTemplate.content.cloneNode(true).children[0];
        const header = container.querySelector("[data-header]");
        const image = container.querySelector("[data-image]");
        const para = container.querySelector("[data-para]");
        const link = container.querySelector("[data-link]");
        const rated = container.querySelector("[data-rated]");
        const gener = container.querySelector("[data-gener]");
        const status = container.querySelector("[data-status]");
        const runtime = container.querySelector("[data-runtime]");

        header.innerHTML = `${episode.name}`;
        rated.innerHTML = `Rated: ${episode.rating.average}`;
        gener.innerHTML = `Gener: ${episode.geners}`;
        status.innerHTML = `Status: ${episode.status}`;
        runtime.innerHTML = `Runtime: ${episode.runtime}`;

        const selectEpisode = document.getElementById("mySelect");
        const selectOption = document.createElement("option");
        selectEpisode.appendChild(selectOption);

        selectOption.setAttribute(
          "value",
          `S0${episode.season}E0${episode.number}-${episode.name}`
        );
        selectOption.innerHTML = `S0${episode.season}E0${episode.number} - ${episode.name}`;
        selectOption.addEventListener("click", (e) => {
          const x = e.target.value;
          const isFalse =
            `S0${episode.season}E0${episode.number} - ${episode.name}` === x;

          episode.element.classList.toggle("hide", !isFalse);
        });
        image.src = episode.image.medium;
        para.innerHTML = episode.summary;

        link.setAttribute("href", episode._links.self.href);
        showContainer.append(container);

        return {
          name: episode.name,
          image: episode.image.medium,
          summary: episode.summary,
          _links: episode._links.self.href,
          element: container,
        };
      });
  });

window.onload = setup;
