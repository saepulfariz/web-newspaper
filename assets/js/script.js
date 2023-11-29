window.onscroll = function () {
  if (pageYOffset >= 300) {
    document.getElementById('backToTop').style.visibility = "visible"
  } else {
    document.getElementById('backToTop').style.visibility = "hidden";
  }
};

$('.page-scroll').on('click', function (e) {
  const tujuan = $(this).attr('href');
  const elemenTujuan = $(tujuan);

  $('html, body').animate({
    scrollTop: elemenTujuan.offset().top - 55
  }, 1250);


  e.preventDefault();
})


function setCountryList() {
  $.ajax({
    url: 'https://restcountries.com/v2/all',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var list = '';
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.alpha2Code == 'US') {
          list += `<option selected value="` + element.alpha2Code + `">` + element.alpha2Code + ` | ` +
            element.name +
            `</option>`;
        } else {
          list += `<option value="` + element.alpha2Code + `">` + element.alpha2Code + ` | ` +
            element.name +
            `</option>`;
        }

      }
      $('#country').html(list);
    }
  });
}
setCountryList();

function reloadArticel(category = 'business') {
  $('.page-scroll').removeClass('active');
  $('#' + category).addClass('active');
  var country = ($('#country').val() == null) ? 'US' : $('#country').val();
  var apikey = 'c6fe6af8933748f194f1fbce61e3419c'
  var link = 'https://newsapi.org/v2/top-headlines';
  $.ajax({
    url: link,
    method: 'GET',
    data: {
      country: country,
      category: category,
      apikey: apikey,
    },
    dataType: 'json',
    success: function (data) {
      console.log(data);
      var list = '';
      if (data.articles.length > 0) {
        for (let index = 0; index < data.articles.length; index++) {
          const element = data.articles[index];
          const d = new Date(element.publishedAt);
          var date_new = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
          var image = (element.urlToImage == null) ? 'assets/image/noimage.jpg' : element.urlToImage;
          var description = (element.description == null) ? '---' : element.description;
          var content = (element.content == null) ? '---' : element.content;
          list += `<article class="card" >
            <h2>` + element.title + `</h2>
            <p>Ditulis oleh <b>` + element.author + `</b>, pada ` + date_new + `</p>
            <img class="featured-image" src="` + image + `" alt="" />
            <p>` + description + `</p>
            <p>` + content + `</p>
            <a href="` + element.url + `" target="_blank" class="button">Source</a>
          </article>`;
        }
      } else {
        list = '<h2>NO DATA ENTRY</h2>';
      }

      $('#content').html(list);
    },
    beforeSend: function () {
      $('#content').html('<div class="loader"></div>');

    },
  });
}

reloadArticel();
$('#country').on('change', function () {
  reloadArticel()
})