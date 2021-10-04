// Calculate GPA

let currentRow = 2,
    td_no = 6,
    stack = [1, 2];

function addCourse() {
    var empTab = document.getElementById('empTable');
    var rowCnt = empTab.rows.length; // table row count.
    var tr = empTab.insertRow(rowCnt); // the table row.
    tr = empTab.insertRow(rowCnt);

    for (var c = 0; c < 4; c++) {
        var td = document.createElement('td'); // table definition.
        td = tr.insertCell(c);
        if (c == 0) { // the first column.
            var last_ele = stack[stack.length - 1];
            var tdTag = document.getElementsByTagName('td');

            if (stack.includes(currentRow) == true) {
                tdTag[td_no].innerHTML = `Course ${last_ele+1}`;
                stack.push(last_ele + 1);
            } else {
                tdTag[td_no].innerHTML = `Course ${currentRow+1}`;
                stack.push(currentRow + 1);
            }
            td_no = td_no + 4;

        } else if (c == 3) { // the last column.
            // add a button in every new row in the first column.
            var button = document.createElement('input');
            // set input attributes.
            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Remove');
            button.setAttribute('id', 'RemoveBtn');
            // add button's 'onclick' event.
            button.setAttribute('onclick', 'removeRow(this)');
            td.appendChild(button);

        } else {
            let col;
            if (c == 1) {
                col = 'Grade';
            } else if (c == 2) {
                col = 'Credit';
            }
            // 2nd, 3rd column will have textbox.
            var ele = document.createElement('input');
            ele.setAttribute('type', 'number');
            ele.setAttribute('placeholder', `${col}`);
            ele.setAttribute('name', `${col}`);
            td.appendChild(ele);
        }
    }
    currentRow++;
}
// delete TABLE row function.
function removeRow(oButton) {
    var empTab = document.getElementById('empTable');
    empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // button -> td -> tr.
    currentRow--;
    td_no = td_no - 4;
}

function calculateCGPA() {
    var alert = document.querySelector(".alert");
    let result = document.querySelector('.cgpa-result');
    let totalCredit = 0,
        grade, credit, gc, gcSum = 0,
        cgpa, inputStatus;

    for (i = 0; i < currentRow; i++) { // Total credit
        credit = Number(document.getElementsByName("Credit")[i].value);
        totalCredit = totalCredit + credit;
    }

    for (i = 0; i < currentRow; i++) { // Grade*Credit
        grade = Number(document.getElementsByName("Grade")[i].value);
        credit = Number(document.getElementsByName("Credit")[i].value);

        if (grade != '' && credit != '') {
            gc = grade * credit;
            gcSum += gc;
        } else {
            inputStatus = 'Empty';
            break;
        }
    }

    if (inputStatus != 'Empty') {
        cgpa = gcSum / totalCredit;

        result.style.display = 'inline-block';
        alert.style.display = "none";
        document.querySelector('#course').innerHTML = `<b>${currentRow}</b>`;
        document.querySelector('#credit').innerHTML = `<b>${totalCredit}</b>`;
        document.querySelector('#cgpa').innerHTML = `<b>${cgpa.toFixed(2)}</b>`;
    } else {
        document.querySelector("#error").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all grade & credit';
        alert.style.display = "inline-block";
        result.style.display = 'none';
    }
}


// BMI
function calculateBMI1() {
    let background_Color, bmi_status;
    let alert = document.querySelector('.alert1');
    let resultSection1 = document.querySelector('.bmi1');
    let ans_bmi = document.querySelector('.ans-bmi');
    let ans = document.getElementById('ans');
    let feet = Number(document.getElementById('feet').value);
    let inch = Number(document.getElementById('inch').value);
    let pounds = Number(document.getElementById('pounds').value);

    if (feet != '' && inch != '' && pounds != '') {
        let feetToinch = feet * 12;
        let totalInch = inch + feetToinch;
        let bmi = 703 * (pounds / Math.pow(totalInch, 2));

        if (bmi < 18.5) {
            background_Color = '#FFB548';
            bmi_status = 'Under weight';
        } else if (bmi >= 18.5 && bmi <= 25) {
            background_Color = '#00A33F';
            bmi_status = 'Normal weight';
        } else if (bmi > 25 && bmi <= 30) {
            background_Color = '#F36532';
            bmi_status = 'Over weight';
        } else if (bmi > 30) {
            background_Color = '#CA1C23';
            bmi_status = 'Obese';
        }

        ans_bmi.style.backgroundColor = `${background_Color}`;
        ans.innerHTML = `Result <br> BMI: ${bmi.toFixed(2)} (${bmi_status})`;
        resultSection1.style.display = 'block';
        alert.style.display = "none";
    } else {
        alert.style.display = "inline-block";
        document.querySelector("#error1").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all field';
    }
}

