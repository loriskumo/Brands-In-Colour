/**
 * Raw data of brands. Each brand is an array, with following format:
 *   [ <DisplayName>, <sassVariableName>, <colorHex>, <colorRGB> {, <OptionalExtaClass(es)>}* ]
 *
 * Note: ideally, this list should be fully generated by only parsing the dedicated
 * index file : stylesheets/sass/_brandsincolours.scss
 */
var data = [[ 'Adobe', '$adobe-bic', '#FF0000', 'rgb(255,0,0)' ],
            [ 'Airbnb', '$airbnb-bic', '#FF5A5F', 'rgb(255,90,95)' ],
            [ 'Behance', '$behance-bic', '#1769FF', 'rgb(23,105,255)' ],
            [ 'Dailymotion', '$dailymotion-bic', '#0066DC', 'rgb(0,100,220)' ],
            [ 'Dribbble', '$dribbble-bic', '#ea4c89', 'rgb(234,76,137)' ],
            [ 'Dropbox', '$dropbox-bic', '#007ee5', 'rgb(0,126,229)' ],
            [ 'Evernote', '$evernote-bic', '#6fb536', 'rgb(111,181,54)' ],
            [ 'Evernote alternate', '$evernote-alt-bic', '#20c05c', 'rgb(32,192,92)' ],
            [ 'Facebook', '$facebook-bic', '#3B5998', 'rgb(59,89,152)' ],
            [ 'Flickr', '$flickr-bic', '#0063dd', 'rgb(0,99,221)' ],
            [ 'Flickr Secondary', '$flickr-2-bic', '#ff0085', 'rgb(255,0,133)' ],
            [ 'Foursquare', '$foursquare-bic', '#0072B1', 'rgb(0,114,177)' ],
            [ 'GitHub', '$github-bic', '#171516', 'rgb(23,21,22)' ],
            [ 'Google+', '$googleplus-bic', '#dd4b39', 'rgb(221,75,57)' ],
            [ 'IMDB', '$imdb-bic', '#E6B91E', 'rgb(230,185,30)' ],
            [ 'Instagram', '$instagram-bic', '#3F729B', 'rgb(63,114,155)' ],
            [ 'LinkedIn', '$linkedin-bic', '#0976B4', 'rgb(9,118,180)' ],
            [ 'Medium', '$medium-bic', '#00AB6C', 'rgb(0,171,108)' ],
            [ 'Netflix', '$netflix-bic', '#e50914', 'rgb(229,9,20)' ],
            [ 'PayPal "pal"', '$paypal-pal-bic', '#0079C1', 'rgb(0,121,193)' ],
            [ 'PayPal "pay"', '$paypal-pay-bic', '#00457C', 'rgb(0,69,124)' ],
            [ 'Pinterest', '$pinterest-bic', '#cd1d1f', 'rgb(205,29,31)' ],
            [ 'Quora', '$quora-bic', '#BC2016', 'rgb(188,32,22)' ],
            [ 'Skype', '$skype-bic', '#00AFF0', 'rgb(0,175,240)' ],
            [ 'Snapchat', '$snapchat-bic', '#FFFA37', 'rgb(255,250,55)', 'dark' ], // extra class 'dark'
            [ 'Spotify', '$spotify-bic', '#32CE64', 'rgb(50,206,100)' ],
            [ 'Swarm', '$swarm-bic', '#ffa633', 'rgb(255,166,51)' ],
            [ 'Tumblr', '$tumblr-bic', '#35465d', 'rgb(53,70,93)' ],
            [ 'Twitter', '$twitter-bic', '#55ACEE', 'rgb(85,172,238)' ],
            [ 'Vimeo', '$vimeo-bic', '#1AB7EA', 'rgb(26,183,234)' ],
            [ 'Vine', '$vine-bic', '#00B489', 'rgb(0,180,137)' ],
            [ 'WhatsApp', '$whatsapp-bic', '#64D448', 'rgb(100,212,72)' ],
            [ 'Yahoo', '$yahoo-bic', '#780099', 'rgb(123,0,153)' ],
            [ 'YouTube', '$youtube-bic', '#e52d27', 'rgb(229,45,39)' ],
            [ 'Sonarsource', '$sonarsource-bic', '#C42422', 'rgb(196,36,34)' ],
            [ 'Sonarqube', '$sonarqube-bic', '#2583AD', 'rgb(37,131,173)'] ];

// items are generated only once
var items = _buildItems(data);

/**
 * Build an array of item, base on raw data
 * @param data raw values in arrays
 * @returns Array of item with named attributes
 */
function _buildItems(data) {
  var results = [];
  for(var i = 0; i < data.length ; i++) {
    var record = data[i];
    var item = {
      'name': record[0],
      'bic': record[1],
      'colorHEX': record[2],
      'colorRGB': record[3],
      // remove '$' and '-bic' from the variable name to get the css class
      'cssClasses': [ record[1].substring(1, record[1].length - 4) ]
    };
    for(var j = 4; j < data.length; j++) {
      if (record[j]) {
        // add any extra classes, if exists
        item.cssClasses.push(record[j]);
      }
    }
    results.push(item);
  }
  return results;
}

function _run(sortFunction) {
  // sort the items using provided function
  var sortedItems = sortFunction(items);
  // get the list from the HTML
  var el = document.getElementById('items');
  // save the 'more to come' element
  var moreToCome = el.lastElementChild
  // replace body of the list with sorted items and 'more to come'
  el.innerHTML = _createHtmlList(sortedItems) + moreToCome.outerHTML;

  /**
   * Define the structure of an brand in the final list
   * @param items the array of items, with named properties
   * @returns String containing equivalent HTML structure of the array
   */
  function _createHtmlList(items) {
    var html = '';
    for(var i = 0; i < items.length ; i++) {
      var item = items[i];
      html += '<li class="' + item.cssClasses.join(' ') + '">\n' +
                  '  <h3>' + item.name +  '</h3>\n' +
                  '  <p><span>' + item.bic + '</span></p>\n' +
                  '  <p class="colorref">' + item.colorHEX + '</p>\n' +
                  '  <p>' + item.colorRGB + '</p>\n' +
                '</li>\n';
    }
    return html;
  }
}

function shuffle() {
  _run(function(items) {
    for(var j, x, i = items.length; i; j = Math.floor(Math.random() * i), x = items[--i], items[i] = items[j], items[j] = x);
    return items;
  });
}

function sortByName() {
  _run(function(items) {
    return items.sort(_sortFunction);
  });
  
  function _sortFunction(a, b) {
    return _compare(a.name, b.name);
  }
}

function _compare(a,b) {
  if(a < b) return -1;
  if(a > b) return 1;
  return 0;
}

function sortByColor() {
  _run(function(items) {
    return items.sort(_sortFunction);
  });
  
  function _sortFunction(a, b) {
    var hslA = _hexToHSL(a), hslB = _hexToHSL(b);
    return _compare(hslA.h, hslB.h);
  }
  
  function _hexToHSL(item) {
    var color = item['colorHEX'].substring(1);
    var r = _hex2color(color, 0, 2), g = _hex2color(color, 2, 4), b = _hex2color(color, 4, 6);
    
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return {'h':h, 's':s, 'l':l};
  }
  
  function _hex2color(hexString, start, end) {
    return parseInt(hexString.substring(start, end), 16) / 255;
  }
}
