$(function () {
    ///////////////////////////////////////////
    ///////////////게임 설명   /////////////////
    // 0. 7*7 크기의 표가 있습니다. 각 칸은 좌표를 가집니다.
    // 1. 컴퓨터가 1*3 혹은 3*1 크기의 전함 3척을 랜덤 생성하고 자리에 위치시킵니다. 
    // 2. 사용자는 좌표를 클릭합니다. 
    // 3. 해당 좌표에 전함이 존재하면 점수를 얻습니다. 
    //    전함의 중앙을 피격할 시 더 높은 점수를 획득합니다. 
    // 4. 사용자가 모든 전함의 위치를 알아내면 게임이 종료됩니다. 
    ///////////////////////////////////////////
    ///////////////////////////////////////////


    ///////////////////////////////////////////
    ///////////////게임 세팅   /////////////////
    ///////////////////////////////////////////
    var map = {
        size: 7,
    }
    var ship = {
        amount: 3,
        length: 3,
        center: [],
        total: [],
        left: 3 * 3
    }

    //배가 위치할 수 없는 구석자리
    var edgePos = [1, map.size, map.size * (map.size - 1) + 1, map.size * map.size];

    //배가 너무 가까운 경우의 좌표 차
    //각각의 숫자는 좌우 / 우상단,좌하단 / 상단,하단 / 좌상단,우하단 / 좌우로 2칸 / 상하로 2칸
    var closePos = [1, -1, map.size, -(map.size - 1), map.size, -map.size, map.size + 1, -(map.size + 1), 2, -2, map.size * 2, -map.size * 2]

    //맵의 크기에 맞는 랜덤 숫자 생성
    //배의 좌표값이 됩니다
    function makeRandomNum() {
        var randomNum = Math.floor(Math.random() * Math.pow(map.size, 2.0)) + 1;
        return randomNum;
    }

    //모서리를 피하기 위한 함수
    function checkEdge(random) {
        if (edgePos.indexOf(random) >= 0) {
            console.log("checkEdge(): return false ", random)
            return false;
        } else {
            return true;
        }
    }

    //각각 배 사이의 거리가 적절한지 검사하는 함수
    function checkDistance(random) {
        var diff = [];
        var flag = [];
        if (ship.center.length == 0) {
            return true;
        } else if (ship.center.length >= 1) {
            for (var i = 0; i < ship.amount - 1; i++) {
                diff[i] = ship.center[i] - random;
            }
            for (var i = 0; i < diff.length; i++) {
                if (closePos.indexOf(diff[i]) >= 0) {
                    flag.push(false);
                    console.log("checkDistance(): return false", ship.center, random)
                } else {
                    flag.push(true);
                }
            }
        }
        if (flag.indexOf(false) >= 0) {
            return false;
        } else {
            return true;
        }
    }

    //배의 좌표가 겹치는지 검사하는 함수
    function checkDuplicate(random) {
        if (ship.center.indexOf(random) >= 0) {
            console.log("checkDuplicate(): return false", random)
            return false;
        } else {
            return true;
        }
    }

    //checkEdge, checkDistance, checkDuplicate가 모두 true일 때 ship.center 배열에 랜덤 숫자 추가
    function setshipCenter() {
        var randomNum = makeRandomNum();
        var flagEdge = checkEdge(randomNum);
        var flagDis = checkDistance(randomNum);
        var flagDup = checkDuplicate(randomNum);
        if (flagEdge && flagDis && flagDup) {
            console.log("랜덤넘버 성공 : ", randomNum, flagEdge, flagDis, flagDup)
            ship.center.push(randomNum);
            return ship.center;
        } else {
            console.log("랜덤넘버 실패 : ", randomNum, flagEdge, flagDis, flagDup)
        }
    }

    function setshipCenterArr() {
        while (ship.center.length < ship.amount) {
            setshipCenter();
        }
        console.log("setshipCenterArr", ship.center)
        return ship.center;
    }

    //세 척의 배에 방향을 정하겠습니다
    //배의 중앙이 테두리에 위치하는 경우, 
    //방향을 수동으로 지정해줍니다 
    //각 줄은 맨 윗줄 테두리에는 가로로 지정 / 맨 밑줄 테두리에는 가로로 지정 /좌측 우측 테두리에는 세로로 지정 할 것을 의미합니다
    function setDirection() {
        var direction = [];
        for (var i = 0; i < ship.amount; i++) {
            direction[i] = Math.floor(Math.random() * 2);
        }
        for (var i = 0; i < ship.amount; i++) {
            if (ship.center[i] >= 1 && ship.center[i] <= map.size) {
                direction[i] = 0;
            } else if (ship.center[i] >= edgePos[2] && ship.center[i] <= edgePos[3]) {
                direction[i] = 0;
            } else if (ship.center[i] % map.size == 0 || ship.center[i] % map.size == 1) {
                direction[i] = 1;
            }
        }
        return direction;
    }


    function setShipPos() {
        ship.center = setshipCenterArr();
        var direction = setDirection();
        for (var i = 0; i < ship.amount; i++) {
            if (direction[i] == 0) {
                //direction[i]의 랜덤값이 0인 경우 가로로 배치합니다
                ship.total.push(ship.center[i] - 1, ship.center[i], ship.center[i] + 1);
            } else if (direction[i] == 1) {
                //direction[i]의 랜덤값이 1인 경우 세로로 배치합니다
                ship.total.push(ship.center[i] - map.size, ship.center[i], ship.center[i] + map.size);
            }
        }
        console.log("모든 배의 좌표 : ", ship.total);
        return ship.total;
    }

    function main() {
        ship.total = setShipPos();
        console.log("main", ship.total);
        return ship.total;
    }

    ship.total = main();

    ///////////////////////////////////////////
    //////////////// 게임 시작 /////////////////
    ///////////////////////////////////////////
    var clickCount = 0;
    var grade = 0;

    $("table tbody tr td").click(function () {
        var userPick = parseInt($(this).text());

        //점수 판별을 위한 배열
        //전함을 맞춘 경우 이 배열 안에 맞춘 곳이 중앙인지 사이드인지 들어가 추후 점수계산에서 사용됩니다
        //클릭시마다 초기화 됩니다
        var gradeArr = [];

        clickCount++;

        if ($(this).html() == "") {
            //이미 클릭이 된 좌표의 경우 아무것도 반환하지 않기 위해 if문으로 감쌉니다
            clickCount--;
            $("#result").val("이미 클릭된 좌표입니다");
        } else {

            //클릭이 되지 않은 좌표의 경우
            //클릭이 되었음을 알리기 위해 좌표의 html을 제거하고 배경 색을 바꿔줍니다 
            //전함을 맞춘 경우, 중앙인지 사이드인지 알리기 위해 gradeArr 배열에 값을 넣어줍니다 
            //전함을 맞춘 경우, leftShip의 값을 1씩 감소킵니다. 나중에 0이 되면 게임을 종료시킵니다. (초기값 : 9)
            if (ship.center.indexOf(userPick) >= 0) {

                //전함의 중앙에 맞춘 경우 
                $(this).html("");
                $(this).css("background-color", "darkred");
                $("#result").val("전함을 정확히 맞혔습니다!!")
                gradeArr.push("center")
                ship.left--;

            } else if (ship.total.indexOf(userPick) >= 0) {
                //전함의 사이드에 맞춘 경우 
                $(this).html("");
                $(this).css("background-color", "darkblue");
                $("#result").val("무언가가 맞았다!!")
                gradeArr.push("side")
                ship.left--;

            } else {
                //아무것도 맞추지 못한 경우 
                $(this).html("");
                $("#result").val("꽝")
            }
        }
        $("#counter").val(clickCount);

        //클릭 횟수에 따라 차등적으로 점수를 부여하는 부분입니다
        //gradeArr의 인덱스를 참조합니다 

        //1~5회 내 맞춘 경우:       정중앙 50, 사이드 15
        //6~10회 내 맞춘 경우:      정중앙 30, 사이드 10
        //11~15회 내 맞춘 경우:     정중앙 15, 사이드 5
        //16~20회 내 맞춘 경우:     정중앙 10, 사이드 2
        //20회 초과인 경우:         정중앙 5, 사이드 2 

        if (clickCount > 0 && clickCount <= 5 && gradeArr[0] == "center") {
            grade += 50;
        } else if (clickCount > 5 && clickCount <= 10 && gradeArr[0] == "center") {
            grade += 30;
        } else if (clickCount > 10 && clickCount <= 15 && gradeArr[0] == "center") {
            grade += 15;
        } else if (clickCount > 15 && clickCount <= 20 && gradeArr[0] == "center") {
            grade += 10;
        } else if (clickCount > 20 && gradeArr[0] == "center") {
            grade += 5;
        } else if (clickCount > 0 && clickCount <= 5 && gradeArr[0] == "side") {
            grade += 15;
        } else if (clickCount > 5 && clickCount <= 10 && gradeArr[0] == "side") {
            grade += 10;
        } else if (clickCount > 10 && clickCount <= 15 && gradeArr[0] == "side") {
            grade += 5;
        } else if (clickCount > 15 && gradeArr[0] == "side") {
            grade += 2;
        }

        //사용자가 모든 전함의 위치를 알아내면 게임을 종료합니다.
        if (ship.left == 0) {
            $("#result").val("모든 전함이 침몰했습니다. 점수를 확인하세요");
        }
        $("#grade").val(grade);

    })
})

