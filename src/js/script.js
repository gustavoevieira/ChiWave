const filtros = document.querySelectorAll('aside a');
const cards = document.querySelectorAll('.card');

  filtros.forEach(filtro => {
    filtro.addEventListener('click', e => {
      e.preventDefault();
      const tipo = filtro.getAttribute('data-filter');

      cards.forEach(card => {
        const id = card.getAttribute('id');

        if (tipo === 'all') {
          card.style.display = 'block';
        } else if (id && id.includes(tipo)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });



  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.blizzard.com/pt-br/feed/')
  .then(response => response.json())
  .then(data => {
    let output = '';
    data.items.forEach(item => {
      output += `
        <div class="news-item">
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <p>${item.pubDate}</p>
          <p>${item.description}</p>
        </div>
      `;
    });
    document.getElementById('news-container').innerHTML = output;
  })
  .catch(error => console.error('Erro ao carregar o feed RSS:', error));

  async function carregarAfixos() {
    try {
      const res = await fetch('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=pt');
      const data = await res.json();
      
      const container = document.getElementById('affixes-container');


      data.affix_details.forEach(affix => {
        const link = document.createElement('a');
        link.href = `https://www.wowhead.com/pt/affix=${affix.id}`;
        link.setAttribute('data-wowhead', `affix=${affix.id}`);
        link.style.display = 'inline-block';


        const icon = document.createElement('img');
        icon.src = `https://wow.zamimg.com/images/wow/icons/large/${affix.icon}.jpg`;
        icon.alt = affix.name;
        icon.style.width = '36px';
        icon.style.height = '36px';
        icon.style.border = '2px solid #1a1a1a';
        icon.style.borderRadius = '6px';

        link.appendChild(icon);
        container.appendChild(link);
      });

      if (typeof $WowheadPower !== 'undefined') {
        $WowheadPower.refreshLinks();
      }
    } catch (error) {
      console.error('Erro ao carregar os afixos:', error);
      document.getElementById('affixes-container').innerText = 'Erro ao carregar afixos.';
    }
  }

  carregarAfixos();