function calculateBMI2() {
    let background_Color, bmi_status;
    let alert = document.querySelector('.alert2');
    let ans_bmi = document.querySelector('.ans-bmi2');
    let ans = document.getElementById('ans2');
    let resultSection2 = document.querySelector('.bmi2');
    let meter = Number(document.getElementById('meter').value);
    let kg = Number(document.getElementById('kg').value);

    if (meter != '' && kg != '') {
        let bmi = (kg / Math.pow(meter, 2));

        if (bmi < 18.5) {
            background_Color = '#FFB548';
            bmi_status = 'Under weight';
        } else if (bmi >= 18.5 && bmi <= 25) {
            background_Color = '#00A33F';
            bmi_status = 'Normal weight';
        } else if (bmi > 25 && bmi <= 30) {
            background_Color = '#F36532';
            bmi_status = 'Over weight';
        } else if (bmi > 30) {
            background_Color = '#CA1C23';
            bmi_status = 'Obese';
        }

        ans_bmi.style.backgroundColor = `${background_Color}`;
        ans.innerHTML = `Result <br> BMI: ${bmi.toFixed(2)} (${bmi_status})`;
        resultSection2.style.display = 'block';
        alert.style.display = "none";

    } else {
        alert.style.display = "inline-block";
        document.querySelector("#error2").innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter all field';
    }
}




//Unit Conversion
//Length
function swapUnitLen() {
    from_select = document.getElementById('from_select_len').value;
    to_select = document.getElementById('to_select_len').value;
    //swap
    document.getElementById('from_select_len').value = to_select;
    document.getElementById('to_select_len').value = from_select;
    lengthCalc();
}

