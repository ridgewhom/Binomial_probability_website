function myFunction() {
    alert(combination(10,2))
}

let factorialArr = [1n,1n]

// TODO: change variable names to be more descriptive
// TODO: add function descriptions
// TODO: 

export function factorial(n){
    if (!Number.isInteger(n))
        throw "Factorial argument must be an integer";
    if (n < 0)
        throw "Factorial argument must be >= 0 ";

    if (typeof factorialArr[n] != 'undefined')
        return factorialArr[n]
    let i = BigInt(factorialArr.length)
    let rtn = factorialArr[factorialArr.length - 1]
    for(; i <= n; i++){
        factorialArr[i] = rtn *= i;
    }
    return rtn;
}

export function combination(n,r){
    if (!Number.isInteger(n) || !Number.isInteger(r))
        throw "Combination arguments must be integers";
    if (n < 0 || r < 0)
        throw "Combination arguments must be >= 0 ";
    if (r == 0 || n < r) return 1;
    return Number(factorial(n)/(factorial(r) * factorial(n-r)));
}

export function permutation(n,r){
    if (!Number.isInteger(n) || !Number.isInteger(r))
        throw "Permutation arguments must be integers";
    if (n < 0 || r < 0)
        throw "Permutation arguments must be >= 0";
    if (r == 0 || n < r) return 1;
    return Number(factorial(n)/factorial(n-r));
}

export function binomialPMF(k,n,p){ //https://en.wikipedia.org/wiki/Binomial_distribution#Probability_mass_function
    if (!k || !n || !p){
        throw "BinomialPMF: Null or Undefined arguments"
    }
    if(!Number.isInteger(k) || !Number.isInteger(n)){
        throw "BinomialPMF: Number of trials and Number of successes must be integers"
    }
    if (p < 0 || p > 1) 
        throw "binomialPMF: Probability must be between 0 and 1 exclusively";
    return combination(n,k) * (p**k) * (1-p)**(n-k);  // C(n,k) * p^k * (1-p)^(n-k)
}

export function cumulativeBinomialPMF(endK,n,p,startK=0){
    if (!start_k  ||!endK || !n || !p){
        throw "cumulativeBinomialPMF: Null or Undefined arguments"
    }
    if(!Number.isInteger(startK) || !Number.isInteger(endK) || !Number.isInteger(n)){
        throw "cumulativeBinomialPMF: Number of trials and Number of successes must be integers"
    }
    if (p < 0 || p > 1) 
        throw "cumulativeBinomialPMF: Probability must be between 0 and 1 exclusively";
    let rtn = 0
    for(let k = startK; i <= endK; i++){
        rtn += binomialPMF(k,n,p)
    }
    return rtn
}


export function negativeBinomialPMF(n,r,p){ //https://en.wikipedia.org/wiki/Negative_binomial_distribution => n trials given r succeses
    if (!r|| !n || !p){
        throw "negativeBinomialPMF: Null or Undefined arguments"
    }
    if(!Number.isInteger(r) || !Number.isInteger(n)){
        throw "negativeBinomialPMF: Number of trials and Number of successes must be integers"
    }
    if (p < 0 || p > 1) 
        throw "negativeBinomialPMF: Probability must be between 0 and 1 exclusively";
    return Number(combination(n-1,r-1) * (p ** r) * ((1-p)**(n-r)))
}

/*  TODO:   cumulative negative binomial
*           cum_neg_bin(n,r,p) = current + previous_cumulative
*           [idx0,idx0+idx1,1+2,.....]
*
*/
export function cumulativeNegativeBinomialPMF(endN,r,p,startN=0){
    if (!r|| !endN || !startN || !p){
        throw "negativeBinomialPMF: Null or Undefined arguments"
    }

    let rtn = 0;
    for(let n = start_n; n < end_n; n++){
        rtn += negativeBinomialPMF(n,r,p)
    }
}

export function cumulativeNegativeBinomialArr(num_trials,r,p){
    let probArr = [0.0];
    let t0 = performance.now()
    let max_prop = 1.0

    let i = 1;
    let flag = true
    for(;i <= num_trials; i++){
        if (probArr[i-1] >= max_prop ){
            probArr.push(max_prop );
            continue;
        }

        let n1 = negativeBinomialPMF(i,r,p) 
        let n = n1 + probArr[i-1]
        if (flag && n >  (1 - 3.3E-9)){
            console.log("lottery " + i)
            flag = false 
        }
        if (n > 0.99999999999999989) //any number higher than this will be misrepresented in floating point so round to 1
            n = max_prop                  //Maybe make this maximum float below 1? to remove illusion of 100% chance
        probArr.push(n)
    }
    let t1 = performance.now()
    console.log(t1-t0 + "ms")
    console.log(probArr)
    return probArr;
}
