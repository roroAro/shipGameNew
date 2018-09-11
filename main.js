$(function () {

    function setMap() {
        var mapSize = parseInt($("#mapSize option:selected").html());
        var shipAmt = parseInt($("#shipAmt option:selected").html());

        var contents;
        for (var i = 0; i < mapSize + 2; i++) {
            contents += "<tr>"
            for (var j = 0; j < mapSize + 2; j++) {
                contents += "<td>"
                contents += "" + i + "" + j;
                contents += "</td>"
            }
            contents += "</tr>"
        }
        $("table tbody tr").remove();
        $("table tbody").append(contents);
        return [mapSize, shipAmt];
    }

    function getMapArr() {
        var mapArr = [];
        var mapSize = setMap()[0];
        for (var i = 0; i < mapSize + 2; i++) {
            for (var j = 0; j < mapSize + 2; j++) {
                mapArr.push("" + i + "" + j)
            }
        }
        return mapArr;
    }

    function sortIdx() {
        var mapArr = getMapArr();
        var mapSize = setMap()[0];
        var atSideArr = [];
        var atCenterArr = [];
        for (var i = 0; i < mapArr.length; i++) {
            if (mapArr[i].indexOf(0) >= 0) {
                atSideArr.push(mapArr[i])
            } else if (mapArr[i].indexOf(mapSize + 1) >= 0) {
                atSideArr.push(mapArr[i])
            } else {
                atCenterArr.push(mapArr[i])
            }
        }
        return [atSideArr, atCenterArr]
    }

    function setDirection() {
        var direction = Math.floor(Math.random() * 2);
        return direction;
    }

    function makeRandomNum() {
        var randomRange = mapArr.length;
        var randomNum = Math.floor(Math.random() * randomRange);
        return randomNum;
    }

    function makeRandomArr() {
        var direction = setDirection();
        var randomNum = parseInt(makeRandomNum());
        var mapSize = parseInt(setMap()[0]);
        var randomArr = [];
        if (direction == 0) {
            randomArr.push(randomNum - 1, randomNum, randomNum + 1)
        } else if (direction == 1) {
            randomArr.push(randomNum - mapSize, randomNum, randomNum + mapSize)
        }
        console.log("n번째 인덱스", randomArr);
        return randomArr;
    }


    function randomNumToIdx() {
        var randomArr = makeRandomArr();
        var atCenterArr = sortIdx()[1];
        var shipIdx = [];
        for (var i = 0; i < 3; i++) {
            shipIdx.push(atCenterArr[randomArr[i]]);
        }
        console.log("n번째 인덱스의 좌표 값", shipIdx)
        if (shipIdx.length < 3) {
            return false;
        } else {
            return shipIdx;
        }
    }
   
    function checkDuplication(targetArr, randomArr) {
        for (var i = 0; i < randomArr.length; i++) {
            if (targetArr.indexOf(randomArr[i]) >= 0) {
                console.log("checkDupliaction() : 해당 배열의 겹칩니다 다시 뽑습니다", randomArr)
                return false;
            } else {
                return true;
            }
        }
    }

    function setTotalShipPos() {
        var shipIdxArr = [];
        var shipIdx = randomNumToIdx();
        var shipAmt = setMap()[1];
        for (var i = 0; i < shipAmt; i++) {
            shipIdxArr.push(shipIdx);
        }
    }



    $("#startBtn").click(setMap)
    $("#alignBtn").click(randomNumToIdx);
})