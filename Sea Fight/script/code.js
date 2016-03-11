'use strict'

function SeaFight () {
	this.sizeOfField = 0;
	this.magicBox = [];
	this.magicBox1 = [];
	this.quantityOfKillingShip = 0;
	this.quantityOfKillingShip1 = 0;
	this.field = [];
	this.field1 = [];
	this.box = [];
}

SeaFight.prototype = {
	constructor: SeaFight,
	getSizeOfField: function () {
	 this.sizeOfField = 10;
	},
	fillField: function (s) { // граница для opened и ship
		if (s == 1) {
			var arr = this.field;
		}
		if (s == 0) {
			arr = this.field1;
		}
		for (var i = 0; i <= (this.sizeOfField+1); i++) {
  	 		arr[i] = [];
    		   for (var j = 0; j <= (this.sizeOfField+1); j++) {
		    arr[i][j] = {
				ship: false,
				opened: false
				}
			}
		}
		for (var i = 1; i <= this.sizeOfField; i++) { // игровое поле
  	 	    for (var j = 1; j <= this.sizeOfField; j++) {
		    arr[i][j] = {
				ship: false,
				opened: false,
				msg: 'Промазал!'
				}
			}
		}
	},

	getDirection: function () {
		var direction = Math.round(Math.random()); // 0 или 1
			return direction;
	},

	getCoordinate_1: function (k) { // горизонталь
		var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		var lengShips = Math.round(1 + Math.random()*(this.sizeOfField-1)); // от 1 до 10
		var lengShips1 = Math.round(1 + Math.random()*(this.sizeOfField - ships[k])); // от 1 до...
		return [lengShips, lengShips1];
	},

	getCoordinate_0: function (k) { // вертикаль
		var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		var lengShips = Math.round(1 + Math.random()*(this.sizeOfField - ships[k])); // от 1 до...
		var lengShips1 = Math.round(1 + Math.random()*(this.sizeOfField-1)); // от 1 до 10
		return [lengShips, lengShips1];
	},

	putShip: function(s) {
		var ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1], shipsL = ships.length;
		var direction = [];
			for (var i = 0; i < shipsL; i++) {
				direction[i] = this.getDirection(); // фиксирую направление короблей
			}
			for (var k = 0; k < shipsL; k++) {
				if (direction[k]==1) { // горизонталь
					var x1 = this.getCoordinate_1(k)[0], y1 = this.getCoordinate_1(k)[1];

					while (this.discoverPlaceShip(x1, y1, 1, ships[k], s) == false) {
						x1 = this.getCoordinate_1(k)[0], y1 = this.getCoordinate_1(k)[1];
					}
					if (this.discoverPlaceShip(x1, y1, 1, ships[k], s) == true) {
						this.putShip1(x1, y1, 1, ships[k], s);
					}
				}
				if (direction[k]==0) {// вертикаль
					var x0 = this.getCoordinate_0(k)[0], y0 = this.getCoordinate_0(k)[1];

					while(this.discoverPlaceShip(x0, y0, 0, ships[k], s) == false) {
						x0 = this.getCoordinate_0(k)[0], y0 = this.getCoordinate_0(k)[1];
					}
					if (this.discoverPlaceShip(x0, y0, 0, ships[k], s) == true) {
						this.putShip1(x0, y0, 0, ships[k], s);
					}
				}
			}
		if (s == 0) { // нужно только для поля пользователя, чтобы компьютер не заходил за грань поля
			for (var i = 0; i <= (this.sizeOfField+1); i++) {
  	 		    this.field1[i][0].opened = true;
  	 		    this.field1[i][this.sizeOfField+1].opened = true;
			}
			for (var j = 0; j <= (this.sizeOfField+1); j++) {
  	 		    this.field1[0][j].opened = true;
  	 		    this.field1[this.sizeOfField+1][j].opened = true;
			}
		}
	return console.log ('Поле готово!');
	},

	discoverPlaceShip: function (x, y, d, k, s) {
		var value = 0, count = 0;
		if (s ==1) {
			var arr = this.field;
		}
		if (s == 0) {
			var arr = this.field1;
		}
   			//
		for (var i = 0; i < k; i++) {
			for (var j = -1; j <= 1; j++) {
			  for (var t = -1; t <= 1; t++) {
			  	if (d==1) {
					count +=1;
					if (arr[x+j][y+t+i].ship == false) {
						value +=1;
					}
					if (arr[x+j][y+t+i].ship == true) {
						return false;
					}
				}
				if (d==0)  {
					count +=1;
					if (arr[x+j+i][y+t].ship == false) {
						value +=1;
					}
					if (arr[x+j+i][y+t].ship == true) {
						return false;
					}
				}
			  }
			}
		}
		if (value == count) {
			return true;
		}
		else {
			return false;
		}
	},

	putShip1: function (x, y, d, k, s) {
		if (s == 1) {
			var arr1 = this.field;
			var arr2 = this.magicBox;
		}
		if (s == 0) {
			arr1 = this.field1;
			arr2 = this.magicBox1;
		}
		var arr = [];
		if (d==1) {
			arr.push(x, y, d, k);
			for (var i = 0; i < k; i++) {
				arr1[x][y+i].ship = true;
				var a = x + ':' + Number(y+i);
				arr.push(a);
			}
		}
		if (d==0) {
			arr.push(x, y, d, k);
			for (var i = 0; i < k; i++) {
				arr1[x+i][y].ship = true;
				a = Number(x+i) + ':' + y;
				arr.push(a);
			}
		}
		arr2.push(arr);
	},

  	hit: function(x, y) {
  		    if ( this.field[x][y].opened) {
  		    	console.log (this.field[x][y].msg = 'Сектор уже открыт!');
  		    }
  		    else {
  		    		this.field[x][y].opened = true;
  		   	 	if (this.field[x][y].ship) {
  		   	 		console.log (this.field[x][y].msg = 'Попал!');
					if (this.killShip(x, y)) {
						this.quantityOfKillingShip +=1;
						this.fixOpenedAfterKillingShip(x, y);
						if (this.quantityOfKillingShip == this.sizeOfField) { // плохо, что количество в свободном доступе
							console.log ('Поздравляем, Вы  выиграли!');
							return
						}
						else {
							this.field[x][y].opened = true;
						}
					}
				}
  		    		else {
  		    			console.log (this.field[x][y].msg);
  		    			this.field[x][y].opened = true;
  		    			this.hitFromComputer();
  		    		}
  		    }
  	return // this.hit();
  	},

  	fixOpenedAfterKillingShip: function (X, Y) {
		if (!this.field[X-1][Y].ship && !this.field[X+1][Y].ship && !this.field[X][Y-1].ship && !this.field[X][Y+1].ship) {
			for (var i = -1; i <= 1; i++) {
				for (var j = -1; j <= 1; j++) {
					this.field[X+i][Y+j].opened = true; // 1-но палубный корабль
				}
			}
		}
		var str = X+':'+Y;
		var arr = [];
		for (var i = 0; i < this.sizeOfField; i++) {
			if (this.magicBox[i].indexOf(str) !== -1) { // только в одном случае!
				arr.push(this.magicBox[i]);
			}
		}
		var arrX = [], arrY = [];
		for (var i = 4; i < arr[0].length; i++) {
			if (arr[0][i].indexOf(':') == 1) {
				arrX.push(Number(arr[0][i].charAt(0)));
				arrY.push(Number(arr[0][i].substring(2)));
			}
			if (arr[0][i].indexOf(':') == 2) {
				arrX.push(Number(arr[0][i].charAt(0)+arr[0][i].charAt(1)));
				arrY.push(Number(arr[0][i].substring(3)));
			}
		}
		if (this.field[X-1][Y].ship || this.field[X+1][Y].ship || this.field[X][Y-1].ship || this.field[X][Y+1].ship) {
			for (var k = 0; k < arrX.length; k++) {
				for (var i = -1; i <= 1; i++) {
					for (var j = -1; j <=1; j++) {
						this.field[arrX[k]+i][arrY[k]+j].opened = true;
					}
				}
			}
		}
	},

	killShip: function (X, Y) { // вызывается только когда попали
		var str = X+':'+Y;
		var arr = [];
		for (var i = 0; i < this.sizeOfField; i++) {
			if (this.magicBox[i].indexOf(str) !== -1) { // только в одном случае!
				arr.push(this.magicBox[i]);
			}
		}
		var arrX = [], arrY = [];
		for (var i = 4; i < arr[0].length; i++) {
			if (arr[0][i].indexOf(':') == 1) {
				arrX.push(Number(arr[0][i].charAt(0)));
				arrY.push(Number(arr[0][i].substring(2)));
			}
			if (arr[0][i].indexOf(':') == 2) {
				arrX.push(Number(arr[0][i].charAt(0)+arr[0][i].charAt(1)));
				arrY.push(Number(arr[0][i].substring(3)));
			}
		}
		if (!this.field[X-1][Y].ship && !this.field[X+1][Y].ship && !this.field[X][Y-1].ship && !this.field[X][Y+1].ship ) {
			console.log ('Убил корабль компьютера!'); // просто 1-но палубный корабль
			return true;
		}
		if (this.field[X-1][Y].ship || this.field[X+1][Y].ship || this.field[X][Y-1].ship || this.field[X][Y+1].ship) {
			var value = 0;
			for (var i = 0; i < arrX.length; i++) {
				if (!this.field[arrX[i]][arrY[i]].opened) {
					return false; // корабль еще не открыт
				}
				if (this.field[arrX[i]][arrY[i]].opened) {
					value +=1;
					console.log (value);
					if (value == arr[0][3]) {
						console.log ('Убил корабль компьютера!');
						return true; // таки убили
					}
				}
			}
		}
	},

	fixOpenedAfterKillingShip1: function (X, Y) {
		if (!this.field1[X-1][Y].ship && !this.field1[X+1][Y].ship && !this.field1[X][Y-1].ship && !this.field1[X][Y+1].ship) {
			for (var i = -1; i <= 1; i++) {
				for (var j = -1; j <= 1; j++) {
					this.field1[X+i][Y+j].opened = true; // 1-но палубный корабль
				}
			}
		}
		var str = X+':'+Y;
		var arr = [];
		for (var i = 0; i < this.sizeOfField; i++) {
			if (this.magicBox1[i].indexOf(str) !== -1) { // только в одном случае!
				arr.push(this.magicBox1[i]);
			}
		}
		var arrX = [], arrY = [];
		for (var i = 4; i < arr[0].length; i++) {
			if (arr[0][i].indexOf(':') == 1) {
				arrX.push(Number(arr[0][i].charAt(0)));
				arrY.push(Number(arr[0][i].substring(2)));
			}
			if (arr[0][i].indexOf(':') == 2) {
				arrX.push(Number(arr[0][i].charAt(0)+arr[0][i].charAt(1)));
				arrY.push(Number(arr[0][i].substring(3)));
			}
		}
		if (this.field1[X-1][Y].ship || this.field1[X+1][Y].ship || this.field1[X][Y-1].ship || this.field1[X][Y+1].ship) {
			for (var k = 0; k < arrX.length; k++) {
				for (var i = -1; i <= 1; i++) {
					for (var j = -1; j <=1; j++) {
						this.field1[arrX[k]+i][arrY[k]+j].opened = true;
					}
				}
			}
		}
	},

	killShip1: function (X, Y) { // вызывается только когда попали
		var str = X+':'+Y;
		var arr = [];
		for (var i = 0; i < this.sizeOfField; i++) {
			if (this.magicBox1[i].indexOf(str) !== -1) { // только в одном случае!
				arr.push(this.magicBox1[i]);
			}
		}
		var arrX = [], arrY = [];
		for (var i = 4; i < arr[0].length; i++) {
			if (arr[0][i].indexOf(':') == 1) {
				arrX.push(Number(arr[0][i].charAt(0)));
				arrY.push(Number(arr[0][i].substring(2)));
			}
			if (arr[0][i].indexOf(':') == 2) {
				arrX.push(Number(arr[0][i].charAt(0)+arr[0][i].charAt(1)));
				arrY.push(Number(arr[0][i].substring(3)));
			}
		}
		if (!this.field1[X-1][Y].ship && !this.field1[X+1][Y].ship && !this.field1[X][Y-1].ship && !this.field1[X][Y+1].ship ) {
			console.log ('Убил корабль пользователя!'); // просто 1-но палубный корабль
			return true;
		}
		if (this.field1[X-1][Y].ship || this.field1[X+1][Y].ship || this.field1[X][Y-1].ship || this.field1[X][Y+1].ship) {
			var value = 1;
			for (var i = 0; i < arrX.length; i++) {
				if (!this.field1[arrX[i]][arrY[i]].opened) {
					return false; // корабль еще не открыт
				}
				if (this.field1[arrX[i]][arrY[i]].opened) {
					value +=1;
					console.log (value);
					if (value == arr[0][3]) {
						console.log ('Убил корабль пользователя!');
						return true; // таки убили
					}
				}
			}
		}
	},

	getCoordinateC: function () {
		return [Math.round(1 + Math.random()*(this.sizeOfField-1)), Math.round(1 + Math.random()*(this.sizeOfField-1))];
	},

	hitFromComputer: function () {
		if (this.box.length == 0) { // если попали, то координаты не получаем, а обстреливаем корабль
			var x = this.getCoordinateC()[0], y = this.getCoordinateC()[1];
			while (this.field1[x][y].opened) {
				x = this.getCoordinateC()[0], y = this.getCoordinateC()[1];
			}
			if (!this.field1[x][y].opened) {
				this.field1[x][y].opened = true;
				console.log(x + ':' + y);
				if (!this.field1[x][y].ship) {
					return //this.hit(); // ход пользователя
				}
				if (this.field1[x][y].ship) {
					if (this.killShip1(x, y)) {
						this.fixOpenedAfterKillingShip1(x, y);
						this.quantityOfKillingShip1 +=1;
						if (this.quantityOfKillingShip1 == this.sizeOfField) {
							console.log('К сожалению, Вы проиграли. Попробуйте, еще раз');
							return
						}
						this.hitFromComputer(); // стреляет компьютер через random
					}
					if (!this.killShip1(x, y)) {
						this.box.push([x ,y, 'hit']);
						console.log(this.box);
						return this.hitDoubleC(x, y);
					}
				}
			}
		}
		if (this.box.length !== 0) {
			console.log('Сразу попали на коробку!!!!')
			return this.hitDoubleC(this.box[0][0], this.box[0][1]); 
			// возвращаемся к последнему элементу в коробке
		}
	},

	findOpen: function (x, y) {// обойдем все по часовой стрелке
		if (!this.field1[x-1][y].opened) {
			return 1;
		}
		if (this.field1[x-1][y].opened) {
			if (!this.field1[x][y+1].opened) {
				return 2;
			}
			if (this.field1[x][y+1].opened) {
				if (!this.field1[x+1][y].opened) {
					return 3;
				}
				if (!this.field1[x][y-1].opened) {
					return 4; // и так понятно какой следующий ход
				}
			}
		}
	},

	hitDoubleC: function (x, y) { //попали и теперь нужно как-то обстрелять корабль
		if (this.box.length == 1) { // попали первый раз
			switch (this.findOpen(x, y)) {
				case 1: var a = x - 1, b = y;
				break;
				case 2: a = x, b = y + 1;
				break;
				case 3: a = x + 1, b = y;
				break;
				case 4: a = x, b = y - 1;
				break;
			}
			this.field1[a][b].opened = true;
			if (!this.field1[a][b].ship) {
				this.box.push([a, b, 'opened']);
				return //this.hit();
			}
			if (this.field1[a][b].ship) {
				if (this.killShip1(a, b)) {
					this.fixOpenedAfterKillingShip1(a, b);
					this.quantityOfKillingShip1 +=1;
					this.box.length = 0; // обнуляем коробку для стредьбы random
					if (this.quantityOfKillingShip1 == this.sizeOfField) {
							console.log('К сожалению, Вы проиграли. Попробуйте, еще раз');
							return false;
					}
					return this.hitFromComputer(); // стреляет компьютер через random
				}
				if (!this.killShip1(a, b)) {
					this.box.push([a, b, 'hit']);
					return this.hitDoubleC(a, b);
				}
			}
		}
		if (this.box.length > 1) { // уже стреляли
			var arr = [];
			for (var i = 0; i < this.box.length; i++) {
				if (this.box[i][2] =='hit') {
					arr.push([this.box[i][0],this.box[i][1]]);
				}
			}
			if (arr.length == 1) {// одно попадание
				switch (this.findOpen(arr[0][0], arr[0][1])) {
					case 1: a = arr[0][0] - 1, b = arr[0][1];
					break;
					case 2: a = arr[0][0], b = arr[0][1]+ 1;
					break;
					case 3: a = arr[0][0] + 1, b = arr[0][1];
					break;
					case 4: a = arr[0][0], b = arr[0][1] - 1;
					break;
				}
				this.field1[a][b].opened = true;
				if (!this.field1[a][b].ship) {
					this.box.push([a, b, 'opened']);
					return //this.hit();
				}
				if (this.field1[a][b].ship) {
					if (this.field1[a][b].ship) {
						if (this.killShip1(a, b)) {
							this.fixOpenedAfterKillingShip1(a, b);
							this.quantityOfKillingShip1 +=1;
							this.box.length = 0; // обнуляем коробку для стредьбы random
							if (this.quantityOfKillingShip1 == this.sizeOfField) {
								console.log('К сожалению, Вы проиграли. Попробуйте, еще раз');
								return false;
							}
							return this.hitFromComputer(); // стреляет компьютер через random
						}
						if (!this.killShip1(a, b)) {
							this.box.push([a, b, 'hit']);
							return this.hitDoubleC(a, b);
						}
					}
				}
			}
			if (arr.length >= 2) {
				if (arr[0][0] == arr[1][0]) { // корабль по горизонтали
					for (var i = 0; i < arr.length; i++) {
						var max=arr[0][1], min=arr[0][1];
						if (max < arr[i][1]) {
							max = arr[i][1];
						}
						if (min > arr[i][1]) {
							min = arr[i][1];
						}
					}
					if (!this.field1[arr[0][0]][min-1].opened) {
						this.field1[arr[0][0]][min-1].opened = true;
							if (!this.field1[arr[0][0]][min-1].ship) {
								this.box.push([arr[0][0], min-1, 'opened']);
								return //this.hit();
							}
							if (this.field1[arr[0][0]][min-1].ship) {
								if (this.field1[arr[0][0]][min-1].ship) {
									if (this.killShip1(arr[0][0], min-1)) {
									this.fixOpenedAfterKillingShip1(arr[0][0], min-1);
									this.quantityOfKillingShip1 +=1;
									this.box.length = 0; // обнуляем коробку для стредьбы random
									if (this.quantityOfKillingShip1 == this.sizeOfField) {
										console.log('К сожалению, Вы проиграли. Попробуйте, еще раз');
										return false;
									}
									return this.hitFromComputer(); // стреляет компьютер через random
								}
								if (!this.killShip1(arr[0][0], min-1)) {
									this.box.push([arr[0][0], min-1, 'hit']);
									return this.hitDoubleC(arr[0][0], min-1);
								}
							}
						}
					}
					if (!this.field1[arr[0][0]][max+1].opened) {
						this.field1[arr[0][0]][max+1].opened = true;
							if (!this.field1[arr[0][0]][max+1].ship) {
								this.box.push([arr[0][0], max+1, 'opened']);
								return //this.hit();
							}
							if (this.field1[arr[0][0]][max+1].ship) {
								if (this.field1[arr[0][0]][max+1].ship) {
									if (this.killShip1(arr[0][0], max+1)) {
									this.fixOpenedAfterKillingShip1(arr[0][0], max+1);
									this.quantityOfKillingShip1 +=1;
									this.box.length = 0; // обнуляем коробку для стредьбы random
									if (this.quantityOfKillingShip1 == this.sizeOfField) {
										console.log('К сожалению, Вы проиграли. Попробуйте, еще раз');
										return false;
									}
									return this.hitFromComputer(); // стреляет компьютер через random
								}
								if (!this.killShip1(arr[0][0], max+1)) {
									this.box.push([arr[0][0], max+1, 'hit']);
									return this.hitDoubleC(arr[0][0], max+1);
								}
							}
						}
					}
				}
				if (arr[0][1] == arr[1][1]) {// корабль по вертикали
					for (var i = 0; i < arr.length; i++) {
						var max=arr[0][0], min=arr[0][0];
						if (max < arr[i][0]) {
							max = arr[i][0]; // низ
						}
						if (min > arr[i][0]) {
							min = arr[i][0]; // верх
						}
					}
					if (!this.field1[min-1][arr[0][1]].opened) {
						this.field1[min-1][arr[0][1]].opened = true;
							if (!this.field1[min-1][arr[0][1]].ship) {
								this.box.push([min-1, arr[0][1], 'opened']);
								return //this.hit();
							}
							if (this.field1[min-1][arr[0][1]].ship) {
								if (this.field1[min-1][arr[0][1]].ship) {
									if (this.killShip1(min-1, arr[0][1])) {
									this.fixOpenedAfterKillingShip1(min-1, arr[0][1]);
									this.quantityOfKillingShip1 +=1;
									this.box.length = 0; // обнуляем коробку для стредьбы random
									if (this.quantityOfKillingShip1 == this.sizeOfField) {
										console.log('К сожалению, Вы проиграли. Попробуйте, еще раз');
										return false;
									}
									return this.hitFromComputer(); // стреляет компьютер через random
								}
								if (!this.killShip1(min-1, arr[0][1])) {
									this.box.push([min-1, arr[0][1], 'hit']);
									return this.hitDoubleC(min-1, arr[0][1]);
								}
							}
						}
					}
					if (!this.field1[max+1][arr[0][1]].opened) {
						this.field1[max+1][arr[0][1]].opened = true;
							if (!this.field1[max+1][arr[0][1]].ship) {
								this.box.push([max+1, arr[0][1], 'opened']);
								return //this.hit();
							}
							if (this.field1[max+1][arr[0][1]].ship) {
								if (this.field1[max+1][arr[0][1]].ship) {
									if (this.killShip1(max+1, arr[0][1])) {
									this.fixOpenedAfterKillingShip1(max+1, arr[0][1]);
									this.quantityOfKillingShip1 +=1;
									this.box.length = 0; // обнуляем коробку для стредьбы random
									if (this.quantityOfKillingShip1 == this.sizeOfField) {
										console.log('К сожалению, Вы проиграли. Попробуйте, еще раз');
										return false;
									}
									return this.hitFromComputer(); // стреляет компьютер через random
								}
								if (!this.killShip1(max+1, arr[0][1], 0)) {
									this.box.push([max+1, arr[0][1], 'hit']);
									return this.hitDoubleC(max+1,arr[0][1]);
								}
							}
						}
					}
				}
			}
		}
	}
}

