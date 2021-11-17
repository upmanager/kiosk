$(document).ready(function () {
    changePage();
});
const allowNews = function (id, value) {
    $.ajax({
        url: 'news/allow',
        data: {
            id: id,
            value: (value ? 0 : 1)
        },
        method: 'post',
        success: function (result) { },
        error: function (xhr, status, error) {
            location.reload();
        }
    });
}
const saveDate = function (url, id) {
    const date_input = $(`#date_${id}`);
    const date = date_input.val();
    if (!Date.parse(date)) {
        date_input.focus();
        date_input.select();
        return;
    }

    $.ajax({
        url: url,
        data: {
            id: id,
            date: date
        },
        method: 'post',
        success: function (result) { },
        error: function (xhr, status, error) {
            location.reload();
        }
    });
}
const changePage = function (table) {
    var info = { start: 0, end: news_count };
    if (table) {
        info = table.page.info();
    }
    setTimeout(() => {
        var ids = [];
        for (let i = info.start; i < info.end; i++) {
            var id = $(`#news_id_${i}`).val();
            if(id > 0) ids.push(id);
        }
        getAgree(ids);
    }, 100);
}
const getAgree = async (ids) => {
    $.ajax({
        url: `${SERVER_HOST}/firebase/getAgree`,
        data: {type:0, ids},
        method: 'post',
        success: function (result) {
            result.data.forEach(ele => {
            $(`#agree_${ele.id}`).text(`${ele.agree > 0 ? ele.agree : 0}/${ele.disagree > 0 ? ele.disagree : 0}`);
        });
        },
        error: function (xhr, status, error) {
        }
    });
}
