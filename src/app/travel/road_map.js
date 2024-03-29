window.onload = function () {
  var R = Raphael("road_map", 1000, 600 ),
    attr = {
    "fill": "#d3d3d3",
    "stroke": "#fff",
    "stroke-opacity": "1",
    "stroke-linejoin": "round",
    "stroke-miterlimit": "4",
    "stroke-width": "0.75",
    "stroke-dasharray": "none"
  },
  usRaphael = {};
  
  //Draw Map and store Raphael paths
  for (var state in usMap) {
    usRaphael[state] = R.path(usMap[state]).attr(attr);
  }
  
  //Do Work on Map
  for (var state in usRaphael) {
    usRaphael[state].color = Raphael.getColor();
    
    (function (st, state) {

      st[0].style.cursor = "pointer";

      st[0].onmouseover = function () {
        st.animate({fill: st.color}, 500);
        st.toFront();
        R.safari();
        console.log(state);
      };

      st[0].onmouseout = function () {
        st.animate({fill: "#d3d3d3"}, 500);
        st.toFront();
        R.safari();
      };

      st[0].onclick = function () {
      	window.location = "google.com"
      } 
                 
    })(usRaphael[state], state);
  }
          
};
