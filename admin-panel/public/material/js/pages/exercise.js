$(document).ready(function() {
    $("#themes_table tbody").sortable({
      cursor: "move",
      placeholder: "sortable-placeholder",
      helper: function(e, tr)
      {
        var $originals = tr.children();
        var $helper = tr.clone();
        $helper.children().each(function(index)
        {
        $(this).width($originals.eq(index).width());
        });
        return $helper;
      }
    });
});
var getRow = function(index, id, title, edit, tr){
    if(edit){
        return `${tr ? `<tr id="themes_${index}">` : ``}
                    <td id="themes_title_${index}" value="${id}">
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
    else{
        return `${tr ? `<tr id="themes_${index}" value="${id}">` : ``}
                    <td id="themes_title_${index}">${title}</td>
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
var addTheme = function(){
    $("#themes_tbody").append( getRow(++total_index, 0, "", true, true) );
}
var addNewTheme = function(index){
    let id = $(`#themes_${index}`).attr('value');
    let title = $(`#themes_title_${index}`).find("input").val();
    $(`#themes_${index}`).empty();
    $(`#themes_${index}`).append(getRow(index, id, title, false, false));
}
var editTheme = function(index){
    let id = $(`#themes_${index}`).attr('value');
    let title = $(`#themes_title_${index}`).text();
    $(`#themes_${index}`).empty();
    $(`#themes_${index}`).append(getRow(index, id, title, true, false));
}
var deleteTheme = function(index){
    $(`#themes_${index}`).remove();
}
var saveThemes = function(){
    if($(`#themes_tbody`).find("input").length > 0)
        return showNotification('danger', "Please complete the editing...");
    let rows = $("#themes_tbody").children();
    let themes = [];
    for (let i = 0; i < rows.length; i++) {
        let element = $("#themes_tbody").find(rows[i]);
        let id = parseInt(element.attr('value'));
        let text = element.find('td').get(0).innerText;
        themes.push({index:i+1, id:id, title:text});
    };

    $.ajax({
        url: 'exercise/themes',
        dataType: 'json',
        type: 'post',
        data: {themes:themes},
        success: function (json, textStatus, jqXHR) {
            location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            location.reload();
        }
    });
}