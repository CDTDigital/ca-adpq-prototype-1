﻿(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, shoppingCartService, loginService, inventoryService, $rootScope) {
        var model = this;
        model.provider = {};
        model.title = "Checkout";
        model.products = [];
        model.cart = {};
        model.cartTotal = 0;
        model.paymentOptions = {
            1: "California Department of General Services",
            2: "California Department of Technology" ,
            3: "California Department of Health and Human Services" ,
            4: "California Department of Education" 
        }

        model.stateOptions = {
                    AL : "Alabama",
                    AK : "Alaska",
                    AZ : "Arizona",
                    AR : "Arkansas",
                    CA : "California",
                    CO : "Colorado",
                    CT : "Connecticut",
                    DE : "Delaware",
                    DC : "District Of Columbia",
                    FL : "Florida",
                    GA : "Georgia",
                    HI : "Hawaii",
                    ID : "Idaho",
                    IL : "Illinois",
                    IN : "Indiana",
                    IA : "Iowa",
                    KS : "Kansas",
                    KY : "Kentucky",
                    LA : "Louisiana",
                    ME : "Maine",
                    MD : "Maryland",
                    MA : "Massachusetts",
                    MI : "Michigan",
                    MN : "Minnesota",
                    MS : "Mississippi",
                    MO : "Missouri",
                    MT : "Montana",
                    NE : "Nebraska",
                    NV : "Nevada",
                    NH : "New Hampshire",
                    NJ : "New Jersey",
                    NM : "New Mexico",
                    NY : "New York",
                    NC : "North Carolina",
                    ND : "North Dakota",
                    OH : "Ohio",
                    OK : "Oklahoma",
                    OR : "Oregon",
                    PA : "Pennsylvania",
                    RI : "Rhode Island",
                    SC : "South Carolina",
                    SD : "South Dakota",
                    TN : "Tennessee",
                    TX : "Texas",
                    UT : "Utah",
                    VT : "Vermont",
                    VA : "Virginia",
                    WA : "Washington",
                    WV : "West Virginia",
                    WI : "Wisconsin",
                    WY : "Wyoming"

        }

        if ($rootScope.orderInfo != null) {
            model.name = $rootScope.orderInfo.name;
            model.department = $rootScope.orderInfo.department;
            model.phoneNumber = $rootScope.orderInfo.phoneNumber;
            model.emailAddress = $rootScope.orderInfo.emailAddress;
            model.address1 = $rootScope.orderInfo.address1;
            model.address2 = $rootScope.orderInfo.address2;
            model.address3 = $rootScope.orderInfo.address3;
            model.city = $rootScope.orderInfo.city;
            model.state = $rootScope.orderInfo.state;
            model.postalCode = $rootScope.orderInfo.postalCode;
            model.paymentAccount = $rootScope.orderInfo.paymentAccount;

        } 
        
        else {
            model.name = "Joe";
            model.department = "Technology";
            model.phoneNumber = "301-123-4567";
            model.emailAddress = "joe@something.com";
            model.address1 = "1000 Main Street";
            model.address2 = "Apt - 303";
            model.address3 = "";
            model.city = "Columbia";
            model.state = "MD";
            model.postalCode = "21470";
            model.paymentAccount = 2;
        }


        model.getActiveCart = function () {
            shoppingCartService.getActiveCart();
        };

        model.getActiveCart();


        model.getProduct = function (productId) {
            inventoryService.getProduct(productId);
        };

        $scope.backToCart = function () {
            $location.path("user/cart");
        }

        $scope.continueCheckout = function () {
            $rootScope.orderInfo = {};
            $rootScope.orderInfo = {
                name: model.name,
                department: model.department,
                phoneNumber: model.phoneNumber,
                emailAddress: model.emailAddress,
                address1: model.address1,
                address2: model.address2,
                address3: model.address3,
                city: model.city,
                state: model.state,
                postalCode: model.postalCode,
                paymentAccount: model.paymentAccount
            };
            $location.path("user/revieworder");
        }

        $scope.showDivider = function () {
            return model.cartItems.length > 1;
        }


        messageService.subscribe('getActiveCartSuccess', function (response) {
            model.cart = response;
            model.cartItems = model.cart.Items;
            for (var idx = 0; idx < model.cart.Items.length; ++idx) {
                var product = model.cart.Items[idx];
                model.getProduct(product.ProductId);
            }

            for (var idx = 0; idx < model.cartItems.length; ++idx) {
                var item = model.cartItems[idx];
                model.cartTotal += item.Price * item.Quantity;
            }
        })

        messageService.subscribe('getActiveCartFailure', function (response) {
            model.cart = [];
        })

        messageService.subscribe('getProductSuccess', function (response) {
            model.products.push(response);
        })

        messageService.subscribe('getProductFailure', function (response) {
            model.product = [];
        })


    };

    module.component("checkout", {
        templateUrl: "app/areas/authorizeduser/checkout/checkout.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "shoppingCartService", "loginService", "inventoryService", "$rootScope", controller]

    });
}())