function lengthCalc() {
    let from_inp, from_select, to_select, result = 0,
        output;
    from_inp = Number(document.getElementById('from_inp_len').value);
    from_select = document.getElementById('from_select_len').value;
    to_select = document.getElementById('to_select_len').value;
    output = document.getElementById('to_inp_len');

    if (from_select == to_select) { //same to same
        result = from_inp;
    } else if (from_select == 'Meter' && to_select == 'Kilometer') {
        result = from_inp * 0.001;
    } else if (from_select == 'Meter' && to_select == 'Centimeter') {
        result = from_inp * 100;
    } else if (from_select == 'Meter' && to_select == 'Milimeter') {
        result = from_inp * 1000;
    } else if (from_select == 'Meter' && to_select == 'Micrometer') {
        result = from_inp * 1000000;
    } else if (from_select == 'Meter' && to_select == 'Nanometer') {
        result = from_inp * 1000000000;
    } else if (from_select == 'Meter' && to_select == 'Mile') {
        result = from_inp / 1609;
    } else if (from_select == 'Meter' && to_select == 'Yard') {
        result = from_inp * 1.094;
    } else if (from_select == 'Meter' && to_select == 'Foot') {
        result = from_inp * 3.281;
    } else if (from_select == 'Meter' && to_select == 'Inch') {
        result = from_inp * 39.37;
    } else if (from_select == 'Meter' && to_select == 'Nautical mile') {
        result = from_inp / 1852;
    }

    // Kilometer to all
    if (from_select == 'Kilometer' && to_select == 'Meter') {
        result = from_inp * 1000;
    } else if (from_select == 'Kilometer' && to_select == 'Centimeter') {
        result = from_inp * 100000;
    } else if (from_select == 'Kilometer' && to_select == 'Milimeter') {
        result = from_inp * 1000000;
    } else if (from_select == 'Kilometer' && to_select == 'Micrometer') {
        result = from_inp * 1000000000;
    } else if (from_select == 'Kilometer' && to_select == 'Nanometer') {
        result = from_inp * 1000000000000;
    } else if (from_select == 'Kilometer' && to_select == 'Mile') {
        result = from_inp / 1.609;
    } else if (from_select == 'Kilometer' && to_select == 'Yard') {
        result = from_inp * 1094;
    } else if (from_select == 'Kilometer' && to_select == 'Foot') {
        result = from_inp * 3281;
    } else if (from_select == 'Kilometer' && to_select == 'Inch') {
        result = from_inp * 39370;
    } else if (from_select == 'Kilometer' && to_select == 'Nautical mile') {
        result = from_inp / 1.852;
    }

    // Centimeter to all
    if (from_select == 'Centimeter' && to_select == 'Meter') {
        result = from_inp * 0.01;
    } else if (from_select == 'Centimeter' && to_select == 'Kilometer') {
        result = from_inp * 0.00001;
    } else if (from_select == 'Centimeter' && to_select == 'Milimeter') {
        result = from_inp * 10;
    } else if (from_select == 'Centimeter' && to_select == 'Micrometer') {
        result = from_inp * 10000;
    } else if (from_select == 'Centimeter' && to_select == 'Nanometer') {
        result = from_inp * 10000000;
    } else if (from_select == 'Centimeter' && to_select == 'Mile') {
        result = from_inp / 160934;
    } else if (from_select == 'Centimeter' && to_select == 'Yard') {
        result = from_inp / 91.44;
    } else if (from_select == 'Centimeter' && to_select == 'Foot') {
        result = from_inp / 30.48;
    } else if (from_select == 'Centimeter' && to_select == 'Inch') {
        result = from_inp / 2.54;
    } else if (from_select == 'Centimeter' && to_select == 'Nautical mile') {
        result = from_inp / 185200;
    }


    // Milimeter to all
    if (from_select == 'Milimeter' && to_select == 'Meter') {
        result = from_inp * 0.001;
    } else if (from_select == 'Milimeter' && to_select == 'Kilometer') {
        result = from_inp * 0.000001;
    } else if (from_select == 'Milimeter' && to_select == 'Centimeter') {
        result = from_inp * 0.1;
    } else if (from_select == 'Milimeter' && to_select == 'Micrometer') {
        result = from_inp * 1000;
    } else if (from_select == 'Milimeter' && to_select == 'Nanometer') {
        result = from_inp * 1000000;
    } else if (from_select == 'Milimeter' && to_select == 'Mile') {
        result = from_inp / 1.609e+6;
    } else if (from_select == 'Milimeter' && to_select == 'Yard') {
        result = from_inp / 914;
    } else if (from_select == 'Milimeter' && to_select == 'Foot') {
        result = from_inp / 305;
    } else if (from_select == 'Milimeter' && to_select == 'Inch') {
        result = from_inp / 25.4;
    } else if (from_select == 'Milimeter' && to_select == 'Nautical mile') {
        result = from_inp / 1.852e+6;
    }

    // Micrometer to all
    if (from_select == 'Micrometer' && to_select == 'Meter') {
        result = from_inp / 1e+6;
    } else if (from_select == 'Micrometer' && to_select == 'Kilometer') {
        result = from_inp / 1e+9;
    } else if (from_select == 'Micrometer' && to_select == 'Centimeter') {
        result = from_inp / 10000;
    } else if (from_select == 'Micrometer' && to_select == 'Milimeter') {
        result = from_inp / 1000;
    } else if (from_select == 'Micrometer' && to_select == 'Nanometer') {
        result = from_inp * 1000;
    } else if (from_select == 'Micrometer' && to_select == 'Mile') {
        result = from_inp / 1.609e+9;
    } else if (from_select == 'Micrometer' && to_select == 'Yard') {
        result = from_inp / 914400;
    } else if (from_select == 'Micrometer' && to_select == 'Foot') {
        result = from_inp / 304800;
    } else if (from_select == 'Micrometer' && to_select == 'Inch') {
        result = from_inp / 25400;
    } else if (from_select == 'Micrometer' && to_select == 'Nautical mile') {
        result = from_inp / 1.852e+9;
    }

    // Nanometer to all
    if (from_select == 'Nanometer' && to_select == 'Meter') {
        result = from_inp / 1e+9;
    } else if (from_select == 'Nanometer' && to_select == 'Kilometer') {
        result = from_inp / 1e+12;
    } else if (from_select == 'Nanometer' && to_select == 'Centimeter') {
        result = from_inp / 1e+7;
    } else if (from_select == 'Nanometer' && to_select == 'Milimeter') {
        result = from_inp / 1e+6;
    } else if (from_select == 'Nanometer' && to_select == 'Micrometer') {
        result = from_inp / 1000;
    } else if (from_select == 'Nanometer' && to_select == 'Mile') {
        result = from_inp / 1.609e+12;
    } else if (from_select == 'Nanometer' && to_select == 'Yard') {
        result = from_inp / 9.144e+8;
    } else if (from_select == 'Nanometer' && to_select == 'Foot') {
        result = from_inp / 3.048e+8;
    } else if (from_select == 'Nanometer' && to_select == 'Inch') {
        result = from_inp / 2.54e+7;
    } else if (from_select == 'Nanometer' && to_select == 'Nautical mile') {
        result = from_inp / 1.852e+12;
    }

    // Mile to all
    if (from_select == 'Mile' && to_select == 'Meter') {
        result = from_inp * 1609.35;
    } else if (from_select == 'Mile' && to_select == 'Kilometer') {
        result = from_inp * 1.609;
    } else if (from_select == 'Mile' && to_select == 'Centimeter') {
        result = from_inp * 160934;
    } else if (from_select == 'Mile' && to_select == 'Milimeter') {
        result = from_inp * 1.609e+6;
    } else if (from_select == 'Mile' && to_select == 'Micrometer') {
        result = from_inp * 1.609e+9;
    } else if (from_select == 'Mile' && to_select == 'Nanometer') {
        result = from_inp * 1.609e+12;
    } else if (from_select == 'Mile' && to_select == 'Yard') {
        result = from_inp * 1760;
    } else if (from_select == 'Mile' && to_select == 'Foot') {
        result = from_inp * 5280;
    } else if (from_select == 'Mile' && to_select == 'Inch') {
        result = from_inp * 63360;
    } else if (from_select == 'Mile' && to_select == 'Nautical mile') {
        result = from_inp / 1.151;
    }

    // Yard to all
    if (from_select == 'Yard' && to_select == 'Meter') {
        result = from_inp / 1.094;
    } else if (from_select == 'Yard' && to_select == 'Kilometer') {
        result = from_inp / 1094;
    } else if (from_select == 'Yard' && to_select == 'Centimeter') {
        result = from_inp * 91.44;
    } else if (from_select == 'Yard' && to_select == 'Milimeter') {
        result = from_inp * 914.4;
    } else if (from_select == 'Yard' && to_select == 'Micrometer') {
        result = from_inp * 914400;
    } else if (from_select == 'Yard' && to_select == 'Nanometer') {
        result = from_inp * 9.144e+8;
    } else if (from_select == 'Yard' && to_select == 'Mile') {
        result = from_inp / 1760;
    } else if (from_select == 'Yard' && to_select == 'Foot') {
        result = from_inp * 3;
    } else if (from_select == 'Yard' && to_select == 'Inch') {
        result = from_inp * 36;
    } else if (from_select == 'Yard' && to_select == 'Nautical mile') {
        result = from_inp / 2025;
    }

    // Foot to all
    if (from_select == 'Foot' && to_select == 'Meter') {
        result = from_inp / 3.281;
    } else if (from_select == 'Foot' && to_select == 'Kilometer') {
        result = from_inp / 3281;
    } else if (from_select == 'Foot' && to_select == 'Centimeter') {
        result = from_inp * 30.48;
    } else if (from_select == 'Foot' && to_select == 'Milimeter') {
        result = from_inp * 304.8;
    } else if (from_select == 'Foot' && to_select == 'Micrometer') {
        result = from_inp * 304800;
    } else if (from_select == 'Foot' && to_select == 'Nanometer') {
        result = from_inp * 3.048e+8;
    } else if (from_select == 'Foot' && to_select == 'Mile') {
        result = from_inp / 5280;
    } else if (from_select == 'Foot' && to_select == 'Yard') {
        result = from_inp / 3;
    } else if (from_select == 'Foot' && to_select == 'Inch') {
        result = from_inp * 12;
    } else if (from_select == 'Foot' && to_select == 'Nautical mile') {
        result = from_inp / 6076;
    }

    // Inch to all
    if (from_select == 'Inch' && to_select == 'Meter') {
        result = from_inp / 39.37;
    } else if (from_select == 'Inch' && to_select == 'Kilometer') {
        result = from_inp / 39370;
    } else if (from_select == 'Inch' && to_select == 'Centimeter') {
        result = from_inp * 2.54;
    } else if (from_select == 'Inch' && to_select == 'Milimeter') {
        result = from_inp * 25.4;
    } else if (from_select == 'Inch' && to_select == 'Micrometer') {
        result = from_inp * 25400;
    } else if (from_select == 'Inch' && to_select == 'Nanometer') {
        result = from_inp * 2.54e+7;
    } else if (from_select == 'Inch' && to_select == 'Mile') {
        result = from_inp / 63360;
    } else if (from_select == 'Inch' && to_select == 'Yard') {
        result = from_inp / 36;
    } else if (from_select == 'Inch' && to_select == 'Foot') {
        result = from_inp / 12;
    } else if (from_select == 'Inch' && to_select == 'Nautical mile') {
        result = from_inp / 72913;
    }

    // Nautical mile to all
    if (from_select == 'Nautical mile' && to_select == 'Meter') {
        result = from_inp * 1852;
    } else if (from_select == 'Nautical mile' && to_select == 'Kilometer') {
        result = from_inp * 1.852;
    } else if (from_select == 'Nautical mile' && to_select == 'Centimeter') {
        result = from_inp * 185200;
    } else if (from_select == 'Nautical mile' && to_select == 'Milimeter') {
        result = from_inp * 1.852e+6;
    } else if (from_select == 'Nautical mile' && to_select == 'Micrometer') {
        result = from_inp * 1.852e+9;
    } else if (from_select == 'Nautical mile' && to_select == 'Nanometer') {
        result = from_inp * 1.852e+12;
    } else if (from_select == 'Nautical mile' && to_select == 'Mile') {
        result = from_inp * 1.151;
    } else if (from_select == 'Nautical mile' && to_select == 'Yard') {
        result = from_inp * 2025.37;
    } else if (from_select == 'Nautical mile' && to_select == 'Foot') {
        result = from_inp * 6076.12;
    } else if (from_select == 'Nautical mile' && to_select == 'Inch') {
        result = from_inp * 72913.4;
    }

    output.value = result.toFixed(4);
    output.style.backgroundColor = 'rgba(0, 128, 0, 0.226)';
    document.querySelector('#result-len').innerHTML = `<b style='color:red'>Result</b>: ${from_inp} ${from_select} = <b>${result}</b> ${to_select}`;
}