var battlefield = new SeaFight();

var startGame = document.getElementById('start-game');
var table = document.createElement('table');
var table1 = document.createElement('table');
var placeTable = document.getElementById('visitor');
var placeTable1 = document.getElementById('computer');
var but = document.createElement('button');
	but.textContent = 'Авторасстановка короблей';
	but.id = 'putt';
var but1 = document.createElement('button');
	but1.textContent = 'Переставить';
	but1.id = 'puttt';
var but2 = document.createElement('button');
	but2.textContent = 'Готово!';
	but2.id = 'putt2';
var result = document.createElement('h2');
var result1 = document.createElement('h2');
var inform = document.getElementById('info');
var playAgain = document.createElement('button');
	playAgain.textContent = 'Новая игра'

startGame.onclick = function () {
	battlefield.getSizeOfField();
	battlefield.fillField(1);
	battlefield.fillField(0);
	startGame.style.display = 'none';

	for (var i = 1; i <= battlefield.sizeOfField; i++) {
		var tr = document.createElement('tr');
		var tr1 = document.createElement('tr');
		table.appendChild(tr);
		table1.appendChild(tr1);
		for (var j = 1; j <= battlefield.sizeOfField; j++) {
			var td = document.createElement('td');
			var str = i+':'+j;
			td.setAttribute('data-index', str);
			td.id = '1' + i+j;
			var td1 = document.createElement('td');
			td1.setAttribute('data-index', str);
			td1.id = '0' + i+j;
			tr.appendChild(td);
			tr1.appendChild(td1);
		}
	}
	placeTable.appendChild(table);
	placeTable1.appendChild(table1);
	placeTable.appendChild(but);
}

