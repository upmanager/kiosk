/*!
 * Bootstrap Fileselect v3.0.0
 * (c) 2016-2020 Jonathan Nessier, Neoflow
 * Licensed under MIT (https://github.com/Neoflow/Bootstrap-Fileselect/blob/master/LICENSE)
 */
(function (window, $) {

    const Fileselect = function (fileInput, options) {
        this.$fileInput = $(fileInput);
        this.options = options;
        this.userLanguage = 'en';
        this.$fileselect = $(this);
        this.metadata = this.$fileInput.data();
        this.$inputGroup = $('<div>').addClass('custom-file');
        this.$labelInput = $('<label>').addClass('custom-file-label');
        this.translations = {
            'en': {
                'chooseFile': 'Choose file...',
                'chooseFiles': 'Choose files...',
                'browse': 'Browse',
                'rules': {
                    'numberOfFiles': 'The number of uploadable files is limited to [num] file(s)',
                    'fileExtensions': 'The files are restricted to the following file extensions: [ext]',
                    'fileSize': 'The file size is limited to [size]',
                }
            },
        };
        this.init();
    };
    Fileselect.prototype = {
        defaults: {
            restyling: true,
            allowedFileSize: false,
            allowedFileExtensions: false,
            allowedNumberOfFiles: false,
            language: false,
            translations: {},
            validationCallback: function (message, instance) {
                alert(message);
            }
        },
        init: function () {
            this.config = this.loadConfig();
            this.translations = this.loadTranslation();

            if (this.config.restyling) {
                this.$fileInput
                    .addClass('custom-file-input')
                    .before(this.$inputGroup);

                this.$inputGroup
                    .append(this.$fileInput, this.$labelInput);

                this.$labelInput.attr('data-browse', this.translations.browse);

                if (this.$fileInput[0].hasAttribute("multiple")) {
                    this.$labelInput.text(this.translations.chooseFiles);
                } else {
                    this.$labelInput.text(this.translations.chooseFile);
                }
            }

            this.$fileInput.on('change', $.proxy(this.changeEvent, this));

            return $(this);
        },
        changeEvent: function (e) {
            this.$fileInput.trigger('bs.fs.change', [this]);

            const files = this.$fileInput[0].files,
                label = $.map(files, function (file) {
                    return file.name;
                }).join(', ');

            let result = false;

            if (this.validateNumberOfFiles(files) && this.valiateFileExtensions(files) && this.validateFileSize(files)) {
                this.$labelInput.text(label);
                result = true;
            } else {
                this.$fileInput.val(null);
            }

            this.$fileInput.trigger('bs.fs.changed', [this]);

            return result;
        },
        loadConfig: function () {
            let config = $.extend({}, this.defaults, this.options, this.metadata);
            if (typeof config.allowedFileExtensions === 'string') {
                config.allowedFileExtensions = config.allowedFileExtensions.split(',');
            }
            return config;
        },
        loadTranslation: function () {
            $.each(this.config.translations, $.proxy(function (language, translations) {
                this.translations[language] = translations
            }, this));

            let userLanguage = (this.config.language || navigator.language || navigator.userLanguage).substring(0, 2).toLowerCase(),
                translatedLanguages = $.map(this.translations, function (translations, key) {
                    return key;
                });

            if ($.inArray(userLanguage, translatedLanguages) >= 0) {
                this.userLanguage = userLanguage;
            } else {
                console.info('User language (' + userLanguage + ') has no translation. Switched to default language (' + this.userLanguage + ').')
            }

            return this.translations[this.userLanguage];
        },
        validateNumberOfFiles: function (files) {
            this.$fileInput
                .trigger('bs.fs.validate', [this])
                .trigger('bs.fs.number-of-files-validate', [this]);

            let result = true;
            if (this.config.allowedNumberOfFiles && files.length > parseInt(this.config.allowedNumberOfFiles)) {
                this.config.validationCallback(this.translations.rules.numberOfFiles.replace('[num]', this.config.allowedNumberOfFiles), 'allowedNumberOfFiles', this);
                result = false;
            }

            this.$fileInput
                .trigger('bs.fs.validated', [this])
                .trigger('bs.fs.number-of-files-validated', [this]);

            return result;
        },
        valiateFileExtensions: function (files) {
            this.$fileInput
                .trigger('bs.fs.validate', [this])
                .trigger('bs.fs.file-extensions-validate', [this]);

            let result = true;
            if (this.config.allowedFileExtensions) {
                $.each(files, $.proxy(function (i, file) {
                    var fileExtension = file.name.replace(/^.*\./, '').toLowerCase();
                    if ($.inArray(fileExtension, this.config.allowedFileExtensions) === -1) {
                        this.config.validationCallback(this.translations.rules.fileExtensions.replace('[ext]', this.config.allowedFileExtensions.join(', ')), 'allowedFileExtensions', this);
                        result = false;
                        return;
                    }
                }, this));
            }

            this.$fileInput
                .trigger('bs.fs.validated', [this])
                .trigger('bs.fs.file-extensions-validated', [this]);

            return result;
        },
        validateFileSize: function (files) {
            this.$fileInput
                .trigger('bs.fs.validate', [this])
                .trigger('bs.fs.file-size-validate', [this]);

            let result = true;
            if (this.config.allowedFileSize) {
                $.each(files, $.proxy(function (i, file) {
                    if (file.size > this.config.allowedFileSize) {
                        this.config.validationCallback(this.translations.rules.fileSize.replace('[size]', Math.round(this.config.allowedFileSize / 1024 / 1024) + 'MB'), 'allowedFileSize', this);
                        result = false;
                        return;
                    }
                }, this));
            }

            this.$fileInput
                .trigger('bs.fs.validated', [this])
                .trigger('bs.fs.file-size-validated', [this]);

            return result;
        },

    };

    Fileselect.defaults = Fileselect.prototype.defaults;

    $.fn.fileselect = function (options) {
        this.each(function () {
            new Fileselect(this, options);
        });
        return this;
    };

    window.Fileselect = Fileselect;
})(window, jQuery);