//Temperature
function swapUnitTemp() {
    from_select = document.getElementById('from_select_temp').value;
    to_select = document.getElementById('to_select_temp').value;
    //swap
    document.getElementById('from_select_temp').value = to_select;
    document.getElementById('to_select_temp').value = from_select;
    temperatureCalc();
}

function temperatureCalc() {
    let from_inp, from_select, to_select, result = 0,
        output;
    from_inp = Number(document.getElementById('from_inp_temp').value);
    from_select = document.getElementById('from_select_temp').value;
    to_select = document.getElementById('to_select_temp').value;
    output = document.getElementById('to_inp_temp');


    if (from_select == to_select) { //same to same
        result = from_inp;
    } else if (from_select == 'Fahrenheit' && to_select == 'Celsius') {
        result = (from_inp - 32) * 5 / 9;
    } else if (from_select == 'Fahrenheit' && to_select == 'Kelvin') {
        result = ((from_inp - 32) * 5 / 9) + 273.15;
    }

    //Celsius to all
    else if (from_select == 'Celsius' && to_select == 'Fahrenheit') {
        result = (from_inp * 9 / 5) + 32;
    } else if (from_select == 'Celsius' && to_select == 'Kelvin') {
        result = from_inp + 273.15;
    }

    //Kelvin to all
    else if (from_select == 'Kelvin' && to_select == 'Fahrenheit') {
        result = ((from_inp - 273.15) * 9 / 5) + 32;
    } else if (from_select == 'Kelvin' && to_select == 'Celsius') {
        result = from_inp - 273.15;
    }

    output.value = result.toFixed(2);
    output.style.backgroundColor = 'rgba(0, 128, 0, 0.226)';
    document.querySelector('#result-temp').innerHTML = `<b style='color:red'>Result</b>: ${from_inp} &#176${from_select} = <b>${result.toFixed(2)}</b> &#176${to_select}`;

}

