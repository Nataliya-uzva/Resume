
function controler () {

    var start = document.querySelector(".yellow");
    var red = document.querySelector(".red");
    var green = document.querySelector(".green");
    var count = 50;
    var timer = setInterval(function () {
        console.log(count);
            if (count <= 50 && count >= 32) {
                start.classList.remove("active");
                if (!red.classList.contains('active') && !start.classList.contains('redText')) {  
                    red.className += ' active';
                    start.className += ' redText';
                }
               start.textContent = +start.textContent -1 +'';
               count -=1; 
            }
            if (count <= 31 && count >= 28) {
               start.classList.remove("redText");
               
               if (!start.classList.contains('active')) {
                start.className += ' active';
                start.textContent = '23';
               } 
               count -=1; 
            }
            if (count <= 27 && count >= 5) {
               start.classList.remove("active");
               red.classList.remove("active");
                if (!start.classList.contains('greenText') && !green.classList.contains('active')) {  
                    green.className += ' active';
                    start.className += ' greenText';
                }   
               start.textContent = +start.textContent -1 +'';
               count -=1; 
            }
            if (count <= 4 && count >= 1) {
               green.classList.remove("active");
               start.classList.remove("greenText");
                if (!start.classList.contains('active')) {  
                    start.className += ' active';
                    start.textContent = '23';
                }
                count -=1;
            }
            if (count == 0) {
                    count = 50;
            }

        }, 1000);
}        

controler();