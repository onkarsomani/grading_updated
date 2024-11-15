let maxobtmarks = 0;
let minobtmarks = 100;
let ps = [];
let dcut;
let cccnt = 0;
let diff;
let n, courseTotal;

function f(st, end, rem, temp, vv) {
    if (rem === 0) {
        vv.push([...temp]);
        return;
    }
    if (st > end) {
        return;
    }
    temp.push(st);
    f(st + diff, end, rem - 1, temp, vv);
    temp.pop();
    f(st + 2, end, rem, temp, vv);
}

function considerable(temp, starttar, endtar, cuts, n) {
    let sum = 0;
    sum += ps[0] * 2;
    sum += (ps[cuts[1] - 1] - ps[0]) * 4;
    sum += (ps[cuts[2] - 1] - ps[cuts[1] - 1]) * 5;
    sum += (ps[cuts[3] - 1] - ps[cuts[2] - 1]) * 6;
    sum += (ps[cuts[4] - 1] - ps[cuts[3] - 1]) * 7;
    sum += (ps[cuts[5] - 1] - ps[cuts[4] - 1]) * 8;
    sum += (ps[cuts[6] - 1] - ps[cuts[5] - 1]) * 9;
    sum += (ps[100] - ps[cuts[6] - 1]) * 10;

    let mgpv = sum / n;
    if (mgpv >= starttar && mgpv <= endtar) {
        temp.push([...cuts]);
    }
}

function best(input) {
    let mini = Infinity;
    let ans = [];
    var per100 = n/100;
    console.log(30*per100);
    for (let v of input) {
        let tot = 0;
        let f = 0;
        for (let i = 0; i < 7; i++) {
            if (i === 6) {
                if (ps[100] - ps[v[i] - 1] <= 5 * per100 || ps[100] - ps[v[i] - 1] >= 25 * per100) {
                    f = 1;
                    break;
                }
            } else if (i >= 4) {
                if (ps[v[i + 1] - 1] - ps[v[i] - 1] < 4 * per100 || ps[v[i + 1] - 1] - ps[v[i] - 1] >= 30 * per100) {
                    f = 1;
                    break;
                }
            } else if (i >= 2) {
                if (ps[v[i + 1] - 1] - ps[v[i] - 1] < 4 * per100 || ps[v[i + 1] - 1] - ps[v[i] - 1] >= 30 * per100) {
                    f = 1;
                    break;
                }
            } else if (i >= 1) {
                if (ps[v[i + 1] - 1] - ps[v[i] - 1] < 1 * per100 || ps[v[i + 1] - 1] - ps[v[i] - 1] >= 30 * per100) {
                    f = 1;
                    break;
                }
            } else {
                if (ps[v[i + 1] - 1] - ps[v[i] - 1] < 1 * per100 || ps[v[i + 1] - 1] - ps[v[i] - 1] >= 10 * per100) {
                    f = 1;
                    break;
                }
            }
            if (i <= 1) {
                tot += 2 * (ps[v[i] ] - ps[Math.max(v[i] - 1, dcut)]);
            } else if (i <= 4) {
                tot += 4 * (ps[v[i] ] - ps[Math.max(v[i] - 1, dcut)]);
            } else {
                tot += 3 * (ps[Math.min(v[i] , 100)] - ps[Math.max(v[i] - 1, dcut)]);
            }
        }
        if (!f) {
            cccnt++;
        }
        if (!f && tot <= mini) {
            mini = tot;
            ans = [...v];
        }
    }
    console.log(per100);
    for(let val of ans){
        console.log(val);
    }
    return ans;
}




function calculateGrades(marksArray, courseTotalInput) {
    courseTotal = courseTotalInput;
    let m = new Map();
    let sum = 0;
    n = marksArray.length;
    
    for (let i = 0; i < n; i++) {
        let x = parseInt(marksArray[i] * 100 / courseTotal);
        m.set(x, (m.get(x) || 0) + 1);
        maxobtmarks = Math.max(maxobtmarks, x);
        minobtmarks = Math.min(minobtmarks, x);
        sum += x;
    }
    let ans = [];
    ans.push(Math.round(0.3 * maxobtmarks));
    ans.push(Math.round(0.4 * maxobtmarks));
    ans.push(Math.round(0.5 * maxobtmarks));
    ans.push(Math.round(0.6 * maxobtmarks));
    ans.push(Math.round(0.7 * maxobtmarks));
    ans.push(Math.round(0.8 * maxobtmarks));
    ans.push(Math.round(0.9 * maxobtmarks));
    diff = Math.ceil((maxobtmarks - minobtmarks) / 20);
    ps = new Array(101).fill(0);
    ps[0] = m.get(0) || 0;
    for (let i = 1; i <= 100; i++) {
        ps[i] = ps[i - 1] + (m.get(i) || 0 );
    }
    let average = Math.round(sum / n);
    dcut = 2;
    

    for (let i = 2; i <= 20; i++) {
        if ((ps[i]) >= 3 * n / 100) {
            dcut = i;
            break;
        }
        else{
            dcut =i;
        }
    }

    let output = [];
    if (average >= 60) {
        let right = [];
        let temp = [];
        f(average, maxobtmarks, 2, temp, right);
        let left = [];
        temp = [];
        f(dcut + diff, average - 1, 4, temp, left);
        let eligible = [];
        for (let v of left) {
            for (let vv of right) {
                let ttt = [];
                ttt.push(dcut);
                ttt.push(...v);
                ttt.push(...vv);
                if (average >= 75) considerable(eligible, 8.0, 9.0, ttt, n);
                else considerable(eligible, 7.8, 8.5, ttt, n);
            }
        }
        let ttt = best(eligible);
        if (ttt.length) ans = [...ttt];
    } else if (average >= 45) {
        let right = [];
        let temp = [];
        f(average, maxobtmarks, 3, temp, right);
        let left = [];
        temp = [];
        f(dcut + diff, average - 1, 3, temp, left);
        let eligible = [];
        for (let v of left) {
            for (let vv of right) {
                let ttt = [];
                ttt.push(dcut);
                ttt.push(...v);
                ttt.push(...vv);
                considerable(eligible, 7.0, 7.5, ttt, n);
            }
        }
        let ttt = best(eligible);
        if (ttt.length) ans = [...ttt];
    } else {
        let right = [];
        let temp = [];
        f(average, maxobtmarks, 4, temp, right);
        let left = [];
        temp = [];
        f(dcut + diff, average - 1, 2, temp, left);
        
        let eligible = [];
        for (let v of left) {
            for (let vv of right) {
                let ttt = [];
                ttt.push(dcut);
                ttt.push(...v);
                ttt.push(...vv);
                if (average >= 30) considerable(eligible, 6.0, 7.0, ttt, n);
                else considerable(eligible, 5.8, 6.4, ttt, n);
            }
        }
        
        let ttt = best(eligible);
        if (ttt.length) ans = [...ttt];
    }


    
    for (let val of ans) {
        output.push(Math.round(val * courseTotal / 100));
    }

    // console.log(per100);

    return output;
}