// Area
function swapUnitArea() {
    from_select = document.getElementById('from_select_area').value;
    to_select = document.getElementById('to_select_area').value;
    //swap
    document.getElementById('from_select_area').value = to_select;
    document.getElementById('to_select_area').value = from_select;
    areaCalc();

}

function areaCalc() {
    let from_inp, from_select, to_select, result = 0,
        output;
    from_inp = Number(document.getElementById('from_inp_area').value);
    from_select = document.getElementById('from_select_area').value;
    to_select = document.getElementById('to_select_area').value;
    output = document.getElementById('to_inp_area');

    if (from_select == to_select) { //same to same
        result = from_inp;
    } else if (from_select == 'Square Meter' && to_select == 'Square Kilometer') {
        result = from_inp / 1e+6;
    } else if (from_select == 'Square Meter' && to_select == 'Square Mile') {
        result = from_inp / 2.59e+6;
    } else if (from_select == 'Square Meter' && to_select == 'Square Yard') {
        result = from_inp * 1.196;
    } else if (from_select == 'Square Meter' && to_select == 'Square Foot') {
        result = from_inp * 10.764;
    } else if (from_select == 'Square Meter' && to_select == 'Square Inch') {
        result = from_inp * 1550;
    } else if (from_select == 'Square Meter' && to_select == 'Hectare') {
        result = from_inp / 10000;
    } else if (from_select == 'Square Meter' && to_select == 'Acre') {
        result = from_inp / 4047;
    }

    // Square Kilometer to all
    if (from_select == 'Square Kilometer' && to_select == 'Square Meter') {
        result = from_inp / 1e+6;
    } else if (from_select == 'Square Kilometer' && to_select == 'Square Mile') {
        result = from_inp / 2.59e+6;
    } else if (from_select == 'Square Kilometer' && to_select == 'Square Yard') {
        result = from_inp * 1.196;
    } else if (from_select == 'Square Kilometer' && to_select == 'Square Foot') {
        result = from_inp * 10.764;
    } else if (from_select == 'Square Kilometer' && to_select == 'Square Inch') {
        result = from_inp * 1550;
    } else if (from_select == 'Square Kilometer' && to_select == 'Hectare') {
        result = from_inp / 10000;
    } else if (from_select == 'Square Kilometer' && to_select == 'Acre') {
        result = from_inp / 4047;
    }

    // Square Mile to all
    if (from_select == 'Square Mile' && to_select == 'Square Meter') {
        result = from_inp * 2.59e+6;
    } else if (from_select == 'Square Mile' && to_select == 'Square Kilometer') {
        result = from_inp * 2.59;
    } else if (from_select == 'Square Mile' && to_select == 'Square Yard') {
        result = from_inp * 3.098e+6;
    } else if (from_select == 'Square Mile' && to_select == 'Square Foot') {
        result = from_inp * 2.788e+7;
    } else if (from_select == 'Square Mile' && to_select == 'Square Inch') {
        result = from_inp * 4.014e+9;
    } else if (from_select == 'Square Mile' && to_select == 'Hectare') {
        result = from_inp * 259;
    } else if (from_select == 'Square Mile' && to_select == 'Acre') {
        result = from_inp * 640;
    }

    // Square Yard to all
    if (from_select == 'Square Yard' && to_select == 'Square Meter') {
        result = from_inp / 1.196;
    } else if (from_select == 'Square Yard' && to_select == 'Square Kilometer') {
        result = from_inp / 1.196e+6;
    } else if (from_select == 'Square Yard' && to_select == 'Square Mile') {
        result = from_inp / 3.098e+6;
    } else if (from_select == 'Square Yard' && to_select == 'Square Foot') {
        result = from_inp * 9;
    } else if (from_select == 'Square Yard' && to_select == 'Square Inch') {
        result = from_inp * 1296;
    } else if (from_select == 'Square Yard' && to_select == 'Hectare') {
        result = from_inp / 11960;
    } else if (from_select == 'Square Yard' && to_select == 'Acre') {
        result = from_inp / 4840;
    }

    // Square Foot to all
    if (from_select == 'Square Foot' && to_select == 'Square Meter') {
        result = from_inp / 10.764;
    } else if (from_select == 'Square Foot' && to_select == 'Square Kilometer') {
        result = from_inp / 1.076e+7;
    } else if (from_select == 'Square Foot' && to_select == 'Square Mile') {
        result = from_inp / 2.788e+7;
    } else if (from_select == 'Square Foot' && to_select == 'Square Yard') {
        result = from_inp / 9;
    } else if (from_select == 'Square Foot' && to_select == 'Square Inch') {
        result = from_inp * 144;
    } else if (from_select == 'Square Foot' && to_select == 'Hectare') {
        result = from_inp / 107639;
    } else if (from_select == 'Square Foot' && to_select == 'Acre') {
        result = from_inp / 43560;
    }

    // Square Inch to all
    if (from_select == 'Square Inch' && to_select == 'Square Meter') {
        result = from_inp / 1550;
    } else if (from_select == 'Square Inch' && to_select == 'Square Kilometer') {
        result = from_inp / 1.55e+9;
    } else if (from_select == 'Square Inch' && to_select == 'Square Mile') {
        result = from_inp / 4.014e+9;
    } else if (from_select == 'Square Inch' && to_select == 'Square Yard') {
        result = from_inp / 1296;
    } else if (from_select == 'Square Inch' && to_select == 'Square Foot') {
        result = from_inp / 144;
    } else if (from_select == 'Square Inch' && to_select == 'Hectare') {
        result = from_inp / 1.55e+7;
    } else if (from_select == 'Square Inch' && to_select == 'Acre') {
        result = from_inp / 6.273e+6;
    }

    // Hectare to all
    if (from_select == 'Hectare' && to_select == 'Square Meter') {
        result = from_inp * 10000;
    } else if (from_select == 'Hectare' && to_select == 'Square Kilometer') {
        result = from_inp / 100;
    } else if (from_select == 'Hectare' && to_select == 'Square Mile') {
        result = from_inp / 259;
    } else if (from_select == 'Hectare' && to_select == 'Square Yard') {
        result = from_inp * 11960;
    } else if (from_select == 'Hectare' && to_select == 'Square Foot') {
        result = from_inp * 107639;
    } else if (from_select == 'Hectare' && to_select == 'Square Inch') {
        result = from_inp * 1.55e+7;
    } else if (from_select == 'Hectare' && to_select == 'Acre') {
        result = from_inp * 2.471;
    }

    // Acre to all
    if (from_select == 'Acre' && to_select == 'Square Meter') {
        result = from_inp * 4047;
    } else if (from_select == 'Acre' && to_select == 'Square Kilometer') {
        result = from_inp / 247;
    } else if (from_select == 'Acre' && to_select == 'Square Mile') {
        result = from_inp / 640;
    } else if (from_select == 'Acre' && to_select == 'Square Yard') {
        result = from_inp * 4840;
    } else if (from_select == 'Acre' && to_select == 'Square Foot') {
        result = from_inp * 43560;
    } else if (from_select == 'Acre' && to_select == 'Square Inch') {
        result = from_inp * 6.273e+6;
    } else if (from_select == 'Acre' && to_select == 'Hectare') {
        result = from_inp / 2.471;
    }

    output.value = result.toFixed(4);
    output.style.backgroundColor = 'rgba(0, 128, 0, 0.226)';
    document.querySelector('#result-area').innerHTML = `<b style='color:red'>Result</b>: ${from_inp} ${from_select} = <b>${result}</b> ${to_select}`;

}

