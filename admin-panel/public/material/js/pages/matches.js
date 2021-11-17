var full_score = "";
var match_type = 0;
$(document).ready(function() {
    $( "#sortable" ).sortable({
        stop:function(){
            saveNotification(2, 0)
        }
    });
    $("#score").inputmask({
        mask: "99/99-99/99-99/99",
        placeholder: ' ',
    });
    $('.datetimepicker').datetimepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        },
        format: 'YYYY-MM-DD H:MM:ss'
    });
    $("#matchForm").submit(function(event) {
        if(getShort(getScore()).valid == false){
            event.preventDefault();
            $("#validate_score").addClass("has-danger");
            $("#score").focus();
        }
    });
    drawMatchNotification();
    changeScore();
});
const saveNotification = function(type, data){ //type -> 0:move, 1:delete, 2:add
    if(type == 2) data = $("#sortable").sortable("toArray");
    $.ajax({
        url: 'matches/notification',
        dataType: 'json',
        type: 'post',
        data:{data:data, type:type},
        success: function (json, textStatus, jqXHR) {
            drawMatchNotification();
        },
        error: function (data, textStatus, jqXHR) {
            drawMatchNotification();
        }
    });
}
const drawMatchNotification = function(){
    $.ajax({
        url: 'matches/notification',
        dataType: 'json',
        type: 'get',
        success: function (json, textStatus, jqXHR) {
            $("#sortable").empty();
            $("#canAdd").empty();
            let ex = "";
            json.forEach((el, index) => {
                if(index != 0) ex += " : ";
                if(el.active == 1)
                    $("#sortable").append(`<li class="ui-state-default" id="${el.id}">${el.title}<span onclick="saveNotification(0, ${el.id})">×</span></li>`);
                else
                    $("#canAdd").append(`<span href="#" class="canAdd" onclick="saveNotification(1, ${el.id})">${el.title}</span>`);

                if(el.type == 1) ex += `Team 1 vs Team 2`;
                if(el.type == 2) ex += `3-1`;
                if(el.type == 3) ex += `MATCH LIVE`;
                if(el.type == 4) ex += `25/10-25/05-20/25- 25/13`;
                if(el.type == 5) ex += `French Cup`;
            });
            $("#notify_example").text(ex);
        },
        error: function (data, textStatus, jqXHR) {
            console.log(data);
        }
    });
}
const getScore = function () {
    let score = $("#score").val();
    score = score.replace(/\s/g, "");
    score = score.replace(/_/g, "");
    score = score.replace("/-", "");
    score = score.replace("-/", "");
    let end_ch = score[score.length-1];
    if(end_ch=='-' || end_ch=="/" )
        score = score.substring(0, score.length-1);
    return score;
}
const changeScore = function () {
    const score = getScore();
    if(full_score == score) return;
    console.log(score);
    full_score = score;
    const short_score = getShort(full_score);
    $("#short_score").val(short_score.score);
    $("#validate_score").removeClass("has-danger");
    if(!short_score.valid)
        $("#validate_score").addClass("has-danger");
    
    const is_live = checkLive(score);
    if(is_live) $("#live_match_txt").removeClass("hidden");
    else $("#live_match_txt").addClass("hidden");
    $("#live_match").val(is_live);
}
const changeType = function(){
    const type = $("#match_type").is(':checked') ? 0 : 1;
    if(match_type == type) return;
    match_type = type;
    let score = getScore();
    $("#validate_score").empty();
    $("#validate_score").append(`<input class="form-control" name="score" id="score" style="text-align: center; font-size:18px" onChange="changeScore()" />`);
    if(type == 0)
        $("#score").inputmask({
            mask: "99/99-99/99-99/99"
        });
    else
        $("#score").inputmask({
            mask: "99/99-99/99-99/99-99/99-99/99",
        });
    // console.log(score);
    $("#score").val(score);
    changeScore();
}
const splitSet = (score, i) => {
    try {
        return score.split("/")[i];
    } catch (error) {
    }
    return null;
}
const checkWin = (score1, score2) => {
    return (splitSet(score1, 0) > splitSet(score1, 1)) == (splitSet(score2, 0) > splitSet(score2, 1));
}
const checkSet = (score, last = false) => {
    score = score.split("/");
    if (score.length != 2) return false;
    score[0] = parseInt(score[0]);
    score[1] = parseInt(score[1]);
    if(score[0] <= 0 && score[1] <= 0) return false;
    let limit = 25;
    if (last) limit = 15;
    if (score[0] < limit && score[1] < limit) return false;
    if ((score[0] == limit || score[1] == limit) && Math.abs(score[0] - score[1]) < 2) return false;
    if ((score[0] > limit || score[1] > limit) && Math.abs(score[0] - score[1]) != 2) return false;
    return true;
}
const checkMultiSets = (score, from, to) => {
    for (let i = from; i < to; i++)
        if (!checkSet(score[i])) return false;
    return true;
}
const getShort = function(score) {
    let short_score_0 = 0;
    let short_score_1 = 0;
    let score_list = score.split("-");
    let sets = 2;
    if (match_type == 1) sets = 4;
    let valid = true;
    if(!score) valid =false;
    for (let i = 0; i < score_list.length; i++) {
        if (checkSet(score_list[i], i == sets)) {
            if (parseInt(score_list[i].split("/")[0]) > parseInt(score_list[i].split("/")[1]))
                short_score_0++;
            else if (parseInt(score_list[i].split("/")[0]) < parseInt(score_list[i].split("/")[1]))
                short_score_1++;
        }else{
            let limit = 25;
            if(i == sets) limit = 15;
            if((splitSet(score_list[i], 0) > limit || splitSet(score_list[i], 1) > limit) && Math.abs(splitSet(score_list[i], 0)-splitSet(score_list[i], 1)) > 2)
                valid = false;
        }
    }
    return {valid:valid, score:`${short_score_0}-${short_score_1}`};
}
const validateScore = function(score) {
    if (!score) return false;
    score = score.split("-");
    if (score.length < 2 || score.length > 5) return false;
    if (score.length == 2) {
        if ( checkWin(score[0], score[1]) && checkSet(score[0]) && checkSet(score[1])) return true;
    } else if (score.length == 3) {
        if (!checkMultiSets(score, 0, 2)) return false;

        if (match_type == 0) {
            if (!checkSet(score[2], true)) return false;
            if (!checkWin(score[0], score[1])) return true;
        } else {
            if (!checkSet(score[2])) return false;
            if ( checkWin(score[0], score[1]) && checkWin(score[1], score[2])) return true;
        }
    } else if (score.length == 4) {
        if (!checkMultiSets(score, 0, 4)) return false;
        if (!checkWin(score[0], score[1]) &&  checkWin(score[1], score[2]) &&  checkWin(score[2], score[3])) return true;
        if (!checkWin(score[0], score[1]) && !checkWin(score[1], score[2]) &&  checkWin(score[2], score[3])) return true;
        if ( checkWin(score[0], score[1]) && !checkWin(score[1], score[2]) && !checkWin(score[2], score[3])) return true;
    } else if (score.length == 5) {
        if (!checkMultiSets(score, 0, 4)) return false;
        if (!checkSet(score[4], true)) return false;
        if ( checkWin(score[0], score[1]) && !checkWin(score[1], score[2]) &&  checkWin(score[2], score[3]) &&  checkWin(score[3], score[4])) return true;
        if (!checkWin(score[0], score[1]) && !checkWin(score[1], score[2]) && !checkWin(score[2], score[3]) &&  checkWin(score[3], score[4])) return true;
        if (!checkWin(score[0], score[1]) &&  checkWin(score[1], score[2]) && !checkWin(score[2], score[3]) && !checkWin(score[3], score[4])) return true;
        if (!checkWin(score[0], score[1]) && !checkWin(score[1], score[2]) && !checkWin(score[2], score[3]) && !checkWin(score[3], score[4])) return true;
        if ( checkWin(score[0], score[1]) &&  checkWin(score[1], score[2]) &&  checkWin(score[2], score[3]) &&  checkWin(score[3], score[4])) return true;
        if ( checkWin(score[0], score[1]) && !checkWin(score[1], score[2]) &&  checkWin(score[2], score[3]) && !checkWin(score[3], score[4])) return true;
        if (!checkWin(score[0], score[1]) &&  checkWin(score[1], score[2]) && !checkWin(score[2], score[3]) &&  checkWin(score[3], score[4])) return true;
    }
    return false;
}
const checkLive = function(score) {
    if (score && !validateScore(score)) {
        let tmp = score.split("-");
        if (!tmp || tmp.length <= 0) return false;
        if (tmp.length == 1) return true;
        for (let i = 0; i < tmp.length; i++) {
            if (!checkSet(tmp[i], i == (match_type + 1) * 2)) return true;
        }
        if (tmp.length == 2) {
            if (match_type == 1) return true;
            else if (!checkWin(tmp[0], tmp[1])) return true;
        }
        else if (tmp.length == 3) {
            if (!checkWin(tmp[0], tmp[1]) || !checkWin[tmp[1], tmp[2]]) return true;
        }
        else if (tmp.length == 4) {
            if (checkWin(tmp[0], tmp[1]) && !checkWin[tmp[1], tmp[2]] && checkWin[tmp[2], tmp[3]]) return true;
            if (!checkWin(tmp[0], tmp[1]) && !checkWin[tmp[1], tmp[2]] && !checkWin[tmp[2], tmp[3]]) return true;
            if (!checkWin(tmp[0], tmp[1]) && checkWin[tmp[1], tmp[2]] && !checkWin[tmp[2], tmp[3]]) return true;
        }
    }
    return false;
}