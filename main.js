$(document).ready(function(){
    $('.nav-link').on('click', function(){
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
  });
  
  function showTab(tabId) {
    $('.tab-pane').removeClass('show active');
    
    $('#' + tabId).addClass('show active');
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    new Splide('#album-carousel', {
      type: 'loop', 
      perPage: 3,   
      perMove: 1,   
    }).mount();
  });
  
  // API for the lyrics
  
  fetch("https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871", {
      method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f585e67932mshc12d5e2772edbf5p12c909jsn54e83079dea4',
      'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
    },
  })
  .then(response => response.json())
  .then(response => {
    const lyricsHtml = response.lyrics.lyrics.body.html;
    const lyricsText = lyricsHtml.replace(/<(?!br\s*\/?)[^>]*>/g, ''); 
    // console.log(lyricsText);
    
    document.getElementById('lyrics-paragraph').innerHTML = lyricsText;
  
    const primaryArtist = response.lyrics.tracking_data.primary_artist; 
    const songTitle = response.lyrics.tracking_data.title; 
      console.log(primaryArtist);
      
      document.querySelector('.song-artist').innerHTML = primaryArtist;
      document.querySelector('.song-title').innerHTML = songTitle;
  })
  .catch(err => {
      console.log(err);
  });
  
  // API for Realted Artists
  
  fetch("https://spotify23.p.rapidapi.com/artist_related/?id=2w9zwq3AktTeYYMuhMjju8", {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f585e67932mshc12d5e2772edbf5p12c909jsn54e83079dea4',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  })
  .then(response => response.json())
  .then(response => {
    const relatedArtists = response.artists;
  
    const artistList = relatedArtists.map(artist => {
      return {
        name: artist.name,
        image: artist.images[0].url,
        url: artist.external_urls.spotify
      };
    });
  
    const carouselList = document.querySelector('#carousel-list');
  
    artistList.forEach(artist => {
      const slide = document.createElement('li');
      slide.className = 'splide__slide';
      slide.innerHTML = `
        <div class="album-card d-flex flex-column align-items-start">
          <a href="${artist.url}" class="text-decoration-none">
            <img src="${artist.image}" alt="${artist.name}" width="90%">
            <h5 class="pt-3 text-light">${artist.name}</h5>
          </a>
        </div>
      `;
      carouselList.appendChild(slide);
    });
  
    new Splide('#related-carousel', {
      type: 'loop',
      perPage: 3, 
      breakpoints: {
        768: {
          perPage: 1, 
        }
      }
    }).mount();
  })
  .catch(err => {
    console.log(err);
  });
  
  
  // Other Albums API
  fetch("https://spotify23.p.rapidapi.com/artist_albums/?id=2w9zwq3AktTeYYMuhMjju8&offset=0&limit=100", {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f585e67932mshc12d5e2772edbf5p12c909jsn54e83079dea4',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  })
  .then(response => response.json())
  .then(response => {
    const artistAlbums = response.data.artist.discography.albums.items;
  
    const albumCarouselList = document.getElementById('album-carousel-list');
  
    artistAlbums.forEach(album => {
      const slide = document.createElement('li');
      slide.className = 'splide__slide';
      slide.innerHTML = `
        <div class="album-card d-flex flex-column align-items-start">
          <a href="${album.releases.items[0].sharingInfo.shareUrl}" class="text-decoration-none text-light">
            <img src="${album.releases.items[0].coverArt.sources[0].url}" alt="${album.releases.items[0].name}" width="90%">
            <h5 class="pt-3">${album.releases.items[0].name}</h5>
            <p>${album.releases.items[0].date.year}</p>
          </a>
        </div>
      `;
      albumCarouselList.appendChild(slide);
    });
  
    new Splide('#albums-carousel', {
      type: 'loop',
      perPage: 3, 
      breakpoints: {
        768: {
          perPage: 1, 
        }
      }
    }).mount();
  })
  .catch(err => {
    console.log(err);
  });
  