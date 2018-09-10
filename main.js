$(function () {
    var shipAmt = parseInt($("#shipAmt option:selected").html());
    $("#startBtn").click(function () {
        var mapSize = parseInt($("#mapSize option:selected").html());
        console.log(mapSize, shipAmt, typeof (mapSize))

        var contents;
        for (var i = 0; i < mapSize; i++) {
            contents += "<tr>"
            for (var j = 0; j < mapSize; j++) {
                contents += "<td>"
                contents += [i,j]
                contents += "</td>"
            }
            contents += "</tr>"
        }
        $("table tbody tr").remove();
        $("table tbody").append(contents);
    })
})