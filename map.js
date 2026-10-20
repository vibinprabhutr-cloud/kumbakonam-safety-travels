function renderTempleMap(containerId, points, originLabel){
  var el = document.getElementById(containerId);
  if(!el || typeof L === "undefined" || !points || !points.length) return;

  var map = L.map(containerId, { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(map);

  var icon = function(num){
    return L.divIcon({
      className: "",
      html: '<div class="map-pin-num">' + num + "</div>",
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  };

  var latlngs = [];
  points.forEach(function(p, i){
    var ll = [p.lat, p.lon];
    latlngs.push(ll);
    L.marker(ll, { icon: icon(i + 1) })
      .addTo(map)
      .bindPopup("<strong>" + (i + 1) + ". " + p.name + "</strong>" + (p.note ? "<br>" + p.note : ""));
  });

  if(latlngs.length > 1){
    L.polyline(latlngs, {
      color: "#C8432A",
      weight: 3,
      dashArray: "2 10",
      lineCap: "round",
      opacity: 0.85
    }).addTo(map);
  }

  var bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds, { padding: [34, 34], maxZoom: 13 });

  map.on("click", function(){ map.scrollWheelZoom.enable(); });
  map.on("mouseout", function(){ map.scrollWheelZoom.disable(); });
}
