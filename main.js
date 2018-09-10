$(function () {

    function setMap() {
        var mapSize = parseInt($("#mapSize option:selected").html());
        var shipAmt = parseInt($("#shipAmt option:selected").html());

        var contents;
        for (var i = 0; i < mapSize; i++) {
            contents += "<tr>"
            for (var j = 0; j < mapSize; j++) {
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
        for (var i = 0; i < mapSize; i++) {
            for (var j = 0; j < mapSize; j++) {
                mapArr.push("" + i + "" + j)
            }
        }
        return mapArr;
    }

    function definePos() {
        var mapArr = getMapArr();
        var mapSize = setMap()[0];
        var mapSizePow = Math.pow(mapSize, 2.0);
        //테두리에 있으면 false, 중앙에 있으면 true를 리턴
        var isCenter = [];
        for (var i = 0; i < mapSizePow; i++) {
            if (mapArr[i].indexOf(0) >= 0 || mapArr[i].indexOf(mapSize - 1) >= 0) {
                isCenter[i] = false;
            } else {
                isCenter[i] = true;
            }
        }
        return isCenter;
    }

    $("#startBtn").click(setMap)
    $("#alignBtn").click(definePos);
})