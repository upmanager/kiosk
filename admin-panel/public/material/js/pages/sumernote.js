$(document).ready(function() {
    $('#content').summernote({
        height: 350,
        spellCheck: false,
        popover: {
            image: [
                ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['remove', ['removeMedia']]
            ],
            link: [
                ['link', ['linkDialogShow', 'unlink']]
            ],
            table: [
                ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
            ],
            air: [
                ['color', ['color']],
                ['font', ['bold', 'underline', 'clear']],
                ['para', ['ul', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']]
            ]
        },
        toolbar: [
            ['style', ['style', 'bold', 'italic', 'underline', 'clear', 'forecolor', 'backcolor']],
            ['font', ['strikethrough', 'superscript', 'subscript', 'fontname', 'fontsize', 'fontsizeunit']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
            ['table', ['table', 'hr']],
            ['insert', ['link', 'picture']],
            // ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'undo', 'redo', 'help']],
        ],
    });
    $("#content").summernote("code", "");
});