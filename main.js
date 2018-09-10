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
        console.log(mapArr)
        return mapArr;
    }

    function sortIdx() {
        var mapArr = getMapArr();
        var mapSize = setMap()[0];
        var atSide = [];
        var atCenter = [];
        for (var i = 0; i < mapArr.length; i++) {
            if (mapArr[i].indexOf(0) >= 0) {
                atSide.push(mapArr[i])
            } else if (mapArr[i].indexOf(mapSize + 1) >= 0) {
                atSide.push(mapArr[i])
            } else {
                atCenter.push(mapArr[i])
            }
        }
        return [atSide, atCenter]
    }


    $("#startBtn").click(setMap)
    $("#alignBtn").click(sortIdx);
})