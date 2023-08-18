function drawCanvasGraph() {
    const canvas = document.querySelector('.my-canvas');
    const context = canvas.getContext("2d");
    const dailyTemperatures = document.querySelectorAll('.main__daily-forecast__graph__element__temperature');
    let data = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 }
    ];
    let max = -99999;
    let min = 99999;
    for (let i = 0; i < dailyTemperatures.length; i++) {
        if (parseInt(dailyTemperatures[i].innerText) < min) {
            min = parseInt(dailyTemperatures[i].innerText);
        }
        if (parseInt(dailyTemperatures[i].innerText) > max) {
            max = parseInt(dailyTemperatures[i].innerText);
        }
    }
    let unit = 100/(max-min);
    console.log(max, min);
    for(let i = 0; i< dailyTemperatures.length; i++){
        if (parseInt(dailyTemperatures[i].innerText) == max ){

            data[i].y = 100;
        }
        else if (parseInt(dailyTemperatures[i].innerText) == min ){
            data[i].y = 0;
        }
        else{
            data[i].y = (parseInt(dailyTemperatures[i].innerText)-min) * unit;
        }
        
    }
    console.log(data);

    // console.log(data);
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;

    // Funkcja do przeliczania współrzędnych na płaszczyźnie canvas
    function convertToCanvasCoord(x, y) {
        let canvasX = (x / (data.length - 1)) * chartWidth + 20;
        let canvasY = chartHeight - (y / 100) * chartHeight + 20;
        return { x: canvasX, y: canvasY };
    }
    // Rysowanie wykresu liniowego
    context.beginPath();
    context.strokeStyle = "blue";
    context.lineWidth = 2;
    const startPoint = convertToCanvasCoord(data[0].x, data[0].y);
    context.moveTo(startPoint.x, startPoint.y);

    for (let i = 1; i < data.length; i++) {
        let point = convertToCanvasCoord(data[i].x, data[i].y);
        context.lineTo(point.x, point.y);
    }
    context.stroke();
}
