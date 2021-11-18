$(document).ready(function () {
    $("#categories").sortable({
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
    });
    $("#products").sortable({
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
    });

    $(".chk_cat_delete").on('change', onCatCheck);
    $("#btnCatDelete").on('click', deleteCategory);
    $("#btnCatSave").on('click', saveCategory);
    $("#btnCatAdd").on('click', addCategory);
    $(".btn_edit_cat").on('click', editCategory);

    $(".delete_image").on('click', deleteCatImage);
    $(".image_selector").on('change', selectCatImage);

    $(".product-item").on('click', clickProduct);
    $("#btnProdDelete").on('click', deleteProduct);
    $("#btnProdSave").on('click', saveProduct);
    $("#btnProdAdd").on('click', addProduct);
});


function deleteCategory(e) {
    var ids = [];
    $(".chk_cat_delete:checked").each(function () {
        ids.push(this.value);
    });
    if (ids.length <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Pelase choose the categoris',
        })
        return;
    }
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        preConfirm: () => {
            $.ajax({
                url: url_delete,
                dataType: 'json',
                type: 'delete',
                data: { ids, type: 'category' },
                success: function (json, textStatus, jqXHR) {
                    location.reload();
                },
                error: function (data, textStatus, jqXHR) {
                    location.reload();
                }
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
}
function saveCategory(e) {
    let rows = $("#categories").children('tr');
    let orders = [];
    rows?.each(function (i) {
        let id = parseInt($(this).attr('value'));
        orders.push({ index: i + 1, id: id });
    });
    $.ajax({
        url: url_update,
        dataType: 'json',
        type: 'put',
        data: { orders, type: 'category' },
        success: function (json, textStatus, jqXHR) {
            location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            location.reload();
        }
    });
}
function editCategory(e) {
    var data = JSON.parse($(this).attr('value'));
    $(".preview").attr('src', data.image);
    $("#cat_id").val(data.id);
    $("#cat_name").val(data.name);
    $("#cat_title").val(data.title);
    $("#cat_subtitle").val(data.subtitle);
    $("#cat_cols").val(data.cols);
    $("#cat_select_count").val(data.select_count);
    $("#cat_order").val(data.order);
    updatePreview(true);
    $("#modal_add_category").modal('show');
}
var default_image = 'https://picsum.photos/id/58/200/300';

function deleteCatImage(e) {
    updatePreview(false);
}
function updatePreview(exists) {
    if (exists) {
        $(".select_image").text("Update");
        $(".delete_image").removeClass('hidden');
    } else {
        $(".select_image").text("Select");
        $(".delete_image").addClass('hidden');
        $(".preview").attr('src', default_image);
        $("#cat_image").val('');
    }
}
function addCategory(e) {
    $("#cat_id").val("");
    updatePreview(false);
    $("#modal_add_category").modal('show');
}
function selectCatImage(e) {
    try {
        const src = URL.createObjectURL(this.files[0]);
        $(".preview").attr('src', src);
        updatePreview(true);
    } catch (error) {
        updatePreview(false);
    }
}
function onCatCheck(e) {
    $("#btnCatDelete").prop('disabled', $(".chk_cat_delete:checked").length <= 0);
}

function clickProduct(e) {
    if ($(this).hasClass('selected-item')) {
        $(this).removeClass('selected-item');
    } else {
        $(this).addClass('selected-item')
    }
    $("#btnProdDelete").prop('disabled', $("#products > .selected-item").length <= 0);
}
function deleteProduct(e) {
    var ids = [];
    $("#products > .selected-item").each(function () {
        ids.push($(this).attr('value'));
    });
    if (ids.length <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Pelase choose the categoris',
        })
        return;
    }
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        preConfirm: () => {
            $.ajax({
                url: url_delete,
                dataType: 'json',
                type: 'delete',
                data: { ids, type: 'product' },
                success: function (json, textStatus, jqXHR) {
                    location.reload();
                },
                error: function (data, textStatus, jqXHR) {
                    location.reload();
                }
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
}
function saveProduct(e) {
    let rows = $("#products").children('div');
    let orders = [];
    rows?.each(function (i) {
        let id = parseInt($(this).attr('value'));
        orders.push({ index: i + 1, id: id });
    });
    $.ajax({
        url: url_update,
        dataType: 'json',
        type: 'put',
        data: { orders, type: "product" },
        success: function (json, textStatus, jqXHR) {
            location.reload();
        },
        error: function (data, textStatus, jqXHR) {
            location.reload();
        }
    });
}
function addProduct(e) {
    $("#prod_id").val("");
    updatePreview(false);
    $("#modal_add_product").modal('show');
}