but.onclick = function () {
	battlefield.putShip(0);
	for (var i = 1; i <= battlefield.sizeOfField; i++) {
		for (var j = 1; j <= battlefield.sizeOfField; j++) {
			var str = '1' + i + j;
			var dataInd = document.getElementById(str);
			if (battlefield.field1[i][j].opened == false && battlefield.field1[i][j].ship) {
				dataInd.classList.add("ship");
			}
		}
	}
	but.style.display = 'none';
	if (document.getElementsByTagName('button').length == 2) {
		placeTable.appendChild(but1);
		placeTable.appendChild(but2);
	}
	if (document.getElementsByTagName('button').length == 5) {
		but1.style.display = '';
		but2.style.display = '';
	}
}
but1.onclick = function () {
	for (var i = 1; i <= battlefield.sizeOfField; i++) {
		for (var j = 1; j <= battlefield.sizeOfField; j++) {
			var str = '1' + i + j;
			var dataInd = document.getElementById(str);
			battlefield.field1[i][j].ship = false;
			battlefield.magicBox1.length = 0;
			dataInd.classList.remove("ship");
		}
	}
	battlefield.putShip(0);
	for (var i = 1; i <= battlefield.sizeOfField; i++) {
		for (var j = 1; j <= battlefield.sizeOfField; j++) {
			var str = '1' + i + j;
			var dataInd = document.getElementById(str);
			if (battlefield.field1[i][j].opened == false && battlefield.field1[i][j].ship) {
				dataInd.classList.add("ship");
			}
		}
	}
}
but2.onclick = function () {
	but1.style.display = 'none';
	but2.style.display = 'none';
	battlefield.putShip(1);
	placeTable1.addEventListener('click', liClick);
}

