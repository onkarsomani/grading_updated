// import { reco } from './utils.js';

document.addEventListener("DOMContentLoaded", function () {

    // fetcheing everything from the local storage do search for the given id on the other page to know what it relates to

    var positionDisp = document.getElementById("input11");
    positionDisp.textContent = ` ${localStorage.getItem("input1")}`;

    positionDisp = document.getElementById("input22");
    positionDisp.textContent = ` ${localStorage.getItem("input2")}`;
    var coursecode = localStorage.getItem("input2");

    positionDisp = document.getElementById("input33");
    positionDisp.textContent = ` ${localStorage.getItem("input3")}`;

    const maxMarks = localStorage.getItem("courseTotal");

    const finalcut = parseInt(localStorage.getItem("finalcut"));
    console.log(finalcut);


    const totalMarksArray = JSON.parse(localStorage.getItem("totalMarksArray"));

    const totalMarksArrayString = localStorage.getItem("totalMarksArray");
    const totalMarksArr = totalMarksArrayString ? JSON.parse(totalMarksArrayString) : [];

    const records = JSON.parse(localStorage.getItem("records"));

    const headerRow = records[0];


    const totalMarksIndex = headerRow.indexOf('Total_Marks');

    if (!totalMarksArray || !totalMarksArray.length) {
        console.error("Total marks data not found in local storage.");
        return;
    }

    // Calculate histogram data
    const binWidth = 1; // Adjust as needed
    const minMarks = 0;

    const totalMarksRange = maxMarks - minMarks + 1;
    const binCount = Math.ceil(totalMarksRange / binWidth);
    const bins = Array.from({ length: binCount }, (_, i) => minMarks + i * binWidth);
    const histogramData = Array(binCount).fill(0);


    const maxobtmarks = Math.max(...totalMarksArray);

    let output = [];
    output.push(Math.round(0.3 * maxobtmarks));
    output.push(Math.round(0.4 * maxobtmarks));
    output.push(Math.round(0.5 * maxobtmarks));
    output.push(Math.round(0.6 * maxobtmarks));
    output.push(Math.round(0.7 * maxobtmarks));
    output.push(Math.round(0.8 * maxobtmarks));
    output.push(Math.round(0.9 * maxobtmarks));

    // overwrite with recommended gradidng logic 
    // check utils.js for the same

    output = calculateGrades(totalMarksArr, parseInt(maxMarks));


    totalMarksArray.forEach((mark) => {
        const binIndex = Math.floor((mark - minMarks) / binWidth);
        histogramData[binIndex]++;
    });

    // placing the sliders initially
    const backgroundColors = Array(binCount).fill(0);

    var myElement = document.getElementById('A');

    myElement.style.left = (output[6] * 100 + 10) / maxMarks + '%';


    myElement = document.getElementById('A-');

    myElement.style.left = (output[5] * 100 + 10) / maxMarks + '%';


    myElement = document.getElementById('B');

    myElement.style.left = (output[4] * 100 + 10) / maxMarks + '%';


    myElement = document.getElementById('B-');

    myElement.style.left = (output[3] * 100 + 10) / maxMarks + '%';

    myElement = document.getElementById('C');

    myElement.style.left = (output[2] * 100 + 10) / maxMarks + '%';

    myElement = document.getElementById('C-');

    myElement.style.left = (output[1] * 100 + 10) / maxMarks + '%';

    myElement = document.getElementById('D');

    myElement.style.left = (output[0] * 100 + 10) / maxMarks + '%';

    myElement = document.getElementById('E');

    myElement.style.left = (0 + 10) / maxMarks + '%';


    // calculating initial statistics
    var summmmm = 0;

    var threshold = parseInt(output[6]);

    var studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);

    var numberOfStudentsAboveThreshold = studentsAboveThreshold.length;

    summmmm += numberOfStudentsAboveThreshold * 10;


    var positionDisplay = document.getElementById("acnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;
    var tempo = numberOfStudentsAboveThreshold;

    positionDisplay = document.getElementById("acut");
    positionDisplay.textContent = ` ${threshold}`;

    threshold = parseInt(output[5]);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);

    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 9;


    positionDisplay = document.getElementById("a-cnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

    tempo += numberOfStudentsAboveThreshold;

    positionDisplay = document.getElementById("a-cut");
    positionDisplay.textContent = ` ${threshold}`;


    threshold = parseInt(output[4]);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 8;


    positionDisplay = document.getElementById("bcnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

    tempo += numberOfStudentsAboveThreshold;

    positionDisplay = document.getElementById("bcut");
    positionDisplay.textContent = ` ${threshold}`;



    threshold = parseInt(output[3]);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 7;


    positionDisplay = document.getElementById("b-cnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

    tempo += numberOfStudentsAboveThreshold;

    positionDisplay = document.getElementById("b-cut");
    positionDisplay.textContent = ` ${threshold}`;



    threshold = parseInt(output[2]);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 6;


    positionDisplay = document.getElementById("ccnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

    tempo += numberOfStudentsAboveThreshold;

    positionDisplay = document.getElementById("ccut");
    positionDisplay.textContent = ` ${threshold}`;



    threshold = parseInt(output[1]);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 5;


    positionDisplay = document.getElementById("c-cnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

    tempo += numberOfStudentsAboveThreshold;


    positionDisplay = document.getElementById("c-cut");
    positionDisplay.textContent = ` ${threshold}`;


    threshold = parseInt(output[0]);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 4;


    positionDisplay = document.getElementById("dcnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

    tempo += numberOfStudentsAboveThreshold;


    positionDisplay = document.getElementById("dcut");
    positionDisplay.textContent = ` ${threshold}`;


    threshold = parseInt(0);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 2;


    positionDisplay = document.getElementById("ecnt");
    positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

    tempo += numberOfStudentsAboveThreshold;

    positionDisplay = document.getElementById("ecut");
    positionDisplay.textContent = ` ${threshold}`;




    threshold = parseInt(0 * maxobtmarks);
    studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


    numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;

    summmmm += numberOfStudentsAboveThreshold * 0;

    tempo += numberOfStudentsAboveThreshold;

    var sumlessthannclim = 0;

    for (let i = 0; i < totalMarksArray.length; i++) {
        if (totalMarksArray[i] < 0.2 * maxobtmarks) {
            sumlessthannclim += totalMarksArray[i];
        }
    }


    var sum = totalMarksArray.reduce((acc, currentValue) => acc + currentValue, 0);

    // Calculate the average
    var average = (sum - sumlessthannclim) / (totalMarksArray.length - numberOfStudentsAboveThreshold);



    positionDisplay = document.getElementById("avg");
    positionDisplay.textContent = ` ${average.toFixed(2)}`;

    positionDisplay = document.getElementById("mgppp");
    positionDisplay.textContent = ` ${(summmmm / totalMarksArray.length).toFixed(2)}`;

    positionDisplay = document.getElementById("mg");
    positionDisplay.textContent = ` ${(summmmm / totalMarksArray.length).toFixed(2)}`;



    var abvavcnt = 0;

    for (let i = 0; i < totalMarksArray.length; i++) {
        if (totalMarksArray[i] >= average) {
            abvavcnt++;
        }
    }

    positionDisplay = document.getElementById("tottt");
    positionDisplay.textContent = ` ${totalMarksArray.length}`;


    positionDisplay = document.getElementById("abvav");
    positionDisplay.textContent = ` ${abvavcnt}`;


    positionDisplay = document.getElementById("belav");
    positionDisplay.textContent = ` ${totalMarksArray.length - abvavcnt}`;
    
    // coloring the histogram

    backgroundColors.fill("rgba(221, 25, 62, 0.8)", parseInt(output[6]), maxMarks);


    backgroundColors.fill("rgba(236, 241, 17, 0.8)", parseInt(output[5]), parseInt(output[6]));

    backgroundColors.fill("rgba(80, 45, 183, 0.8)", parseInt(output[4]), parseInt(output[5]));


    backgroundColors.fill("rgba(255, 188, 53, 0.8)", parseInt(output[3]), parseInt(output[4]));


    backgroundColors.fill("rgba(50, 206, 180, 0.8)", parseInt(output[2]), parseInt(output[3]));


    backgroundColors.fill("rgba(103, 160, 0, 0.8)", parseInt(output[1]), parseInt(output[2]));

    backgroundColors.fill("rgba(106, 77, 108, 0.8)", parseInt(output[0]), parseInt(output[1]));

    backgroundColors.fill("rgba(221, 148, 27, 0.8)", parseInt(0), parseInt(output[0]));

    backgroundColors.fill("rgba(101, 39, 25, 0.6)", 0, parseInt(0));

    // Create a histogram chart using Chart.js
    const ctx = document.getElementById("histogramCanvas").getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: bins.map((bin) => `${bin}`),
            datasets: [
                {
                    label: 'My Dataset',
                    data: histogramData,
                    backgroundColor: backgroundColors,
                    borderColor: "rgba(255, 255, 255, 0.8)",
                    borderWidth: 0.8,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    display: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Marks Range",
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Number of students",
                    },
                    ticks: {
                        stepSize: 2,
                    },
                },
            },
        },
    });


    const slider = document.getElementById("range-slider");
    const buttons = document.querySelectorAll(".slider-button");
    const valueLabel = document.createElement("div");
    valueLabel.classList.add("value-label");
    slider.appendChild(valueLabel);

    var sliderButtonAPosition0 = parseInt(parseInt(output[6]));
    var sliderButtonAPosition1 = parseInt(parseInt(output[5]));
    var sliderButtonAPosition2 = parseInt(parseInt(output[4]));
    var sliderButtonAPosition3 = parseInt(parseInt(output[3]));
    var sliderButtonAPosition4 = parseInt(parseInt(output[2]));
    var sliderButtonAPosition5 = parseInt(parseInt(output[1]));
    var sliderButtonAPosition6 = parseInt(parseInt(output[0]));
    var sliderButtonAPosition7 = parseInt(0);


    // updating histogram colors and stats on every button click and movement

    buttons.forEach((button, index) => {
        button.addEventListener("mousedown", (e) => {
            e.preventDefault();
            button.classList.add("active");

            const onMouseMove = (e) => {
                const sliderRect = slider.getBoundingClientRect();
                const newPosition = ((e.clientX - sliderRect.left) / sliderRect.width) * (maxMarks);
                const minValue = 0;
                const maxValue = maxMarks;

                const currentValue = Math.min(maxValue, Math.max(minValue, newPosition));
                button.style.left = `${(currentValue * 100) / maxMarks}%`;


                var position = parseInt(((e.clientX - sliderRect.left) / sliderRect.width) * maxMarks);

                position = Math.min(Math.max(0, position), maxMarks);

                const positionDisplayy = document.getElementById("positionDisplayy");
                positionDisplayy.textContent = `Position: ${position.toFixed(0)}`;


                sliderButtonAPosition0 = parseInt(((buttons[0].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);


                backgroundColors.fill("rgba(221, 25, 62, 0.8)", sliderButtonAPosition0, maxValue);

                sliderButtonAPosition1 = parseInt(((buttons[1].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);

                backgroundColors.fill("rgba(236, 241, 17, 0.8)", sliderButtonAPosition1, sliderButtonAPosition0);


                sliderButtonAPosition2 = parseInt(((buttons[2].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);
                backgroundColors.fill("rgba(80, 45, 183, 0.8)", sliderButtonAPosition2, sliderButtonAPosition1);

                sliderButtonAPosition3 = parseInt(((buttons[3].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);
                backgroundColors.fill("rgba(255, 188, 53, 0.8)", sliderButtonAPosition3, sliderButtonAPosition2);

                sliderButtonAPosition4 = parseInt(((buttons[4].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);
                backgroundColors.fill("rgba(50, 206, 180, 0.8)", sliderButtonAPosition4, sliderButtonAPosition3);

                sliderButtonAPosition5 = parseInt(((buttons[5].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);
                backgroundColors.fill("rgba(103, 160, 0, 0.8)", sliderButtonAPosition5, sliderButtonAPosition4);

                sliderButtonAPosition6 = parseInt(((buttons[6].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);
                backgroundColors.fill("rgba(106, 77, 108, 0.8)", sliderButtonAPosition6, sliderButtonAPosition5);

                sliderButtonAPosition7 = parseInt(((buttons[7].getBoundingClientRect().left - sliderRect.left + 10) / sliderRect.width) * maxMarks);
                backgroundColors.fill("rgba(221, 148, 27, 0.8)", sliderButtonAPosition7, sliderButtonAPosition6);


                backgroundColors.fill("rgba(101, 39, 25, 0.6)", 0, sliderButtonAPosition7);


                var msum = 0;


                var threshold = sliderButtonAPosition0;
                var studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);

                // Get the number of students meeting the criteria
                var numberOfStudentsAboveThreshold = studentsAboveThreshold.length;

                var positionDisplay = document.getElementById("acnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;
                var tempo = numberOfStudentsAboveThreshold;

                positionDisplay = document.getElementById("acut");
                positionDisplay.textContent = ` ${threshold}`;



                msum += 10 * numberOfStudentsAboveThreshold;

                threshold = sliderButtonAPosition1;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                positionDisplay = document.getElementById("a-cnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

                positionDisplay = document.getElementById("a-cut");
                positionDisplay.textContent = ` ${threshold}`;

                tempo += numberOfStudentsAboveThreshold;

                msum += 9 * numberOfStudentsAboveThreshold;



                threshold = sliderButtonAPosition2;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                positionDisplay = document.getElementById("bcnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

                positionDisplay = document.getElementById("bcut");
                positionDisplay.textContent = ` ${threshold}`;

                tempo += numberOfStudentsAboveThreshold;

                msum += 8 * numberOfStudentsAboveThreshold;



                threshold = sliderButtonAPosition3;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                positionDisplay = document.getElementById("b-cnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

                positionDisplay = document.getElementById("b-cut");
                positionDisplay.textContent = ` ${threshold}`;

                tempo += numberOfStudentsAboveThreshold;

                msum += 7 * numberOfStudentsAboveThreshold;



                threshold = sliderButtonAPosition4;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                positionDisplay = document.getElementById("ccnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

                positionDisplay = document.getElementById("ccut");
                positionDisplay.textContent = ` ${threshold}`;

                tempo += numberOfStudentsAboveThreshold;


                msum += 6 * numberOfStudentsAboveThreshold;


                threshold = sliderButtonAPosition5;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                positionDisplay = document.getElementById("c-cnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

                positionDisplay = document.getElementById("c-cut");
                positionDisplay.textContent = ` ${threshold}`;

                tempo += numberOfStudentsAboveThreshold;

                msum += 5 * numberOfStudentsAboveThreshold;

                threshold = sliderButtonAPosition6;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                positionDisplay = document.getElementById("dcnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

                positionDisplay = document.getElementById("dcut");
                positionDisplay.textContent = ` ${threshold}`;

                tempo += numberOfStudentsAboveThreshold;

                msum += 4 * numberOfStudentsAboveThreshold;


                threshold = sliderButtonAPosition7;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                positionDisplay = document.getElementById("ecnt");
                positionDisplay.textContent = ` ${numberOfStudentsAboveThreshold}`;

                positionDisplay = document.getElementById("ecut");
                positionDisplay.textContent = ` ${threshold}`;

                tempo += numberOfStudentsAboveThreshold;

                msum += 2 * numberOfStudentsAboveThreshold;

                var sumlessthannclim = 0;

                for (let i = 0; i < totalMarksArray.length; i++) {
                    if (totalMarksArray[i] < threshold) {
                        sumlessthannclim += totalMarksArray[i];
                    }
                }



                threshold = 0 * maxMarks;
                studentsAboveThreshold = totalMarksArray.filter(mark => mark >= threshold);


                numberOfStudentsAboveThreshold = studentsAboveThreshold.length - tempo;


                tempo += numberOfStudentsAboveThreshold;


                average = (sum - sumlessthannclim) / (totalMarksArray.length - numberOfStudentsAboveThreshold);

                positionDisplay = document.getElementById("avg");
                positionDisplay.textContent = ` ${average.toFixed(2)}`;


                abvavcnt = 0;

                for (let i = 0; i < totalMarksArray.length; i++) {
                    if (totalMarksArray[i] >= average) {
                        abvavcnt++;
                    }
                }


                positionDisplay = document.getElementById("abvav");
                positionDisplay.textContent = ` ${abvavcnt}`;


                positionDisplay = document.getElementById("belav");
                positionDisplay.textContent = ` ${totalMarksArray.length - abvavcnt}`;


                var mgpa = msum / (totalMarksArray.length - numberOfStudentsAboveThreshold);




                positionDisplay = document.getElementById("mg");
                positionDisplay.textContent = ` ${mgpa.toFixed(2)}`

                positionDisplay = document.getElementById("mgppp");
                positionDisplay.textContent = ` ${mgpa.toFixed(2)}`

                // Update the chart
                chart.data.datasets[0].backgroundColor = backgroundColors;
                chart.update();
            };

            const onMouseUp = () => {
                button.classList.remove("active");
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        // ...

        button.addEventListener("mouseover", () => {
            // Show the button id on hover
            valueLabel.style.display = "block";
        });

        button.addEventListener("mouseout", () => {
            // Hide the button id when not hovering
            valueLabel.style.display = "none";
        });
    });

    // onMouseMove(10);

    var indexfill;

    for (var i = 0; i < 100; i++) {
        if (records[0][i] == undefined || records[0][i] == '') {
            indexfill = i;
            break;
        }
    }



    records[0][indexfill] = 'Grade';

    // logic for downloading updated csv sheet

    document.getElementById('downloadButton').addEventListener('click', () => {

        let maxval = 1;


        maxval = records.length;

        let message = "";

        var ii = 1;
        var cnttt = maxval;
        console.log(finalcut);
        for (; ii < maxval; ii++) {

            message += records[ii][totalMarksIndex];
            message += " ";
            console.log(records[ii][totalMarksIndex]);
            console.log(finalcut);
            console.log(records[ii][totalMarksIndex] < finalcut);

            if ((records[ii][totalMarksIndex] == '' || records[ii][totalMarksIndex] == undefined || records[ii][totalMarksIndex] == 'W' || records[ii][totalMarksIndex] == 'NC') && records[ii][totalMarksIndex] != 0) {
                records[ii][indexfill] = records[ii][totalMarksIndex];

                cnttt--;
            }
            else if (records[ii][totalMarksIndex] < finalcut) {
                records[ii][indexfill] = 'NC';
                // console.log(records[ii][totalMarksIndex]);
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition0) {
                records[ii][indexfill] = 'A';
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition1) {
                records[ii][indexfill] = 'A-';
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition2) {
                records[ii][indexfill] = 'B';
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition3) {
                records[ii][indexfill] = 'B-';
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition4) {
                records[ii][indexfill] = 'C';
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition5) {
                records[ii][indexfill] = 'C-';
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition6) {
                records[ii][indexfill] = 'D';
            }
            else if (records[ii][totalMarksIndex] >= sliderButtonAPosition7) {
                console.log(records[ii][totalMarksIndex]);
                records[ii][indexfill] = 'E';
            }
            else {
                records[ii][indexfill] = 'NC';
            }

        }

        // Convert to CSV
        const csv = records.map(row => row.join(',')).join('\n');

        // Create a Blob from the CSV data
        const blob = new Blob([csv], { type: 'text/csv' });

        // Create a download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = coursecode + 'finalGrades.csv';
        // console.log(coursecode);
        document.body.appendChild(a);
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });

});