// Volume
function swapUnitVol() {
    from_select = document.getElementById('from_select_vol').value;
    to_select = document.getElementById('to_select_vol').value;
    //swap
    document.getElementById('from_select_vol').value = to_select;
    document.getElementById('to_select_vol').value = from_select;
    volumeCalc();
}

function volumeCalc() {
    let from_inp, from_select, to_select, result = 0,
        output;
    from_inp = Number(document.getElementById('from_inp_vol').value);
    from_select = document.getElementById('from_select_vol').value;
    to_select = document.getElementById('to_select_vol').value;
    output = document.getElementById('to_inp_vol');

    if (from_select == to_select) { //same to same
        result = from_inp;
    } else if (from_select == 'Liter' && to_select == 'Mililiter') {
        result = from_inp * 1000;
    } else if (from_select == 'Liter' && to_select == 'US Gallon') {
        result = from_inp / 3.785;
    } else if (from_select == 'Liter' && to_select == 'Imperial Gallon') {
        result = from_inp / 4.546;
    } else if (from_select == 'Liter' && to_select == 'Cubic Foot') {
        result = from_inp / 28.317;
    } else if (from_select == 'Liter' && to_select == 'Cubic Inch') {
        result = from_inp * 61.024;
    }

    // Mililiter to all
    if (from_select == 'Mililiter' && to_select == 'Liter') {
        result = from_inp / 1000;
    } else if (from_select == 'Mililiter' && to_select == 'US Gallon') {
        result = from_inp / 3785;
    } else if (from_select == 'Mililiter' && to_select == 'Imperial Gallon') {
        result = from_inp / 4546;
    } else if (from_select == 'Mililiter' && to_select == 'Cubic Foot') {
        result = from_inp / 28317;
    } else if (from_select == 'Mililiter' && to_select == 'Cubic Inch') {
        result = from_inp / 16.387;
    }

    // US Gallon to all
    if (from_select == 'US Gallon' && to_select == 'Liter') {
        result = from_inp * 3.785;
    } else if (from_select == 'US Gallon' && to_select == 'Mililiter') {
        result = from_inp * 3785.41;
    } else if (from_select == 'US Gallon' && to_select == 'Imperial Gallon') {
        result = from_inp / 1.201;
    } else if (from_select == 'US Gallon' && to_select == 'Cubic Foot') {
        result = from_inp / 7.481;
    } else if (from_select == 'US Gallon' && to_select == 'Cubic Inch') {
        result = from_inp * 231;
    }

    // Imperial Gallon to all
    if (from_select == 'Imperial Gallon' && to_select == 'Liter') {
        result = from_inp * 4.546;
    } else if (from_select == 'Imperial Gallon' && to_select == 'Mililiter') {
        result = from_inp * 4546;
    } else if (from_select == 'Imperial Gallon' && to_select == 'US Gallon') {
        result = from_inp * 1.201;
    } else if (from_select == 'Imperial Gallon' && to_select == 'Cubic Foot') {
        result = from_inp / 6.229;
    } else if (from_select == 'Imperial Gallon' && to_select == 'Cubic Inch') {
        result = from_inp * 277.42;
    }

    // Cubic Foot to all
    if (from_select == 'Cubic Foot' && to_select == 'Liter') {
        result = from_inp * 28.317;
    } else if (from_select == 'Cubic Foot' && to_select == 'Mililiter') {
        result = from_inp * 28317;
    } else if (from_select == 'Cubic Foot' && to_select == 'US Gallon') {
        result = from_inp * 7.481;
    } else if (from_select == 'Cubic Foot' && to_select == 'Imperial Gallon') {
        result = from_inp * 6.229;
    } else if (from_select == 'Cubic Foot' && to_select == 'Cubic Inch') {
        result = from_inp * 1728;
    }

    // Cubic Inch to all
    if (from_select == 'Cubic Inch' && to_select == 'Liter') {
        result = from_inp / 61.024;
    } else if (from_select == 'Cubic Inch' && to_select == 'Mililiter') {
        result = from_inp * 16.387;
    } else if (from_select == 'Cubic Inch' && to_select == 'US Gallon') {
        result = from_inp / 231;
    } else if (from_select == 'Cubic Inch' && to_select == 'Imperial Gallon') {
        result = from_inp / 277;
    } else if (from_select == 'Cubic Inch' && to_select == 'Cubic Foot') {
        result = from_inp / 1728;
    }

    output.value = result.toFixed(4);
    output.style.backgroundColor = 'rgba(0, 128, 0, 0.226)';
    document.querySelector('#result-vol').innerHTML = `<b style='color:red'>Result</b>: ${from_inp} ${from_select} = <b>${result}</b> ${to_select}`;

}

