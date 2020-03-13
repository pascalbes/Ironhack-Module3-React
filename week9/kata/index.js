// Welcome to the Kata Challenge
// You have 1 hour for this challenge
// You can ask question if you are not sure about the instructions
// Send the link of your Repl.it when you done

// Task 1: reverse
// The goal is to reverse a string
// Input: a string
// Output: a string, reversed
function reverse(str) {
    return str.split("").reverse().join('')

  }
  console.log('Task 1')
  console.log('reverse "test" =>', reverse("test")) // => "tset"
  console.log('reverse "Ironhack" =>', reverse("Ironhack")) // => "kcahnorI"
  
  
  // Task 2: sumHours
  // The goal is to do the sum of 2 hours with a special format "HH:MM"
  // Input: 2 strings with the format "HH:MM" (HH < 24 and MM < 60)
  // Output: 1 string with the fomat "HH:MM" (HH < 24 and MM < 60)
  // If "HH" is too big, you have to remove 24

  function formatNumber(num) {
    return num < 10 ? "0" + num.toString() : num
  }

  function sumHours(x, y){
    var h1 = Number(x.slice(0,2))
    var m1 = Number(x.slice(3,5))
    var h2 = Number(y.slice(0,2))
    var m2 = Number(y.slice(3,5))
    
    var hFinal=0
    var mFinal=0

    if (h1+h2 >= 24) {
        hFinal = h1 + h2 - 24
    }
    else {
        hFinal = h1 + h2 
    }

    if (m1+m2 >= 60) {
        hFinal++
        mFinal = m1 + m2 - 60
    }
    else {
        mFinal = m1 + m2
    }

    return formatNumber(hFinal) + ":" + formatNumber(mFinal)


  }
  
  console.log('\nTask 2')
  console.log('01:00 + 02:00 =>', sumHours("01:00", "02:00")) // => "03:00"
  console.log('10:00 + 02:00 =>', sumHours("10:00", "02:00")) // => "12:00"
  console.log('23:00 + 02:00 =>', sumHours("23:00", "02:00")) // => "01:00"
  console.log('01:23 + 02:00 =>', sumHours("01:23", "02:00")) // => "03:23"
  console.log('09:50 + 12:42 =>', sumHours("09:50", "12:42")) // => "22:32"
  
  
  // Task 3: buildSnailShell (hard and long)
  // The goal is to build a snail shell
  // Input: A 2 dimensional array of strings (always a rectangle), with only 1 '#'
  // Ouput: A 2 dimensional array of strings, same size, but with more '#'
  // To add '#', you have to follow the following pattern:
  // - Start at '#'
  // - Add 1 '#' to the right
  // - Add 2 '#' to the top
  // - Add 3 '#' to the left
  // - Add 4 '#' to the bottom
  // - Add 5 '#' to the right
  // - ...
  // - Stop when you are outside of the boundary

function addH(matrix, i, j, num, dir) {

    var count=0
    var stop=0
    var iFinal=0
    var jFinal=0

    if (dir=="right") {
        j=j+1
        while (j<matrix[0].length && count<num) {
            matrix[i][j]="#"
            j++
            count++
        }
        count!==num  ? stop = 1 : "kikou"
        iFinal=i
        jFinal=j-1
    }

    if (dir=="left") {
        j=j-1
        while (j>=0  && count<num) {
            matrix[i][j]="#"
            j--
            count++
        }
        count!==num ? stop = 1 : "kikou"
        iFinal =i
        jFinal=j+1
    }

    if (dir=="bottom") {
        i=i+1
        while (i<matrix.length && count<num) {
            matrix[i][j]="#"
            i++
            count++
        }
        count!==num ? stop = 1 : "kikou"
        iFinal =i-1
        jFinal=j
    }

    if (dir=="top") {
        i=i-1
        while (i>=0 && count<num) {
            matrix[i][j]="#"
            i--
            count++
        }
        count!==num ? stop = 1 : "kikou"
        iFinal =i+1
        jFinal=j
    }

    return [matrix, stop, iFinal, jFinal]

}



  function buildSnailShell(matrix){
    
    //look for #
    var iH = 0
    var jH = 0
    for (let i=0; i<matrix.length;i++) {
        if( matrix[i].indexOf("#") > -1 ) {
            iH=i
            jH = matrix[i].indexOf("#")
        }
    }

    var directions =["right", "top", "left", "bottom"];
    var iDir=0;
    var number = 1

    var stop = 0

    while (stop == 0 ) {

        [matrix, stop, iH, jH] = addH(matrix, iH, jH, number, directions[iDir])

        number++

        iDir++
        if (iDir >= directions.length) {
            iDir=0
        }
    }

    return matrix
  }
  
  console.log('\nTask 3')
  console.log("buildSnailShell 1\n", buildSnailShell([
    [' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' '],
    [' ',' ','#',' ',' ',' '],
    [' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ']
  ]))
  // =>
  // [
  //   [' ',' ',' ',' ',' ','#'],
  //   ['#','#','#','#',' ','#'],
  //   ['#',' ',' ','#',' ','#'],
  //   ['#',' ','#','#',' ','#'],
  //   ['#',' ',' ',' ',' ','#'],
  //   ['#','#','#','#','#','#'],
  //   [' ',' ',' ',' ',' ',' ']
  // ]
  
  console.log("buildSnailShell 2\n", buildSnailShell([
    [' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ','#',' '],
    [' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ']
  ]))
  // =>
  // [
  //   [' ',' ',' ',' ',' ','#'],
  //   [' ',' ',' ',' ','#','#'],
  //   [' ',' ',' ',' ',' ',' '],
  //   [' ',' ',' ',' ',' ',' ']
  // ]
  