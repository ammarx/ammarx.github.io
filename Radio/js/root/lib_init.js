    
function loadInitDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("data").innerHTML = this.responseText; //debug line
      document.getElementById("result").innerHTML = init_Menu.parse(this.responseText);
    }
  };
  xmlhttp.open("GET", "https://query.yahooapis.com/v1/public/yql?q=select URL, text from xml where url='http://api.radiotime.com/Browse.ashx' and itemPath='//outline'&diagnostics=false", true);
  xmlhttp.send();
}

var init_Menu = {
//<button onclick="javascript:loadMusicDoc('{HTMLURL}','{TITLE}');">hi</button>

    //item_template: "<li><img onclick=\"loadMusicDoc('{PATH}','{TEXT}');\" width=64 height=64 src='data:image/png;base64,{XMLURL}'></img> <a href='{HTMLURL}'>{TITLE}</a></li>\n",
    item_template: "<li><img onclick=\"loadMusicDoc('{PATH}','{TEXT}');\" width=64 height=64 src='data:image/png;base64,{XMLURL}'></img> </li>\n",
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
                text   = curr.getAttribute('text');
                htmlurl = curr.getAttribute('URL');
                xmlurl  = new Identicon(md5(title), 420).toString();
                path    = encodeURIComponent(htmlurl); 
                html += this.item_template.replace(/{TITLE}/, title).replace(/{HTMLURL}/, htmlurl).replace(/{XMLURL}/, xmlurl).replace(/{PATH}/, path).replace(/{TEXT}/, text);
            }

        }
        
        return html;

    }

}