// Weight
function swapUnitWet() {
    from_select = document.getElementById('from_select_wet').value;
    to_select = document.getElementById('to_select_wet').value;
    //swap
    document.getElementById('from_select_wet').value = to_select;
    document.getElementById('to_select_wet').value = from_select;
    weightCalc();
}

function weightCalc() {
    let from_inp, from_select, to_select, result = 0,
        output;
    from_inp = Number(document.getElementById('from_inp_wet').value);
    from_select = document.getElementById('from_select_wet').value;
    to_select = document.getElementById('to_select_wet').value;
    output = document.getElementById('to_inp_wet');

    if (from_select == to_select) { //same to same
        result = from_inp;
    } else if (from_select == 'Gram' && to_select == 'Kilogram') {
        result = from_inp / 1000;
    } else if (from_select == 'Gram' && to_select == 'Miligram') {
        result = from_inp * 1000;
    } else if (from_select == 'Gram' && to_select == 'Microgram') {
        result = from_inp * 1e+6;
    } else if (from_select == 'Gram' && to_select == 'Metric Ton') {
        result = from_inp / 1e+6;
    } else if (from_select == 'Gram' && to_select == 'Pound') {
        result = from_inp / 454;
    } else if (from_select == 'Gram' && to_select == 'Ounce') {
        result = from_inp / 28.35;
    }

    //Kilogram to all
    if (from_select == 'Kilogram' && to_select == 'Gram') {
        result = from_inp * 1000;
    } else if (from_select == 'Kilogram' && to_select == 'Miligram') {
        result = from_inp * 1e+6;
    } else if (from_select == 'Kilogram' && to_select == 'Microgram') {
        result = from_inp * 1e+9;
    } else if (from_select == 'Kilogram' && to_select == 'Metric Ton') {
        result = from_inp / 1000;
    } else if (from_select == 'Kilogram' && to_select == 'Pound') {
        result = from_inp * 2.205;
    } else if (from_select == 'Kilogram' && to_select == 'Ounce') {
        result = from_inp * 35.274;
    }

    //Miligram to all
    if (from_select == 'Miligram' && to_select == 'Gram') {
        result = from_inp / 1000;
    } else if (from_select == 'Miligram' && to_select == 'Kilogram') {
        result = from_inp / 1e+6;
    } else if (from_select == 'Miligram' && to_select == 'Microgram') {
        result = from_inp * 1000;
    } else if (from_select == 'Miligram' && to_select == 'Metric Ton') {
        result = from_inp / 1e+9;
    } else if (from_select == 'Miligram' && to_select == 'Pound') {
        result = from_inp / 453592;
    } else if (from_select == 'Miligram' && to_select == 'Ounce') {
        result = from_inp / 28350;
    }

    //Microgram to all
    if (from_select == 'Microgram' && to_select == 'Gram') {
        result = from_inp / 1e+6;
    } else if (from_select == 'Microgram' && to_select == 'Kilogram') {
        result = from_inp / 1e+9;
    } else if (from_select == 'Microgram' && to_select == 'Miligram') {
        result = from_inp / 1000;
    } else if (from_select == 'Microgram' && to_select == 'Metric Ton') {
        result = from_inp / 1e+12;
    } else if (from_select == 'Microgram' && to_select == 'Pound') {
        result = from_inp / 4.536e+8;
    } else if (from_select == 'Microgram' && to_select == 'Ounce') {
        result = from_inp / 2.835e+7;
    }

    //Metric Ton to all
    if (from_select == 'Metric Ton' && to_select == 'Gram') {
        result = from_inp * 1e+6;
    } else if (from_select == 'Metric Ton' && to_select == 'Kilogram') {
        result = from_inp * 1000;
    } else if (from_select == 'Metric Ton' && to_select == 'Miligram') {
        result = from_inp * 1e+9;
    } else if (from_select == 'Metric Ton' && to_select == 'Microgram') {
        result = from_inp * 1e+12;
    } else if (from_select == 'Metric Ton' && to_select == 'Pound') {
        result = from_inp * 2205;
    } else if (from_select == 'Metric Ton' && to_select == 'Ounce') {
        result = from_inp * 35274;
    }

    //Pound to all
    if (from_select == 'Pound' && to_select == 'Gram') {
        result = from_inp * 454;
    } else if (from_select == 'Pound' && to_select == 'Kilogram') {
        result = from_inp / 2.205;
    } else if (from_select == 'Pound' && to_select == 'Miligram') {
        result = from_inp * 453592;
    } else if (from_select == 'Pound' && to_select == 'Microgram') {
        result = from_inp * 4.536e+8;
    } else if (from_select == 'Pound' && to_select == 'Metric Ton') {
        result = from_inp / 2205;
    } else if (from_select == 'Pound' && to_select == 'Ounce') {
        result = from_inp * 16;
    }

    //Ounce to all
    if (from_select == 'Ounce' && to_select == 'Gram') {
        result = from_inp * 28.35;
    } else if (from_select == 'Ounce' && to_select == 'Kilogram') {
        result = from_inp / 35.274;
    } else if (from_select == 'Ounce' && to_select == 'Miligram') {
        result = from_inp * 28350;
    } else if (from_select == 'Ounce' && to_select == 'Microgram') {
        result = from_inp * 2.835e+7;
    } else if (from_select == 'Ounce' && to_select == 'Metric Ton') {
        result = from_inp / 35274;
    } else if (from_select == 'Ounce' && to_select == 'Pound') {
        result = from_inp / 16;
    }

    output.value = result.toFixed(4);
    output.style.backgroundColor = 'rgba(0, 128, 0, 0.226)';
    document.querySelector('#result-wet').innerHTML = `<b style='color:red'>Result</b>: ${from_inp} ${from_select} = <b>${result}</b> ${to_select}`;

}