(function () {
    "use strict";

    angular.module('app.services.alertservice', [])
        .factory('alertService', alertService);

    alertService.$inject = ["toastr"];

    function alertService(toastr) {
        return function (subtitle, title, toast_color, timeout) {
            toastr.clear();
            if(subtitle != null) {
                toastr.success(subtitle, title, {
                    closeButton: true,
                    iconClass: toast_color,
                    timeOut: timeout,
                    allowHtml: true
                });
            }
        };
    }

})();