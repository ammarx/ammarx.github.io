    
function loadInitDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("data").innerHTML = this.responseText; //debug line
      document.getElementById("result").innerHTML = init_Menu.parse(this.responseText);
    }
  };
  xmlhttp.open("GET", "https://query.yahooapis.com/v1/public/yql?q=select URL, text, preset_id from xml where url='http://api.radiotime.com/Browse.ashx' and itemPath='//outline'&diagnostics=false", true);
  xmlhttp.send();
}


    
function loadSearchDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("data").innerHTML = this.responseText; 
      document.getElementById("result").innerHTML = init_Menu.parse(this.responseText);
    }
  };
  var searchString = document.getElementById("SearchStringData").value;
  //searchString = Taylor Swift
  searchString = searchString.replace(" ", "%2520");
  var tmpl = "https://query.yahooapis.com/v1/public/yql?q=select URL, text, preset_id from xml where url='http://opml.radiotime.com/Search.ashx?query={_QUERY_STRING_SEARCH_}' and itemPath='//outline'&diagnostics=false";
  tmpl = tmpl.replace('{_QUERY_STRING_SEARCH_}', searchString);
  //alert(tmpl);
  //we now have the full query generated
  xmlhttp.open("GET", tmpl, true);
  xmlhttp.send();
}


var init_Menu = {
//<button onclick="javascript:loadMusicDoc('{HTMLURL}','{TITLE}');">hi</button>

    //item_template: "<li><img onclick=\"loadMusicDoc('{PATH}','{TEXT}');\" width=64 height=64 src='data:image/png;base64,{XMLURL}'></img> <a href='{HTMLURL}'>{TITLE}</a></li>\n",
    item_template: "<div class='col-sm-6 col-md-6 col-lg-3'><br><div class='card' style='width:200px'><img class='card-img-top' onclick=\"loadMusicDoc('{PATH}','{PRESENT_ID}');\" src='data:image/png;base64,{XMLURL}' alt='Card image' style='width:100%'></img><div class='card-body'>     <a href=''>{TITLE}</a>   </div></div><br></div>\n",
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
                preset_id = curr.getAttribute('preset_id');
                xmlurl  = new Identicon(md5(title), 420).toString();
                path    = encodeURIComponent(htmlurl); 
                if( htmlurl ) {
                    //alert(String(preset_id));
                    html += this.item_template.replace(/{TITLE}/, title).replace(/{HTMLURL}/, htmlurl).replace(/{XMLURL}/, xmlurl).replace(/{PATH}/, path).replace(/{TEXT}/, text).replace(/{PRESENT_ID}/, preset_id);
                }  
                
            }

        }
        
        return html;

    }

}


