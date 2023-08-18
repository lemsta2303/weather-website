function drawCanvasGraph() {
    const canvas = document.querySelector('.my-canvas');
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const dailyTemperatures = document.querySelectorAll('.main__daily-forecast__graph__element__temperature');
    // Tworzenie dynamicznej tablicy data na podstawie długości dailyTemperatures
    let data = [];
    for (let i = 0; i < dailyTemperatures.length; i++) {
        data.push({ x: i, y: 0 });
    }
    let max = -Infinity;
    let min = Infinity;
    for (let i = 0; i < dailyTemperatures.length; i++) {
        const temperature = parseInt(dailyTemperatures[i].innerText);
        if (temperature < min) {
            min = temperature;
        }
        if (temperature > max) {
            max = temperature;
        }
    }
    let unit = 100/(max-min);
    // //console.log(max, min);
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
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    function convertToCanvasCoord(x, y) {
        let canvasX = (x / (data.length - 1)) * chartWidth + 20;
        let canvasY = chartHeight - (y / 100) * chartHeight + 20;
        return { x: canvasX, y: canvasY };
    }
    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = 2;
    const startPoint = convertToCanvasCoord(data[0].x, data[0].y);
    context.moveTo(startPoint.x, startPoint.y);

    for (let i = 1; i < data.length; i++) {
        const prevPoint = convertToCanvasCoord(data[i - 1].x, data[i - 1].y);
        const currentPoint = convertToCanvasCoord(data[i].x, data[i].y);
        const controlPoint1 = {
            x: (prevPoint.x + currentPoint.x) / 2,
            y: prevPoint.y
        };
        const controlPoint2 = {
            x: (prevPoint.x + currentPoint.x) / 2,
            y: currentPoint.y
        };

        context.bezierCurveTo(
            controlPoint1.x, controlPoint1.y,
            controlPoint2.x, controlPoint2.y,
            currentPoint.x, currentPoint.y
        );
    }

context.stroke();
}
