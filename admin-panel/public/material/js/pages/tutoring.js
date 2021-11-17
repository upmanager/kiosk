let page_changed = false;
$(window).bind('beforeunload', function (event) {
    if (page_changed) {
        return '';
    }
});
$(document).ready(function () {
    $("#Tutoring_category_table tbody").sortable({
        cursor: "move",
        placeholder: "sortable-placeholder",
        helper: function (e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function (index) {
                $(this).width($originals.eq(index).width());
            });
            return $helper;
        },
        update: function (event, ui) {
            page_changed = true;
        }
    });

    $("#Tutoring_place_table tbody").sortable({
        cursor: "move",
        placeholder: "sortable-placeholder",
        helper: function (e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function (index) {
                $(this).width($originals.eq(index).width());
            });
            return $helper;
        },
        update: function (event, ui) {
            page_changed = true;
        }
    });
});

var getRow = function (index, id, title, date, edit, tr) {
    page_changed = true;
    if (id == 0) {
        date = "Current";
    }
    if (edit) {
        return `${tr ? `<tr id="category_tr_${index}">` : ``}
                    <td id="category_${index}" value="${id}">
                        <input type="text" class="form-control" value="${title}" style="text-align:center">
                    </td>
                    <td id="date_${index}"> ${date} </td>
                    <td>
                    <a rel="tooltip" class="btn btn-success btn-link btn-sm" data-original-title="Save" title="Save" onclick="addNewCategory(${index})">
                        <i class="material-icons">save</i>
                        <div class="ripple-container"></div>
                    </a>
                    <button rel="tooltip" type="button" class="btn btn-danger btn-link btn-sm" data-original-title="Delete" title="Delete" onclick="deleteCategory(${index})">
                        <i class="material-icons">close</i>
                        <div class="ripple-container"></div>
                    </button>
                    </td>
                    ${tr ? `</tr` : ``}`;
    }
    else {
        return `${tr ? `<tr id="category_tr_${index}" value="${id}">` : ``}
                    <td id="category_${index}">${title}</td>
                    <td id="date_${index}"> ${date} </td>
                    <td>
                    <a rel="tooltip" class="btn btn-success btn-link btn-sm" data-original-title="Edit" title="Edit" onclick="editCategory(${index})">
                        <i class="material-icons">edit</i>
                        <div class="ripple-container"></div>
                    </a>
                    <button rel="tooltip" type="button" class="btn btn-danger btn-link btn-sm" data-original-title="Delete" title="Delete" onclick="deleteCategory(${index})">
                        <i class="material-icons">close</i>
                        <div class="ripple-container"></div>
                    </button>
                    </td>
                ${tr ? `</tr` : ``}`;
    }
}
var addCategory = function () {
    $("#Category_tbody").append(getRow(++total_index, 0, '', '', true, true));
}
var addNewCategory = function (index) {
    let id = $(`#category_tr_${index}`).attr('value');
    let title = $(`#category_${index}`).find("input").val();
    let date = $(`#date_${index}`).text();
    $(`#category_tr_${index}`).empty();
    $(`#category_tr_${index}`).append(getRow(index, id, title, date, false, false));
}
var editCategory = function (index) {
    let id = $(`#category_tr_${index}`).attr('value');
    let title = $(`#category_${index}`).text();
    let date = $(`#date_${index}`).text();
    $(`#category_tr_${index}`).empty();
    $(`#category_tr_${index}`).append(getRow(index, id, title, date, true, false));
}
var deleteCategory = function (index) {
    $(`#category_tr_${index}`).remove();
}
var saveCategories = function () {
    if ($(`#Category_tbody`).find("input").length > 0)
        return showNotification('danger', "Please complete the editing...");
    let rows = $("#Category_tbody").children();
    let categories = [];
    for (let i = 0; i < rows.length; i++) {
        let element = $("#Category_tbody").find(rows[i]);
        let id = parseInt(element.attr('value'));
        let text = element.find('td').get(0).innerText;
        categories.push({ index: i + 1, id: id, title: text });
    };
    $.ajax({
        url: 'tutoring/categories',
        dataType: 'json',
        type: 'post',
        data: { categories: categories },
        success: function (json, textStatus, jqXHR) {
            page_changed = false;
            location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            page_changed = false;
            location.reload();
        }
    });
}


