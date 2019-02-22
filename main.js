  $.ajax({
        url: "custom.geo.json",
        dataType: "json",
        success: function(data) {
            console.log(data);
            // get map data
			d3.json('./custom.geo.json', function(data) {
			     /////////////////////////////////////////////
			     //////// Here we will put a lot of code concerned
			     //////// with drawing the map. This will be defined
			     //////// in the next sections.
			     /////////////////////////////////////////////
			     console.log(data);
			  }
			);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('ERROR', textStatus, errorThrown);
        }
    });


// DEFINE VARIABLES
// Define size of map group
// Full world map is 2:1 ratio
// Using 12:5 because we will crop top and bottom of map
let w = 3000;
let h = 1250;
// variables for catching min and max zoom factors
let minZoom;
let maxZoom;

// Define map projection
let projection = d3
   .geoEquirectangular()
   .center([0, 15]) // set centre to further North
   .scale([w/(2*Math.PI)]) // scale to fit group width
   .translate([w/2,h/2]) // ensure centred in group
;

// Define map path
let path = d3
   .geoPath()
   .projection(projection)
;

// apply zoom to countriesGroup
function zoomed() {
   t = d3
      .event
      .transform
   ;
   countriesGroup.attr(
      "transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")"
   );
}

// Define map zoom behaviour
var zoom = d3
   .zoom()
   .on("zoom", zoomed)
;

function getTextBox(selection) {
  selection.each(function(d) {
    d.bbox = this.getBBox();
  });
}

let svg = d3
  .select("#map-holder")
  .append("svg")
  // set to the same size as the "map-holder" div
  .attr("width", $("#map-holder").width())
  .attr("height", $("#map-holder").height())
  // add zoom functionality
  .call(zoom)
;