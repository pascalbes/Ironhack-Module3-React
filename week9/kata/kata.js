function findOdd(A) {
    
    numbers= [];
    counts = [];
    var iNum = -1;

    for (let i=0;i<A.length;i++) {

        iNum = numbers.indexOf(A[i])

        if (iNum == -1) {
            numbers.push(A[i])
            counts.push(1)   
        }
        else {
            counts[iNum]++
        }
    }

    for (let i=0; i<counts.length;i++) {
        if (counts[i]%2!==0) {
            return numbers[i]
        }
    }

  }

  console.log(findOdd([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5]))