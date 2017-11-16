
function loadMusicDoc(url, present_id) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (present_id != 'null') {
        //if channel reached
        document.getElementById('mplayer').src = 'http://tunein.com/embed/player/{channel_id}?autoplay=true'.replace('{channel_id}', present_id);      
      } else {
        document.getElementById("data").innerHTML = this.responseText; //debug line
        document.getElementById("result").innerHTML = init_Menu.parse(this.responseText); //init menu needs to be moved to Menus_Menu                  
      }
    }
  };
  /*
  if (title == "Music") {
  	var tmpl = "https://query.yahooapis.com/v1/public/yql?q=select URL, text from xml where url='{_DATA_URL_}' and itemPath='//outline'&diagnostics=false";
  	tmpl = tmpl.replace('{_DATA_URL_}', url);
  	xmlhttp.open("GET",tmpl, true);

  }
  */
  var tmpl = "https://query.yahooapis.com/v1/public/yql?q=select URL, text, preset_id from xml where url='{_DATA_URL_}' and itemPath='//outline'&diagnostics=false";
  tmpl = tmpl.replace('{_DATA_URL_}', url);
  xmlhttp.open("GET",tmpl, true);

  xmlhttp.send();
}

/*
var Music_Menu = {

    item_template: '<li><img width=64 height=64 src="data:image/png;base64,{XMLURL}"> <a href="{HTMLURL}">{TITLE}</a></li>\n',
    parse: function(opml) {

        var doc;
        // code for IE
        if (window.ActiveXObject) {
            doc = new ActiveXObject("Microsoft.XMLDOM");
            doc.async = false;
            doc.loadXML(opml);
        // code for Mozilla, Firefox, Opera, etc.
        } else {
            var parser = new DOMParser();
            doc = parser.parseFromString(opml,"text/xml");
        }

        var outlines = doc.getElementsByTagName('outline');

        var html = '';
        for (var i = 0, max = outlines.length; i < max; i++) {

            curr = outlines[i];
            if (!curr.hasChildNodes()) {
                title   = curr.getAttribute('text');
                htmlurl = curr.getAttribute('URL');
                xmlurl  = new Identicon(md5(title), 420).toString();
                html += this.item_template.replace(/{TITLE}/, title).replace(/{HTMLURL}/, htmlurl).replace(/{XMLURL}/, xmlurl);
            }

        }
        
        return html;

    }

}
*/