function liClick (event) {
	var event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;
	while (target.nodeName !== 'TD' && target !== null) {
		target = target.parentElement;
	}
	if (!target)
		throw new Error('Печалька :(');

	var ind = target.dataset.index;
	var dev = ind.indexOf(':');
		var indX = Number(ind.substring(0, dev));
		var indY = Number(ind.substring(dev +1));
		battlefield.hit(indX,indY);
	for (var i = 1; i <= battlefield.sizeOfField; i++) {
		for (var j = 1; j <= battlefield.sizeOfField; j++) {
			var str = '0' + i + j;
			var dataInd = document.getElementById(str);
			var str1 = '1' + i + j;
			var dataInd1 = document.getElementById(str1);

			if (battlefield.field[i][j].opened && battlefield.field[i][j].ship) {
				dataInd.classList.add("shiphit");
			}
			if (battlefield.field[i][j].opened && battlefield.field[i][j].ship == false) {
				dataInd.classList.add("miss");
			}
			if (battlefield.field1[i][j].opened && battlefield.field1[i][j].ship) {
				dataInd1.classList.remove("ship");
				dataInd1.classList.add("shiphit");
			}
			if (battlefield.field1[i][j].opened && battlefield.field1[i][j].ship == false) {
				dataInd1.classList.add("miss");
			}
		}
	}
	if (battlefield.quantityOfKillingShip ==10) {
		placeTable1.removeEventListener('click', liClick);
		result.textContent = 'Поздравляем! Вы выиграли!  Хотите сыграть еще раз?';
		inform.appendChild(result);
		if (result.style.display == 'none') {
			result.style.display = '';
		}
		inform.appendChild(playAgain);
		if (playAgain.style.display == 'none') {
			playAgain.style.display = '';
		}

	}
	if (battlefield.quantityOfKillingShip1 ==10) {
		placeTable1.removeEventListener('click', liClick);
		result1.textContent = 'К сожалению, Вы проиграли. Хотите сыграть еще раз?';
		inform.appendChild(result1);
		if (result1.style.display == 'none') {
			result1.style.display = '';
		}
		inform.appendChild(playAgain);
		if (playAgain.style.display == 'none') {
			playAgain.style.display = '';
		}
	}
}
playAgain.onclick = function () {
	result1.style.display = 'none';
	result.style.display = 'none';
	for (var i = 1; i <= battlefield.sizeOfField; i++) {
		for (var j = 1; j <= battlefield.sizeOfField; j++) {
			var str = '0' + i + j;
			var dataInd = document.getElementById(str);
			var str1 = '1' + i + j;
			var dataInd1 = document.getElementById(str1);
			battlefield.field1[i][j].ship = false;
			battlefield.field1[i][j].opened = false;
			battlefield.quantityOfKillingShip1 = 0;
			battlefield.magicBox1.length = 0;
			battlefield.field[i][j].ship = false;
			battlefield.field[i][j].opened = false;
			battlefield.magicBox.length = 0;
			battlefield.box.length = 0;
			battlefield.quantityOfKillingShip = 0;
			dataInd.classList.remove("shiphit");
			dataInd.classList.remove("miss");
			dataInd1.classList.remove("ship");
			dataInd1.classList.remove("shiphit");
			dataInd1.classList.remove("miss");
		}
	}
	but.style.display = '';
	playAgain.style.display = 'none';
}