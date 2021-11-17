$(document).ready(function () {
      $("#position_table tbody").sortable({
        cursor: "move",
        placeholder: "sortable-placeholder",
        helper: function (e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function (index) {
                $(this).width($originals.eq(index).width());
            });
            return $helper;
        }
    });
});
var getRow = function (index, id, title, edit, tr) {
    if (edit) {
        return `${tr ? `<tr id="position_${index}">` : ``}
                    <td id="position_title_${index}" value="${id}">
                        <input type="text" class="form-control" value="${title}" style="text-align:center">
                    </td>
                    <td>
                    <a rel="tooltip" class="btn btn-success btn-link btn-sm" data-original-title="Save" title="Save" onclick="addNewTheme(${index})">
                        <i class="material-icons">save</i>
                        <div class="ripple-container"></div>
                    </a>
                    <button rel="tooltip" type="button" class="btn btn-danger btn-link btn-sm" data-original-title="Delete" title="Delete" onclick="deleteTheme(${index})">
                        <i class="material-icons">close</i>
                        <div class="ripple-container"></div>
                    </button>
                    </td>
                    ${tr ? `</tr` : ``}`;
    }
    else {
        return `${tr ? `<tr id="position_${index}" value="${id}">` : ``}
                    <td id="position_title_${index}">${title}</td>
                    <td>
                    <a rel="tooltip" class="btn btn-success btn-link btn-sm" data-original-title="Edit" title="Edit" onclick="editTheme(${index})">
                        <i class="material-icons">edit</i>
                        <div class="ripple-container"></div>
                    </a>
                    <button rel="tooltip" type="button" class="btn btn-danger btn-link btn-sm" data-original-title="Delete" title="Delete" onclick="deleteTheme(${index})">
                        <i class="material-icons">close</i>
                        <div class="ripple-container"></div>
                    </button>
                    </td>
                ${tr ? `</tr` : ``}`;
    }
}
var addTheme = function () {
    $("#position_tbody").append(getRow(++total_index, 0, "", true, true));
}
var addNewTheme = function (index) {
    let id = $(`#position_${index}`).attr('value');
    let title = $(`#position_title_${index}`).find("input").val();
    $(`#position_${index}`).empty();
    $(`#position_${index}`).append(getRow(index, id, title, false, false));
}
var editTheme = function (index) {
    let id = $(`#position_${index}`).attr('value');
    let title = $(`#position_title_${index}`).text();
    $(`#position_${index}`).empty();
    $(`#position_${index}`).append(getRow(index, id, title, true, false));
}
var deleteTheme = function (index) {
    $(`#position_${index}`).remove();
}
var saveThemes = function () {
    if ($(`#position_tbody`).find("input").length > 0)
        return showNotification('danger', "Please complete the editing...");
    let rows = $("#position_tbody").children();
    let position = [];
    for (let i = 0; i < rows.length; i++) {
        let element = $("#position_tbody").find(rows[i]);
        let id = parseInt(element.attr('value'));
        let text = element.find('td').get(0).innerText;
        position.push({ index: i + 1, id: id, title: text });
    };
    $.ajax({
        url: 'users/positions',
        dataType: 'json',
        type: 'post',
        data: { positions: position },
        success: function (json, textStatus, jqXHR) {
            location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            location.reload();
        }
    });
}
var userAction = function (userid, type, value) {//type -> 0: active, 1:nutirition, 2:tutoring teacher, 3:sign out, 4: live video, 5: fitness, 6:tatic, 7:nutrition edit, 8:fitness edit, 9"tactic edit, 10: game, 11: show esr, 12: esr manage
    value = value ? 1 : 0;
    $.ajax({
        url: 'users/userAction',
        dataType: 'json',
        type: 'post',
        data: { userid: userid, type: type, value: value, action_type:"db" },
        success: function (json, textStatus, jqXHR) {
            let msg = "Successfully changed";
            if (type == 3) msg = "Successfully sign out.";

            showNotification("success", msg);
        },
        error: function (data, textStatus, jqXHR) {
            showNotification("error", data);
            setTimeout(() => {
                location.reload();
            }, 8000);
        }
    });
    try {
        $.ajax({
            url: 'users/userAction',
            dataType: 'json',
            type: 'post',
            data: { userid: userid, type: type, value: value, action_type:"firebase" },
            success: (json, textStatus, jqXHR) => {},
            error: (data, textStatus, jqXHR) => {}
        });
    } catch (error) {
    }
}
var allActions = function (type, enable) {
    if (confirm("Are you sure to change all user\'s role?")) {
    } else {
        $(`#chk_action_${type}`).prop("checked", !!enable)
        return;
    }

    $.ajax({
        url: 'users/allActions',
        dataType: 'json',
        type: 'post',
        data: { type, enable: enable ? 0 : 1 },
        success: function (json, textStatus, jqXHR) {
            showNotification("success", "Successfully changed");
            setTimeout(() => {
                location.reload();
            }, 1000);
        },
        error: function (data, textStatus, jqXHR) {
            location.reload();
        }
    });
}
