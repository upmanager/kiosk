$(document).ready(function () {
    changePage();
});
const changePage = function (table) {
    var info = { start: 0, end: comments_count };
    if (table) {
        info = table.page.info();
    }
    setTimeout(() => {
        var ids = [];
        for (let i = info.start; i < info.end; i++) {
            var id = $(`#comments_id_${i}`).val();
            if(id > 0) ids.push(id);
        }
        getAgree(ids);
    }, 100);
}
const getAgree = async (ids) => {
    console.log(ids);
    $.ajax({
        url: `${SERVER_HOST}/firebase/getAgree`,
        data: {type:1, ids},
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
