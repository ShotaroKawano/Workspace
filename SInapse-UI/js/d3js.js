(function() {

  // var data = [15, 20, 5];

  // var circles = d3.select('svg').selectAll('circle').data(data);

  // circles
  //   .attr('cx', function(d, i) {
  //     return i * 50 + 50;
  //   })
  //   .attr('cy', 120)
  //   .attr('r', function(d) {
  //     return d;
  //   })
  //   .attr('fill', 'pink');

  // Create a svg canvas
  var svg = d3.select("#board")
    .append("svg")
    .attr("width", 700)
    .attr("height", 500);

  //Drag nodes
  var drag = d3.drag()
    .on("start", function () {
      d3.event.sourceEvent.stopPropagation()
    })
    .on("drag", dragmove);

  var line = svg.append("line")
    .style("stroke", "black")
    .attr("x1", 150)
    .attr("y1", 100)
    .attr("x2", 250)
    .attr("y2", 300);

  //First circle
  var g1 = svg.append("g")
    .attr("transform", "translate(" + 150 + "," + 100 + ")")
    .attr("class", "first")
    .call(drag)

  var el = '<div class="card"><div div class="article"><div class="thumb"></div><div class="summary">サマリー</div></div><div class="comment"><div class="comment-label">コメント</div><div class="comment-content">コメント</div></div></div>'

  var card = g1.append("foreignObject")
    .attr("width", 300)
    .attr("height", 200)
    .append("xhtml:div")
    .attr("class", "card")
    .html(el)


  // var card = g1.append("foreignObject")
  //   .attr("width", 300)
  //   .attr("height", 200)
  //   .append("xhtml:div")
  //   .attr("class", "card")

  // var article = card.append("div")
  //   .attr("class", "article")

  // var thumb = article.append("div")
  //   .attr("class", "thumb")

  // var summary = article.append("div")
  //   .attr("class", "summary")
  //   // .append("circle")
  //   // .attr("r", 20)
  //   // .style("fill", "#F00")
  //   .html("サマリー")

  // var comment = card.append("div")
  //   .attr("class", "comment")

  // comment.append("div")
  //   .attr("class", "comment-label")
  //   .html("コメント")

  // comment.append("div")
  //   .attr("class", "comment-content")
  //   .html("コメント")

  //Second cicle
  var g2 = svg.append("g")
    .attr("transform", "translate(" + 250 + "," + 300 + ")")
    .attr("class", "second")
    .call(drag)
    .append("circle")
    .attr("r", 20)
    .style("fill", "#00F")

  //Drag handler
  function dragmove(d) {
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this).attr("transform", "translate(" + (x-150) + "," + (y-100) + ")");
    if (d3.select(this).attr("class") == "first") {
      line.attr("x1", x);
      line.attr("y1", y);
    } else {
      line.attr("x2", x);
      line.attr("y2", y);
    }
  }

})();
