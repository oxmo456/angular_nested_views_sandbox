var routeA = {
    name: "A",
    path: "a",
    parameters: {

    }
}



var ROUTING = {
    name: "home",
    path: "/",
    parameters: {
        controller: function () {

        },
        templateURL: "templates/home/home.html",
        headerTemplateURL: "templates/common/header.html"
    },
    subRoutes: [
        {
            name: "contacts",
            path: "contacts",
            parameters: {
                templateURL: "templates/contacts/all.html"
            },
            subRoutes: [
                {
                    name: "contact details",
                    path: ":id",
                    parameters: {
                        redirectTo: function () {
                            //check if id is valid, else redirect to
                            //:id can be a name too...
                        },
                        templateURL: "templates/contacts/details.html",
                        headerTemplateURL: "templates/contacts/header.html",
                        displayEditOption: true //may be used by the header template
                    },
                    subRoutes: [
                        {
                            name: "contact details edit",
                            path: "edit",
                            parameters: {
                                //redirectTo is inherited from parent route...
                                templateURL: "templates/contacts/edit.html",
                                displayEditOption: true
                            }
                        }
                    ]
                }

            ]
        }

    ]



}