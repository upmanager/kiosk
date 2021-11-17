var socket = null;
$(document).ready(function () {
    try {
        connectSocket();
        PlayLiveVideo();
    } catch (error) {
        console.log("init error", error);
    }
    // if (liveMatches.state == 1) {
    //     let start_stream_timer = setInterval(() => {
    //         if (liveMatches.state == 2) clearInterval(start_stream_timer);
    //         PlayLiveVideo();
    //     }, 2000);
    // }
    $("#msg_input").keyup(function (e) {
        if (e.keyCode == 13)
            sendMessage($("#msg_input").val());
    });
});
const connectSocket = () => {
    socket = io.connect(`${app_url}:3333`);
    socket.on('connect', function () {
        console.log("connected");
    });
    socket.on('error', function (e) {
        showNotification('error', "Can\'t connect live streaming server")
    });
}
function PlayLiveVideo() {
    if (liveMatches.state != 1) return;
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
        const url = `${STREAM_SERVER}/live/${liveMatches.roomid}.flv`;
        np.start(url);
    });

    // var np = new Module.NodePlayer();
    // np.on('start', () => {
    //     console.log("NodePlayer on start");
    // });
    // np.on('close', () => {
    //     console.log('NodePlayer on close');
    // });
    // np.on('error', (err) => {
    //     console.log('NodePlayer on error', err);
    // });
    // np.setPlayView('video');
    // np.setScaleMode(1);
    // np.enableVideo(true);
    // np.enableAudio(true);
    // np.start(`${STREAM_SERVER}/live/${liveMatches.roomid}.flv`);
}
function emitSocket(event, data) {
    if (!socket.connected)
        return showNotification('error', "Can\'t connect live streaming server");

    socket.emit(event, data);
}
function sendMessage(message, isdelete = false) {
    const data = { roomid: liveMatches.roomid, message, userid, isdelete };
    console.log(data);
    emitSocket("send-message", data);
    setTimeout(() => {
        location.reload();
    }, 100);
}
function sendHeart() {
    emitSocket("send-heart", liveMatches);
}
function deleteMsg(url, index) {
    $.ajax({
        url: `${url}`,
        dataType: 'json',
        type: 'post',
        data: { index, id: liveMatches.id },
        success: function (json, textStatus, jqXHR) {
            sendMessage('', true);
        },
        error: function (data, textStatus, jqXHR) {
        }
    });
}
function closeLive() {
    if (!confirm('Are you sure you want to close this live?')) return;
    emitSocket('finish-live-stream', liveMatches);
    showNotification('success', `Successfuly closed the live video. <br/> room id: ${liveMatches.roomid}`);
}
function deleteLive(url, redirect) {
    if (!confirm('Are you sure you want to delete this live?')) return;
    emitSocket('finish-live-stream', liveMatches);
    $.ajax({
        url: `${url}`,
        dataType: 'json',
        type: 'delete',
        success: function (json, textStatus, jqXHR) {
            showNotification('success', `Successfuly deleted the live video. <br/> room id: ${liveMatches.roomid}`);
            setTimeout(() => {
                location.href = redirect;
            }, 1000);
        },
        error: function (data, textStatus, jqXHR) {
        }
    });
}
function visibleVideo(url, visiblity) {
    $.ajax({
        url: `${url}`,
        dataType: 'json',
        type: 'post',
        data: { id: liveMatches.id, visiblity },
        success: function (json, textStatus, jqXHR) {
            emitSocket('refresh-video-list', {});
            setTimeout(() => {
                location.reload();
            }, 1000);
        },
        error: function (data, textStatus, jqXHR) {
        }
    });
}

function videoLink() {
    var url = prompt("Please enter video link:", "");
    if (url == null || url == "") return;
    else if(checkYoutubeLink(url) == false) return showNotification("warning", "Please input valide url");
    $("#vide_link_path").val(url);
    $("#live_video_form").submit();
}
