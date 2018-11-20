'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 155;
var CLOUD_Y = 270;
var GAP = 50;
var BAR_WIDCH = 40;
var FONT_GAP = BAR_WIDCH / 2;
var FONT_HEIGHT = 20;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function getRandomNumber() {
  var s = Math.floor(Math.random() * 100);
  return s;
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');
  ctx.fillStyle = '#000';
  ctx. textAlign = 'left';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 50);
  ctx.fillText('Список результатов:', 120, 70);

  var maxTime = getMaxElement(times);

  ctx. textAlign = 'center';
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + FONT_GAP + (BAR_WIDCH + GAP) * i, CLOUD_Y);

    if (names[i] === 'Вы') {
      ctx.fillStyle = '#c00';
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomNumber() + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + (GAP + BAR_WIDCH) * i, CLOUD_Y - FONT_HEIGHT, BAR_WIDCH, -(BAR_HEIGHT * times[i] / maxTime));

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + FONT_GAP + (BAR_WIDCH + GAP) * i, CLOUD_Y - FONT_HEIGHT * 1.5 - (BAR_HEIGHT * times[i] / maxTime));
  }
};


