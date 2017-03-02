﻿(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function (messageService, $http, loginService) {
        var model = this;
        model.showModal = !loginService.hasAuthenticationCookie();

        model.loginInfo = {
            username: null,
            password: null
        };


        model.okClick = function () {
            model.loading = true;
            var user = model.loginInfo.username;
            var pw = model.loginInfo.password;
            loginService.login(user, pw);
        }

        messageService.subscribe('loginSuccess', function (response) {
            model.showModal = false;
            model.loginInfo.username = '';
            model.loginInfo.password = '';
        });

        messageService.subscribe('logoutSuccess', function (response) {
            model.showModal = true;
            setTimeout(function () { $('#username').focus(); }, 250);
        });
    };

    module.component('modal', {
        templateUrl: 'app/views/shared/components/modal/modal.component.html',
        controllerAs: 'model',
        controller: ['messageService', '$http', 'loginService', controller]
    });

}())