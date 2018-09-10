$(function () {

    function setMap() {
        var mapSize = parseInt($("#mapSize option:selected").html());
        var shipAmt = parseInt($("#shipAmt option:selected").html());
        console.log(mapSize, shipAmt, typeof (mapSize))

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
        console.log("map", mapSize)
        for (var i = 0; i < mapSize; i++) {
            for (var j = 0; j < mapSize; j++) {
                mapArr.push("" + i + "" + j)
            }
        }
        console.log(mapArr);
        return mapArr;
    }

    $("#startBtn").click(setMap)
    $("#alignBtn").click(getMapArr);
})