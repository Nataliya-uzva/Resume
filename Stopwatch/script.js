
$(document).ready(function() {

var timer = 0, sec = 0, h = 0, m = 0, s = 0, b_date = 0, e_date = 0, s_date = 0, ms = 0, z = 0;
var standart = new Date(1970,1, 1, 0, 0, 0, 0).valueOf();

$('#start').on('click', function () {
  $('#refresh').show();
  if(timer==0){
      if (b_date==0) b_date = (new Date()).valueOf();
      else b_date = (new Date()).valueOf()-ms;
        
      timer = setInterval( function () {
      e_date = (new Date()).valueOf();
      ms = e_date-b_date;
      draw(ms);
      },50);

      $('#start').text('Стоп');
  } else {
    z++;
    clearInterval(timer);
    timer=0;
    $('#start').text('Старт');
    ms = e_date-b_date;
    $('#results').html($('#results').html() +'<div>Отсечка №'+z+'. '+format_zero2(ms)+'</div>');
  }
});

$('#refresh').on('click', function () {
  kill();
  $('#results').empty();
  $('#refresh').hide();
});

$('#zero').on('click', function () {
  kill();
});

function kill () {
  clearInterval(timer);
  timer=0;
  sec=0;
  b_date=0;
  z=0;
  e_date=0;
  s_date=0
  ms = 0;
  $('#start').text('Старт');
  draw(sec);
}

function draw(val) {
  $('#timer').html(format_zero2(val,7)+' с');
}

function format_zero(val, zero) {
  var l = zero - val.toString().length;
  for (var i = 0; i <=l; i++) val = '0' + val;
  return val;
}

function format_zero2(val,zero){
  var d=new Date(ms+standart).toString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/, '$1');
  var x=String(ms%1000);
  while (x.length<3) x='0'+x;
  d+='.'+x;
  return d;
}
});