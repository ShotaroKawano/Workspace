var board = d3.select("#board")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 1000)


  var count = 0;

$('#btn_save').on('click', function () {

  var el = '<div class="article"><div class="thumb"></div><div class="summary">サマリー</div></div><div class="comment"><div class="comment-label">コメント</div><div class="comment-content">コメント</div></div>';

  count += 1;

  // var card = board.html(el).call(drag);
  var card = board
    .append("foreignObject")
    .attr("width", 300)
    .attr("height", 200)
    .attr("x", 0)
    .attr("y", 0)
    .call(drag)
    .append("xhtml:div")
    .attr("class", "card")
    .attr("id", count)
    .html(el)

});


// 多分divを掴んでると思ったら、foreignObjectなのかも


var drag = d3.drag()
  .on("start", function () {
    d3.event.sourceEvent.stopPropagation() //いる？
  })
  .on("drag", dragmove);


function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + (x - 150) + "," + (y - 100) + ")");
  // console.log($(this).children().hasClass('card'));
  var id = this.children[0].getAttribute('id');
  console.log(id);

  if ($(this).children().hasClass('start')) {
    line.attr("x1", x);
    line.attr("y1", y);
  } else if ($(this).children().hasClass('end')) {
    line.attr("x2", x);
    line.attr("y2", y);
  }
}


var startX = 0;
var startY = 0;
var startId = 0;
var endX = 0;
var endY = 0;
var endId = 0;


var startSelector;
var endSelector;

$(document).on('click', '.card', function (e) {

  elementList = document.querySelectorAll('.card');
  console.log(elementList);
  elementList.forEach(element => {

    $(element).removeClass('start');
    $(element).removeClass('end');
  });


  startSelector = endSelector;
  if (startSelector != null) {
    startSelector.addClass('selected').addClass('start');
  }

  endSelector = $(this);
  console.log(endSelector);
  endSelector.addClass('selected').addClass('end');

  startX = endX;
  startY = endY;

  endX = e.clientX;
  endY = e.clientY;

  console.log(endSelector);
  console.log('startId' + startId);
  console.log('endId' + endId);
  startId = endId;
  endId = endSelector.attr('id');
  console.log('startId2' + startId);
  console.log('endId2' + endId);


  console.log([startX, startY, startId, endX, endY, endId]);
});


var line;

$('#btn_link').on('click', function () {
  console.log('koko');

  if (startX != 0 && startY != 0 && endX != 0 && endY != 0) {
    line = board.append("line")
      .style("stroke", "black")
      .attr("x1", startX)
      .attr("y1", startY)
      .attr("x2", endX)
      .attr("y2", endY)
      .attr("class", "anchor_" + startId)
      .attr("class", "anchor_" + endId);
  }
});
