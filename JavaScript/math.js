function mobileMenu() {
    let x = document.querySelector(".mobile-menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function meanCalculation() {
    var alert = document.querySelector(".alert");
    var numbers = localStorage.getItem("numberCalData");
    var opt = localStorage.getItem("numberCalRadio");

    if (numbers.length != 0) {
        // Split the value into an array and then return a new array of those 
        // string values converted to numbers
        var nums = numbers.split(",").map((num) => {
            return +num;
        });

        let smallest = Math.min(...nums);
        let max = Math.max(...nums);
        let count = nums.length;
        let sum = nums.reduce((a, b) => a + b);
        let product = nums.reduce((a, b) => a * b);
        let gm = Math.pow(product, 1 / count);
        let avg = sum / count;
        let sortedValue = [];
        sortedValue = nums.sort(function (a, b) {
            return a - b
        });

        visibleTable();
        document.querySelector("#min").innerHTML = smallest;
        document.querySelector("#max").innerHTML = max;
        document.querySelector("#count").innerHTML = count;
        document.querySelector("#sum").innerHTML = sum;
        document.querySelector("#median").innerHTML = median(sortedValue);
        document.querySelector("#mode").innerHTML = mode(nums);
        document.querySelector("#mean").innerHTML = avg.toFixed(2);
        document.querySelector("#gm").innerHTML = gm.toFixed(2);
        document.querySelector("#std").innerHTML = `${std(nums, opt).toFixed(2)} ${opt}`;
        document.querySelector("#sortTitle").innerHTML = 'Sorted list: ';
        alert.style.display = "none";

        for (i = 0; i < sortedValue.length; i++) {
            let par = document.getElementById("sortItem");
            let input = document.createElement("span"); //Create span tag
            input.setAttribute('id', `span${i}`);
            par.appendChild(input);
            document.getElementById(`span${i}`).innerHTML = sortedValue[i];
        }

    } else {
        document.querySelector("#error").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter number first';
        alert.style.display = "inline-block";
    }
}

function median(sortedValue) {
    let values = sortedValue;
    if (values.length === 0) return 0;

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

function mode(numbers) {
    var modes = [],
        count = [],
        i, number, maxIndex = 0;

    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }

    for (i in count) {
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
    }

    return modes;
}

function std(arr, opt) {
    // Creating the mean with Array.reduce
    let mean = arr.reduce((acc, curr) => {
        return acc + curr;
    }, 0) / arr.length;

    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k) => {
        return (k - mean) ** 2;
    })

    // Calculating the sum of updated array
    let sum = arr.reduce((acc, curr) => acc + curr, 0);

    // Calculating the variance
    let variance1 = sum / arr.length;
    let variance2 = sum / (arr.length - 1);

    // Returning the Standered deviation
    if (opt == '(Population)') {
        return Math.sqrt(variance1);
    } else if (opt == '(Sample)') {
        return Math.sqrt(variance2);
    }
}

function visibleTable() {
    var tbl = document.querySelector("#Table");
    tbl.style.display = "initial";
}


//Percentage calculation
function percentage() {
    let alert = document.querySelector(".alrt1");
    let rslt = document.querySelector(".rslt1");
    let number = Number(document.getElementById('number').value);
    let percent = Number(document.getElementById('percent').value);

    if (number != '' && percent != '') {
        let result = (number * percent) / 100;

        document.getElementById('result1').innerHTML = `Result: ${percent}% of ${number} = ${result}`;
        rslt.style.display = 'inline-block';
        alert.style.display = "none";
    } else {
        document.querySelector("#error1").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all field';
        alert.style.display = "inline-block";
        rslt.style.display = 'none';
    }

}

function percentageDifference() {
    let alert = document.querySelector(".alrt2");
    let rslt = document.querySelector(".rslt2");
    let number1 = Number(document.getElementById('number1').value);
    let number2 = Number(document.getElementById('number2').value);

    if (number1 != '' && number2 != '') {
        let pChange = 100 * Math.abs((number1 - number2) / ((number1 + number2) / 2));
        document.getElementById('result2').innerHTML = `Difference of ${number1} and ${number2} are ${pChange.toFixed(2)}%`;
        rslt.style.display = 'inline-block';
        alert.style.display = "none";
    } else {
        document.querySelector("#error2").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all field';
        alert.style.display = "inline-block";
        rslt.style.display = 'none';
    }
}

