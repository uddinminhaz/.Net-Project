
$(function () {
       
    localStorage.clear();

    var loadLogin = function () {
        var credential = btoa($('#username').val() + ':' + $('#password').val());
        var Logininfo = {
            Login_Name: $('#username').val(),
            Login_Password: $('#password').val()
        }
        $.ajax({
            url: "http://localhost:48951/api/LoginCheck",
            headers: {
                Authorization: 'Basic ' + credential
            },
            type: 'POST',
            data:Logininfo,
            complete: function (xmlhttp) {
               
                if (xmlhttp.status == 200) {
                    
                    var catList = xmlhttp.responseJSON;
                    var type = catList[0].Login_type;

                    $('#msg').html(catList[0].Login_type);

                    

                    localStorage.setItem("username", $('#username').val());
                    localStorage.setItem("accountNo", catList[0].Login_acc_no);
                    localStorage.setItem("password", $('#password').val());
                    

                    if (type == "User")
                    {               
                        url = "http://localhost:48951/Webpage/User/Home.html";
                        localStorage.setItem("type", "User");
                    }
                    else if (type == "Admin")
                    {
                        url = "http://localhost:48951/Webpage/Admin/Home.html";
                        localStorage.setItem("type", "Admin");
                    }
                    else if (type == "MD")
                    {
                        url = "http://localhost:48951/Webpage/MD/Home.html";
                        localStorage.setItem("type", "MD");
                    }
                    else if (type == "Manager")
                    {
                        url = "http://localhost:48951/Webpage/Manager/Home.html";
                        localStorage.setItem("type", "Manager");
                    }
                    else if (type == "Cashier")
                    {
                        url = "http://localhost:48951/Webpage/Cashier/Home.html";
                        localStorage.setItem("type", "Cashier");
                    }
                    else if (type == "Officer")
                    {
                        url = "http://localhost:48951/Webpage/Officer/Home.html";
                        localStorage.setItem("type", "Officer");
                    }

                    window.location.href = url;

                }
                else {
                    $('#msg').html("Wrong Username and Password");
                }
            }
        });
    }


    $('#loginClk').click(loadLogin);

});