//places-------------------------------------


var getPlaceRow = function (index, id, title, date, edit, tr) {
    page_changed = true;
    if (id == 0) {
        date = "Current";
    }
    if (edit) {
        return `${tr ? `<tr id="place_tr_${index}">` : ``}
                    <td id="place_${index}" value="${id}">
                        <input type="text" class="form-control" value="${title}" style="text-align:center">
                    </td>
                    <td id="place_date_${index}"> ${date} </td>
                    <td>
                    <a rel="tooltip" class="btn btn-success btn-link btn-sm" data-original-title="Save" title="Save" onclick="addNewPlace(${index})">
                        <i class="material-icons">save</i>
                        <div class="ripple-container"></div>
                    </a>
                    <button rel="tooltip" type="button" class="btn btn-danger btn-link btn-sm" data-original-title="Delete" title="Delete" onclick="deletePlace(${index})">
                        <i class="material-icons">close</i>
                        <div class="ripple-container"></div>
                    </button>
                    </td>
                    ${tr ? `</tr` : ``}`;
    }
    else {
        return `${tr ? `<tr id="place_tr_${index}" value="${id}">` : ``}
                    <td id="place_${index}">${title}</td>
                    <td id="place_date_${index}"> ${date} </td>
                    <td>
                    <a rel="tooltip" class="btn btn-success btn-link btn-sm" data-original-title="Edit" title="Edit" onclick="editPlace(${index})">
                        <i class="material-icons">edit</i>
                        <div class="ripple-container"></div>
                    </a>
                    <button rel="tooltip" type="button" class="btn btn-danger btn-link btn-sm" data-original-title="Delete" title="Delete" onclick="deletePlace(${index})">
                        <i class="material-icons">close</i>
                        <div class="ripple-container"></div>
                    </button>
                    </td>
                ${tr ? `</tr` : ``}`;
    }
}
var addPlace = function () {
    $("#place_tbody").append(getPlaceRow(++total_index, 0, '', '', true, true));
}
var addNewPlace = function (index) {
    let id = $(`#place_tr_${index}`).attr('value');
    let title = $(`#place_${index}`).find("input").val();
    let date = $(`#date_${index}`).text();
    $(`#place_tr_${index}`).empty();
    $(`#place_tr_${index}`).append(getPlaceRow(index, id, title, date, false, false));
}
var editPlace = function (index) {
    let id = $(`#place_tr_${index}`).attr('value');
    let title = $(`#place_${index}`).text();
    let date = $(`#date_${index}`).text();
    $(`#place_tr_${index}`).empty();
    $(`#place_tr_${index}`).append(getPlaceRow(index, id, title, date, true, false));
}
var deletePlace = function (index) {
    $(`#place_tr_${index}`).remove();
}
var savePlaces = function () {
    if ($(`#place_tbody`).find("input").length > 0)
        return showNotification('danger', "Please complete the editing...");
    let rows = $("#place_tbody").children();
    let places = [];
    for (let i = 0; i < rows.length; i++) {
        let element = $("#place_tbody").find(rows[i]);
        let id = parseInt(element.attr('value'));
        let text = element.find('td').get(0).innerText;
        places.push({ index: i + 1, id: id, title: text });
    };
    console.log(places);
    $.ajax({
        url: 'tutoring/places',
        dataType: 'json',
        type: 'post',
        data: { places: places },
        success: function (json, textStatus, jqXHR) {
            page_changed = false;
            location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            page_changed = false;
            location.reload();
        }
    });
}