function percentageChange() {
    let alert = document.querySelector(".alrt3");
    let rslt = document.querySelector(".rslt3");
    let number = Number(document.getElementById('numberCng').value);
    let percentCng = Number(document.getElementById('percentCng').value);
    let option = document.getElementById('cngOption').value;
    let percent, inc = 0,
        dec = 0;
    percent = (number * percentCng) / 100;

    if (number != '' && percentCng != '') {
        if (option == 'i') {
            inc = number + percent;
            document.getElementById('result3').innerHTML = `${number} increase ${percentCng}% = ${inc}`;
        } else {
            dec = number - percent;
            document.getElementById('result3').innerHTML = `${number} decrease ${percentCng}% = ${dec}`;
        }
        rslt.style.display = 'inline-block';
        alert.style.display = "none";
    } else {
        document.querySelector("#error3").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all field';
        alert.style.display = "inline-block";
        rslt.style.display = 'none';
    }
}


// Box plot maker

let numberBoxCount = 2;

function boxPlotMaker() {
    let data = [],
        inputStatus;
    for (i = 1; i < numberBoxCount; i++) {
        let numbers = document.getElementById(`numberBox${i}`).value;
        let numbers_y = numbers.split(",").map((num) => {
            return +num;
        });

        if (numbers == '') {
            inputStatus = 'empty';
        } else {
            let trace = {
                y: numbers_y,
                name: `Group ${i}`,
                type: 'box'
            };
            data.push(trace);
        }
    }

    if (inputStatus != 'empty') {
        var layout = {
            title: 'Grouped Box Plot'
        };
        Plotly.newPlot('BoxPlot', data, layout);
    } else {
        var alert = document.querySelector(".alert");
        document.querySelector("#box-plt-error").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all field';
        alert.style.display = "inline-block";
    }

}

function addInpGroup() {
    let input;
    let parent = document.getElementById("addgroup");

    input = document.createElement('textarea');
    input.setAttribute('class', 'numbersBox short-ht-inp');
    input.setAttribute('placeholder', `(Group ${numberBoxCount}) Enter number here...`);
    input.setAttribute('id', `numberBox${numberBoxCount}`);
    parent.appendChild(input);
    numberBoxCount++
}

// Update dataset

function updateDataCalculation() {
    var updated_dataset = [],
        input, product, add, sub, division, fullResult = [];
    var alert = document.querySelector(".alert");
    var ans_bdy = document.querySelector(".ans-body");
    var numbers = document.querySelector("#update-data").value;
    var value = Number(document.querySelector("#update-value").value);
    var select = document.querySelector("#update-select").value;
    var parent = document.getElementById("full-answer-par");
    let dpointToggle = document.querySelector("#dpointToggle");

    var nums = numbers.split(",").map((num) => {
        return +num;
    });

    if (numbers != '' && value != '' && select != 'select') {
        if (select == '*') {
            for (i = 0; i < nums.length; i++) {
                product = (nums[i] * value);
                if (dpointToggle.checked == true) {
                    product = product.toFixed(2);
                }
                updated_dataset.push(product);
                fullResult.push(`Data ${i+1} &#10132; ${nums[i]} &#215; ${value} = ${product}`);
            }

        } else if (select == '+') {
            for (i = 0; i < nums.length; i++) {
                add = (nums[i] + value);
                if (dpointToggle.checked == true) {
                    add = add.toFixed(2);
                }
                updated_dataset.push(add);
                fullResult.push(`Data ${i+1} &#10132; ${nums[i]} + ${value} = ${add}`);
            }

        } else if (select == '-') {
            for (i = 0; i < nums.length; i++) {
                sub = (nums[i] - value);
                if (dpointToggle.checked == true) {
                    sub = sub.toFixed(2);
                }
                updated_dataset.push(sub);
                fullResult.push(`Data ${i+1} &#10132; ${nums[i]} - ${value} = ${sub}`);
            }
        } else if (select == '/') {
            for (i = 0; i < nums.length; i++) {
                division = (nums[i] / value);
                if (dpointToggle.checked == true) {
                    division = division.toFixed(2);
                }
                updated_dataset.push(division);
                fullResult.push(`Data ${i+1} &#10132; ${nums[i]} &#247; ${value} = ${division}`);
            }
        }

        document.querySelector("#short-answer").innerHTML = `<b style="color:green">Short answer:</b> ${updated_dataset}`;
        document.querySelector("#fa-title").innerHTML = '<b style="color:green">Full answer:</b>';
        for (i = 0; i < nums.length; i++) {
            input = document.createElement('p');
            input.setAttribute('class', 'full-ans');
            input.setAttribute('id', `full-answer${i}`);
            parent.appendChild(input);
            document.querySelector(`#full-answer${i}`).innerHTML = fullResult[i];
        }
        alert.style.display = "none";
        ans_bdy.style.display = "block";

    } else {
        document.querySelector("#update-data-error").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all field';
        alert.style.display = "inline-block";
        ans_bdy.style.display = "none";
    }
}


