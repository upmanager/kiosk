var socket = null;
var isFullscreen = false;
$(document).ready(function () {
    if (request_password) {
        $("#live_password").modal("show");
    }
    connectSocket();
    if (currentState != 1) return;
    NodePlayer.load(() => {
        var np = new NodePlayer();
        np.on('start', () => {
            console.log("NodePlayer on start");
        });
        np.on('close', () => {
            console.log('NodePlayer on close');
        });
        np.on('error', (err) => {
            console.log('NodePlayer on error', err);
        });
        np.setView('video');
        np.setScaleMode(1);
        const url = `${STREAM_SERVER}/live/${currentRoomid}.flv`;
        np.start(url);
    });
    renderChatList(messages);
});
const chatListScrollBottom = () => {
    $('#chat_list').scrollTop($('#chat_list')[0].scrollHeight);
}
const fullscreen = () => {
    isFullscreen = !isFullscreen;
    if (isFullscreen) {
        $("body").css({ "overflow-y": "hidden" });
        $("#video").addClass("fullscreen");
        $("#canvas_overlay").addClass("fullscreen");
        $("#video").css({ "border-radius": "0" });
    } else {
        $("body").css({ "overflow-y": "scroll" });
        $("#video").removeClass("fullscreen");
        $("#canvas_overlay").removeClass("fullscreen");
        $("#video").css({ "border-radius": "12px" });
    }
}
const copy = (copyText) => {
    var textarea = document.createElement("textarea");
    textarea.textContent = copyText;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    $.notify("copied link to clipboard", "info");
}
var date2str = function (input) {
    var d = new Date(input);
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = d.getDate() + " " + month[d.getMonth()] + ", " + d.getFullYear();
    var time = d.toLocaleTimeString().toLowerCase().replace(/([\d]+:[\d]+):[\d]+(\s\w+)/g, "$1$2");
    return (date + " " + time);
};

const renderList = (data) => {
    var html = '';
    data.forEach((item, index) => {
        const link = `${live_url}?playvideo=${item.id}`;
        const scores = (item.match?.short_score || "").split("-") || ['0', '0'];
        const videoPath = getVideoPath(item.filePath);
        const image = (item.state != 2 ? `material/img/live_match1.png` : `uploads/services_list/live_match.png`);
        const security = !!item.password;

        html += `<div class="col-lg-3 col-md-4 col-sm-6" style="padding:15px;" onclick="location.href='${link}'">
                    <div class="card shadow" style="height: 100%;">
                        <div style="position: relative;">
                        ${videoPath ? `<video class="shadow-lg" style="width: 100%; height:100%; max-height:250px"><source src="${videoPath}" type="video/mp4"> Your browser does not support HTML video.</video>`
                : `<img src="${image}"  alt="preview" style="width:100%; max-height:300px; object-fit:cover"><div class="overlay">
                                   ${security ? `<img src="material/img/lock.png"  alt="lock" class="position-absolute top-50 start-50 translate-middle" style="width:60px; height:60px;">` : ''}
                                </div>`
            }
                        </div>
                        <div class="card-body">
                            ${parseInt(item.matchid) > 0 ?
                `<div class="row g-0">
                                    <div class="col-4 g-0">
                                        <img src="${item.match?.team_a?.photo}" class="team-logo" alt="">
                                        <br />
                                        <p>${item.match?.team_a?.name}</p>
                                    </div>
                                    <div class="col-4 g-0">
                                        <div class="score-board">
                                            <h3>${scores[0]}</h3>
                                            <h3>&nbsp;:&nbsp;</h3>
                                            <h3>${scores[1]}</h3>
                                        </div>
                                        <p class="card-text">${item.match?.score}</p>
                                    </div>
                                    <div class="col-4 g-0">
                                        <img src="${item?.match?.team_b?.photo}" class="team-logo" alt="">
                                        <br />
                                        <p>${item?.match?.team_b?.name}</p>
                                    </div>
                                </div>`
                :
                `<h5 class="card-text" style="white-space: pre-line">${item.matchid}</h5>`
            }
                            <p class="card-text" style="text-align: right">
                                <small class="text-muted">${date2str(item.created_at)}</small>
                            </p>
                        </div>
                    </div>
                </div>`;
    });
    $("#live_list").empty();
    $("#live_list").append(html);
}
const renderChatList = (data) => {
    var html = '';
    data.forEach(item => {
        html += `<div class="incoming_msg">
                    <div class="incoming_msg_img" style="width:auto">
                        <img src="${item?.user?.avatar}" alt="photo">
                    </div>
                    <div class="received_msg" style="width: calc(99% - 80px);">
                        <div class="received_withd_msg">
                            <p>
                                <span>${item?.user?.nickname}</span><br>
                                ${item?.message}
                                <br>
                            </p>
                        </div>
                    </div>
                </div>`;
    });
    $("#chat_list").empty();
    $("#chat_list").append(html);
    chatListScrollBottom();
}
const getVideoPath = (url) => {
    if (!url || url == "error") return null;
    if (/https:\/\/|http:\/\//i.test(url)) {
        return url;
    } else {
        return `${STREAM_SERVER}${url}`;
    }
}
const listLiveStream = () => {
    $.ajax({
        url: `${live_url}/list`,
        dataType: 'json',
        type: 'get',
        success: function (json, textStatus, jqXHR) {
            renderList(json.liveMatches);
        },
        error: function (data, textStatus, jqXHR) {
            console.error(data, textStatus, jqXHR);
        }
    });
}
const connectSocket = () => {
    socket = io.connect(`${app_url}:3333`);
    socket.on('connect', function () {
        console.log("connected");
    });
    socket.on('error', function (e) {
        socket.emit("leave-room", { userid: Math.random(), roomid: currentRoomid });
        $.notify("Can\'t connect live streaming server", "error");
    });
    socket.on('list-live-stream', listLiveStream);
    socket.on('send-message', (d) => {
        $.ajax({
            url: `${live_url}/chatlist/${currentRoomid}`,
            dataType: 'json',
            type: 'get',
            success: function (json, textStatus, jqXHR) {
                renderChatList(json.messages);
            },
            error: function (data, textStatus, jqXHR) {
                console.error("get error", data, textStatus, jqXHR);
            }
        });
    });
    socket.emit("list-live-stream");
    socket.emit("join-room", { userid: Math.random(), roomid: currentRoomid });
    listLiveStream();
}
