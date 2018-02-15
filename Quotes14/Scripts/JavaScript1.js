$(function () { 

        var hostweburl;
        var appweburl;

        // Load the required SharePoint libraries
        $(document).ready(function () {
                    //Get the URI decoded URLs.
                hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
                appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
                
                  
                
            // resources are in URLs in the form: web_url/_layouts/15/resource
            var scriptbase = hostweburl + "/_layouts/15/";

            // Load the js files and continue to the successHandler
            $.getScript(scriptbase + "SP.RequestExecutor.js", execCrossDomainRequest);

        });

        // Function to prepare and issue the request to get SharePoint data
        function execCrossDomainRequest() {
            // executor: The RequestExecutor object Initialize the RequestExecutor with the app web URL.
            var executor = new SP.RequestExecutor(appweburl);

            // Deals with the issue the call against the app web.
            executor.executeAsync({
                    url: appweburl + "/_api/web/lists/getbytitle('Quotes')/items?",
                    method: "GET",
                    headers: {"Accept": "application/json; odata=verbose" },
                    success: successHandler,
                    error: errorHandler
                }
            );
        }

        // Function to handle the success event. Prints the data to the page.
        function successHandler(data) {

            

            $("#butonz").html('<a href="' + appweburl + '/Lists/Quotes/AllItems.aspx' + '" id="linktoSP" target="_blank"><button style="width:50%">ADD NEW QUOTES</button></a>');
            $("#butonz").append('<a href="https://www.brainyquote.com/topics/inspirational"  target="_blank"><button style="width:50%"> GET INSPIRED </button></a>');

                var jsonObject = JSON.parse(data.body);

                var l = jsonObject.d.results.length;
                var i = Math.floor(Math.random() * l);

                $("#qtext").html(jsonObject.d.results[i].QuoteText);
                $("#qautor").html(jsonObject.d.results[i].QuoteAuthor);
                

        }


        // Function to handle the error event. Prints the error message to the page.
        function errorHandler(data, errorCode, errorMessage) {
                    document.getElementById("internal").innerText = "Could not complete cross-domain call: " + errorMessage;
                }

        // Function to retrieve a query string value.
        function getQueryStringParameter(paramToRetrieve) {
            var params =
                document.URL.split("?")[1].split("&");
            var strParams = "";
            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split("=");
                if (singleParam[0] == paramToRetrieve)
                    return singleParam[1];
            }
        }
        

})
    