// Distance measure

function distanceMeasure() {
    var alert = document.querySelector(".alert");
    let edresult = document.querySelector(".ed-result");
    let mnresult = document.querySelector(".mn-result");
    let mnkresult = document.querySelector(".mnk-result");
    let supdresult = document.querySelector(".supd-result");
    let csresult = document.querySelector(".cs-result");
    let dpointToggle = document.querySelector("#dpointToggle");
    let dpNo = Number(document.querySelector("#dp-select").value);

    let x = document.getElementById("x_data").value;
    let y = document.getElementById("y_data").value;
    let measureSelect = document.getElementById("measure_select").value;

    let xData = x.split(",").map((num) => {
        return +num;
    });
    let yData = y.split(",").map((num) => {
        return +num;
    });

    if ((xData.length == yData.length) && (x != '' && y != '')) {
        if (measureSelect == 1) { //Euclidean Distance
            let subxy, subSqxy, sumAllXY = 0,
                EuclideanDistance, edresultStep1 = [];

            for (i = 0; i < xData.length; i++) {
                subxy = xData[i] - yData[i];
                subSqxy = Math.pow(subxy, 2);
                sumAllXY += subSqxy;
                if (i < xData.length - 1) {
                    edresultStep1.push(`(${xData[i]}-${yData[i]})<sup>2</sup>+`);
                } else {
                    edresultStep1.push(`(${xData[i]}-${yData[i]})<sup>2</sup> )`);
                }
            }
            EuclideanDistance = Math.sqrt(sumAllXY);
            if (dpointToggle.checked == true) {
                sumAllXY = sumAllXY.toFixed(dpNo);
                EuclideanDistance = EuclideanDistance.toFixed(dpNo);
            }
            edresult.style.display = "inline-block";
            mnresult.style.display = "none";
            mnkresult.style.display = "none";
            supdresult.style.display = "none";
            csresult.style.display = "none";
            //Result
            let inp;
            let par = document.getElementById("ed-part1");
            for (i = 0; i <= edresultStep1.length; i++) {
                inp = document.createElement('span');
                inp.setAttribute('id', `ed-result${i}`);
                par.appendChild(inp);

                if (i < edresultStep1.length) {
                    document.getElementById(`ed-result${i}`).innerHTML = edresultStep1[i];
                }
            }
            document.getElementById(`ed-result${edresultStep1.length}`).innerHTML = ` = &#8730;<b style='color:red'>${sumAllXY}</b>`;
            document.getElementById("ed-part2").innerHTML = `Final Result: <b style='color:green'>${EuclideanDistance}</b>`;

        } else if (measureSelect == 2) { //Manhattan Distance
            let subxy, sumxy = 0,
                mnresultStep1 = [],
                ManhattanDistance;
            for (i = 0; i < xData.length; i++) {
                subxy = Math.abs(xData[i] - yData[i]);
                sumxy += subxy;
                if (i < xData.length - 1) {
                    mnresultStep1.push(`|${xData[i]}-${yData[i]}|+`);
                } else {
                    mnresultStep1.push(`|${xData[i]}-${yData[i]}|`)
                }
            }
            ManhattanDistance = sumxy;
            if (dpointToggle.checked == true) {
                sumxy = sumxy.toFixed(dpNo);
                ManhattanDistance = ManhattanDistance.toFixed(dpNo);
            }
            mnresult.style.display = "inline-block";
            edresult.style.display = "none";
            mnkresult.style.display = "none";
            supdresult.style.display = "none";
            csresult.style.display = "none";
            //Result
            let inp;
            let par = document.getElementById("mn-part1");
            for (i = 0; i <= mnresultStep1.length; i++) {
                inp = document.createElement('span');
                inp.setAttribute('id', `mn-result${i}`);
                par.appendChild(inp);

                if (i < mnresultStep1.length) {
                    document.getElementById(`mn-result${i}`).innerHTML = mnresultStep1[i];
                }
            }
            document.getElementById(`mn-result${mnresultStep1.length}`).innerHTML = ` = <b style='color:red'>${sumxy}</b>`;
            document.getElementById("mn-part2").innerHTML = `Final Result: <b style='color:green'>${ManhattanDistance}</b>`;

        } else if (measureSelect == 3) { //Minkowski Distance
            let power = document.getElementById("p-input").value;
            if (power != '') {
                let subXY, subPowXY, allSumXY = 0,
                    mnkresultStep1 = [],
                    MinkowskiDistance;
                for (i = 0; i < xData.length; i++) {
                    subXY = Math.abs(xData[i] - yData[i]);
                    subPowXY = Math.pow(subXY, power);
                    allSumXY += subPowXY;
                    if (i < xData.length - 1) {
                        mnkresultStep1.push(`|${xData[i]}-${yData[i]}|<sup>${power}</sup>+`);
                    } else {
                        mnkresultStep1.push(`|${xData[i]}-${yData[i]}|<sup>${power}</sup> )<sup>1/${power}</sup>`);
                    }
                }
                MinkowskiDistance = Math.pow(allSumXY, 1 / power);
                if (dpointToggle.checked == true) {
                    allSumXY = allSumXY.toFixed(dpNo);
                    MinkowskiDistance = MinkowskiDistance.toFixed(dpNo);
                }
                mnkresult.style.display = "inline-block";
                edresult.style.display = "none";
                mnresult.style.display = "none";
                supdresult.style.display = "none";
                csresult.style.display = "none";
                //Result
                let inp;
                let par = document.getElementById("mnk-part1");
                for (i = 0; i <= mnkresultStep1.length; i++) {
                    inp = document.createElement('span');
                    inp.setAttribute('id', `mnk-result${i}`);
                    par.appendChild(inp);

                    if (i < mnkresultStep1.length) {
                        document.getElementById(`mnk-result${i}`).innerHTML = mnkresultStep1[i];
                    }
                }
                document.getElementById(`mnk-result${mnkresultStep1.length}`).innerHTML = ` = (<b style='color:red'>${allSumXY}</b>)<sup>1/${power}</sup>`;
                document.getElementById("mnk-part2").innerHTML = `Final Result: <b style='color:green'>${MinkowskiDistance}</b>`;

            } else {
                window.alert("Enter value of power");
            }

        } else if (measureSelect == 4) { //Supremum Distance
            let xySub, allxySub = [],
                spdresultStep1 = [],
                SupremumDistance;
            for (i = 0; i < xData.length; i++) {
                xySub = Math.abs(xData[i] - yData[i]);
                if (dpointToggle.checked == true) {
                    xySub = (Math.abs(xData[i] - yData[i])).toFixed(dpNo);
                }
                allxySub[i] = xySub;
                if (i < xData.length - 1) {
                    spdresultStep1.push(`|${xData[i]}-${yData[i]}|,`);
                } else {
                    spdresultStep1.push(`|${xData[i]}-${yData[i]}| )`);
                }
            }
            SupremumDistance = Math.max(...allxySub);
            if (dpointToggle.checked == true) {
                SupremumDistance = SupremumDistance.toFixed(dpNo);
            }
            supdresult.style.display = "inline-block";
            edresult.style.display = "none";
            mnresult.style.display = "none";
            mnkresult.style.display = "none";
            csresult.style.display = "none";
            //Result
            let inp;
            let par = document.getElementById("supd-part1");
            for (i = 0; i <= spdresultStep1.length; i++) {
                inp = document.createElement('span');
                inp.setAttribute('id', `spd-result${i}`);
                par.appendChild(inp);

                if (i < spdresultStep1.length) {
                    document.getElementById(`spd-result${i}`).innerHTML = spdresultStep1[i];
                }
            }
            document.getElementById(`spd-result${spdresultStep1.length}`).innerHTML = ` = max(<b style='color:red'>${allxySub}</b>)`;
            document.getElementById("supd-part2").innerHTML = `Final Result: <b style='color:green'>${SupremumDistance}</b>`;

        } else { //Cosine Similarity
            let productXY, sumXY = 0,
                sumSqX = 0,
                SumSqY = 0,
                CosineSimilarity,
                prodxyStack = [],
                sumsqxStack = [],
                sumsqyStack = [];
            //Upper part
            for (i = 0; i < xData.length; i++) {
                productXY = xData[i] * yData[i];
                sumXY += productXY;
                if (i < xData.length - 1) {
                    prodxyStack.push(`(${xData[i]}&#215;${yData[i]})+`);
                } else {
                    prodxyStack.push(`(${xData[i]}&#215;${yData[i]})`);
                }
            }
            //Bottom part
            for (i = 0; i < xData.length; i++) {
                sumSqX += Math.pow(xData[i], 2);
                if (i < xData.length - 1) {
                    sumsqxStack.push(`${xData[i]}<sup>2</sup>+`);
                } else {
                    sumsqxStack.push(`${xData[i]}<sup>2</sup> )`);
                }
            }
            for (i = 0; i < yData.length; i++) {
                SumSqY += Math.pow(yData[i], 2);
                if (i < yData.length - 1) {
                    sumsqyStack.push(`${yData[i]}<sup>2</sup>+`);
                } else {
                    sumsqyStack.push(`${yData[i]}<sup>2</sup> )`);
                }
            }

            let sumSquareX = Math.sqrt(sumSqX);
            let sumSquareY = Math.sqrt(SumSqY);
            CosineSimilarity = (sumXY / (sumSquareX * sumSquareY)); //Final result
            if (dpointToggle.checked == true) {
                sumXY = sumXY.toFixed(dpNo);
                sumSquareX = sumSquareX.toFixed(dpNo);
                sumSquareY = sumSquareY.toFixed(dpNo);
                CosineSimilarity = CosineSimilarity.toFixed(dpNo);
            }
            csresult.style.display = "inline-block";
            edresult.style.display = "none";
            mnresult.style.display = "none";
            mnkresult.style.display = "none";
            supdresult.style.display = "none";
            //Part 1 (result)
            let input1;
            let parent1 = document.getElementById("cs-part1");
            for (i = 0; i <= prodxyStack.length; i++) {
                input1 = document.createElement('span');
                input1.setAttribute('id', `part1-span${i}`);
                parent1.appendChild(input1);

                if (i < prodxyStack.length) {
                    document.getElementById(`part1-span${i}`).innerHTML = prodxyStack[i];
                }
            }
            document.getElementById(`part1-span${prodxyStack.length}`).innerHTML = ` = <b style='color:red'>${sumXY}</b>`;
            //Part 2
            let input2;
            let parent2 = document.getElementById("cs-part2");
            for (i = 0; i <= sumsqxStack.length; i++) {
                input2 = document.createElement('span');
                input2.setAttribute('id', `part2-span${i}`);
                parent2.appendChild(input2);

                if (i < sumsqxStack.length) {
                    document.getElementById(`part2-span${i}`).innerHTML = sumsqxStack[i];
                }
            }
            document.getElementById(`part2-span${sumsqxStack.length}`).innerHTML = ` = <b style='color:red'>${sumSquareX}</b>`;
            //Part 3
            let input3;
            let parent3 = document.getElementById("cs-part3");
            for (i = 0; i <= sumsqyStack.length; i++) {
                input3 = document.createElement('span');
                input3.setAttribute('id', `part3-span${i}`);
                parent3.appendChild(input3);

                if (i < sumsqyStack.length) {
                    document.getElementById(`part3-span${i}`).innerHTML = sumsqyStack[i];
                }
            }
            document.getElementById(`part3-span${sumsqyStack.length}`).innerHTML = ` = <b style='color:red'>${sumSquareY}</b>`;
            let upperEq = `<b style='color:red'>${sumXY}</b>`;
            let bottomEq = `(<b style='color:red'>${sumSquareX}</b> &#215; <b style='color:red'>${sumSquareY}</b>)`;
            document.getElementById("cs-part4").innerHTML = `Final Result:  ${upperEq} &#247; ${bottomEq} <br>= <b style='color:green'>${CosineSimilarity}</b>`;

        }
        alert.style.display = "none";

    } else {
        document.querySelector("#distance-error").innerHTML = '<i class="fas fa-exclamation-circle"></i> Two data point must be same length';
        alert.style.display = "inline-block";
    }

}

function pInputShow() {
    let pinput = document.getElementById("p-input");
    let measureSelect = document.getElementById("measure_select").value;
    if (measureSelect == 3) {
        pinput.style.display = 'block';
    } else {
        pinput.style.display = 'none';
    }
}


// Store value before reload
window.onbeforeunload = function () {
    let numberCalData = document.querySelector("#numbers").value;
    localStorage.setItem("numberCalData", numberCalData);

    let radio_opt1 = document.getElementsByName("radio")[0];
    let radio_opt2 = document.getElementsByName("radio")[1];

    if (radio_opt1.checked) {
        localStorage.setItem("numberCalRadio", "(Population)");
    } else if (radio_opt2.checked) {
        localStorage.setItem("numberCalRadio", "(Sample)");
    } else {
        localStorage.setItem("numberCalRadio", "(Population)");
    }
}

//Reload page
window.onload = function () {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        meanCalculation();
    }
}

function reloadP() {
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
}

//data Normalization
function dataNormalization() {
    let data = document.getElementById("data").value;
    let singlevalue = Number(document.getElementById("single-inp").value);
    let normtype = document.getElementById("norm-type").value;
    let normselect = document.getElementById("norm-select").value;
    var parent = document.querySelector(".all-norm-par");
    let singlenorm = document.querySelector(".single-norm");
    let allnorm = document.querySelector(".all-norm");

    let formula1 = document.querySelector(".norm-formula1");
    let formula2 = document.querySelector(".norm-formula2");
    let formula3 = document.querySelector(".norm-formula3");

    if (data != '') {
        var allData = data.split(",").map((num) => {
            return +num;
        });
        let minValue = Math.min(...allData);
        let maxValue = Math.max(...allData);
        let count = allData.length;
        let sum = allData.reduce((a, b) => a + b);
        let mean = sum / count;
        let Std = std(allData, '(Population)');

        let normData = []; //Ans all data
        let normSingle;   //Ans single data
        let allNormResult = []; // result stack

        if (normtype == "n1") { //Min-max
            if (normselect == 1) { // All value 
                for (i = 0; i < allData.length; i++) {
                    normData[i] = ((allData[i] - minValue) / (maxValue - minValue));
                    allNormResult.push(`Data ${i+1} &#10132; ${allData[i]} &#10132; ${normData[i].toFixed(4)}`);
                }

                document.querySelector(".all-norm-title").innerHTML = 'Min-max normalization:';
                for (i = 0; i < allData.length; i++) {
                    input = document.createElement('p');
                    input.setAttribute('class', `all-norm-answer${i}`);
                    parent.appendChild(input);
                    document.querySelector(`.all-norm-answer${i}`).innerHTML = allNormResult[i];
                }
                allnorm.style.display = "block";
                singlenorm.style.display = "none";

            } else { // Single value 
                if (allData.includes(singlevalue) == true) {
                    normSingle = ((singlevalue - minValue) / (maxValue - minValue));
                    document.querySelector(".single-norm-title").innerHTML = 'Min-max normalization:';
                    document.querySelector(".show1").innerHTML = `Min value: ${minValue}`;
                    document.querySelector(".show2").innerHTML = `Max value: ${maxValue}`;
                    document.querySelector(".single-norm-ans").innerHTML = `Answer: ((${singlevalue} - ${minValue}) / (${maxValue} - ${minValue})) <br> = <b style='color:green'>${normSingle}</b>`;

                    allnorm.style.display = "none";
                    singlenorm.style.display = "block";

                } else {
                    window.alert("This value is not in the dataset");
                }
            }
            formula1.style.display = "block";
            formula2.style.display = "none";
            formula3.style.display = "none";


        } else if (normtype == "n2") { // Z-score 1
            if (normselect == 1) { // All value 
                for (i = 0; i < allData.length; i++) {
                    normData[i] = ((allData[i] - mean) / (Std));
                    allNormResult.push(`Data ${i+1} &#10132; ${allData[i]} &#10132; ${normData[i].toFixed(4)}`);
                }
                document.querySelector(".all-norm-title").innerHTML = 'Z-score normalization:';
                for (i = 0; i < allData.length; i++) {
                    input = document.createElement('p');
                    input.setAttribute('class', `all-norm-answer${i}`);
                    parent.appendChild(input);
                    document.querySelector(`.all-norm-answer${i}`).innerHTML = allNormResult[i];
                }
                allnorm.style.display = "block";
                singlenorm.style.display = "none";

            } else { // Single value 
                if (allData.includes(singlevalue) == true) {
                    normSingle = ((singlevalue - mean) / (Std));
                    document.querySelector(".single-norm-title").innerHTML = 'Z-score normalization:';
                    document.querySelector(".show1").innerHTML = `Mean (&#956;): ${mean.toFixed(3)}`;
                    document.querySelector(".show2").innerHTML = `Standard Deviation (&#963;): ${Std.toFixed(3)}`;
                    document.querySelector(".single-norm-ans").innerHTML = `Answer: ((${singlevalue} - ${mean.toFixed(3)}) / (${Std.toFixed(3)})) <br> = <b style='color:green'>${normSingle}</b>`;

                    allnorm.style.display = "none";
                    singlenorm.style.display = "block";

                } else {
                    window.alert("This value is not in the dataset");
                }
            }
            formula2.style.display = "block";
            formula1.style.display = "none";
            formula3.style.display = "none";

        } else { // // Z-score 2
            let subAbs, allSubAbs = 0,
                meanAbsDev;
            for (i = 0; i < allData.length; i++) {
                subAbs = Math.abs(allData[i] - mean);
                allSubAbs += subAbs;
            }
            meanAbsDev = (allSubAbs / allData.length);  // value of Sa

            if (normselect == 1) { // All value 
                for (i = 0; i < allData.length; i++) {
                    normData[i] = ((allData[i] - mean) / (meanAbsDev));
                    allNormResult.push(`Data ${i+1} &#10132; ${allData[i]} &#10132; ${normData[i].toFixed(4)}`);
                }

                document.querySelector(".all-norm-title").innerHTML = 'Z-score normalization (mean absolute deviation):';
                for (i = 0; i < allData.length; i++) {
                    input = document.createElement('p');
                    input.setAttribute('class', `all-norm-answer${i}`);
                    parent.appendChild(input);
                    document.querySelector(`.all-norm-answer${i}`).innerHTML = allNormResult[i];
                }
                allnorm.style.display = "block";
                singlenorm.style.display = "none";

            } else { // Single value 
                if (allData.includes(singlevalue) == true) {
                    normSingle = ((singlevalue - mean) / (meanAbsDev));
                    document.querySelector(".single-norm-title").innerHTML = 'Z-score normalization (mean absolute deviation):';
                    document.querySelector(".show1").innerHTML = `Mean (<span class="putBar">A</span>): ${mean.toFixed(3)}`;
                    document.querySelector(".show2").innerHTML = `Mean absolute deviation (S<sub>A</sub>): ${meanAbsDev.toFixed(3)}`;
                    document.querySelector(".single-norm-ans").innerHTML = `Answer: ((${singlevalue} - ${mean.toFixed(3)}) / (${meanAbsDev.toFixed(3)})) <br> = <b style='color:green'>${normSingle}</b>`;

                    allnorm.style.display = "none";
                    singlenorm.style.display = "block";

                } else {
                    window.alert("This value is not in the dataset");
                }
            }
            formula3.style.display = "block";
            formula1.style.display = "none";
            formula2.style.display = "none";

        }

    } else {
        window.alert("Please enter all field");
    }

}

function singleValShow() {
    let x = document.getElementById("single-inp");
    let normselect = document.getElementById("norm-select").value;
    if (normselect == 2) {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}