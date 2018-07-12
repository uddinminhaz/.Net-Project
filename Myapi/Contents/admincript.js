$(function () {

    var credential = btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password"));

    var loadAdmin = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Admins/' + localStorage.getItem("accountNo"),
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var user = xmlhttp.responseJSON;
                    $('#headname').html(user[0].Admin_Name);
                    $('#name').html(user[0].Admin_Name);
                    $('#accno').html(user[0].Admin_Id);
                    $('#address').html(user[0].Admin_address);
                    $('#mblno').html(user[0].Admin_mobile);

                    localStorage.setItem("Admin_address", user[0].Admin_address);
                    localStorage.setItem("Admin_mobile", user[0].Admin_mobile);
                    localStorage.setItem("username", user[0].Admin_Name);
                    localStorage.setItem("password", user[0].Admin_password);
                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    if (localStorage.getItem("type") == "Admin") {
        loadAdmin();
    } else {
        alert("Not Authorized");
        window.location.href = "http://localhost:48951/Webpage/Login.html"
    }

    var ChangePass = (function () {

        if ($('#cpass').val() == $('#Pass').val() && localStorage.getItem("password") == $('#Oldpass').val() && $('#Pass').val() != "") {

            var EditUser = {

                Admin_Name: localStorage.getItem("username"),
                Admin_Id: localStorage.getItem("accountNo"),
                Admin_address: localStorage.getItem("Admin_address"),
                Admin_mobile: localStorage.getItem("Admin_mobile"),
                Admin_password: $('#cpass').val()
            }

            $.ajax({
                url: 'http://localhost:48951/api/Admins',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");
                        localStorage.setItem("password", $('#cpass').val());
                        window.location.href = "../Admin/Home.html";
                    }
                    else {
                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                    }
                }
            });


        } else {
            $('#msg').html("Invalid");
        }

    });

    $('#CPclk').click(ChangePass);

    var EditPro = (function () {

        if ($('#editadd').val() != "" && $('#editmbl').val() != "") {

            var EditUser = {

                Admin_Name: localStorage.getItem("username"),
                Admin_Id: localStorage.getItem("accountNo"),
                Admin_address: $('#editadd').val(),
                Admin_mobile: $('#editmbl').val(),
                Admin_password: localStorage.getItem("password")
            }

            $.ajax({
                url: 'http://localhost:48951/api/Admins',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");

                        window.location.href = "../Admin/Home.html";

                    }
                    else {
                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                    }
                }
            });

        } else {
            $('#msg').html("Cant Be Empty");
        }
    });

    $('#EditSave').click(EditPro);


    var CreateMD = function () {

            var User1 = {

                MD_name: $('#User_Name').val(),
                MD_Balance: 0,
                MD_address: $('#User_address').val(),
                MD_mobile: $('#User_mobile').val(),
                MD_Salary: 90000,
                MD_password: $('#User_password').val()
            }

        $.ajax({
            url: "http://localhost:48951/api/MD",
            type: 'POST',
            headers: {
                Authorization: 'Basic ' + credential
            },
            data: User1,
            complete: function (xmlhttp) {

                if (xmlhttp.status == 201) {
                    $('#msg').html("Successfull");
                    window.location.href = "../Admin/Home.html";
                } else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    $('#addEmpClk').click(CreateMD);

    //var DeleteSome = function () {

    //    if ($('#logname').val() != "" && $('#logid').val() != "") {

    //        var User1 = {
    //            Login_Name: $('#logname').val(),
    //            Login_acc_no: $('#logid').val()
    //        }

    //        $.ajax({
    //            url: "http://localhost:48951/api/LoginCheck/LoginDelete",
    //            type:'DELETE',
    //            headers: {
    //                Authorization: 'Basic ' + credential
    //            },
    //            data: User1,
    //            complete: function (xmlhttp) {

    //                if (xmlhttp.status == 200) {
    //                    $('#msg').html("Successfull");
    //                    window.location.href = "../Admin/Home.html";
    //                } else {
    //                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
    //                }
    //            }


    //        });

    //    }else{
    //        $('#msg').html("Cant Be Empty");
    //    }

    //}

    //$('#Delclk').click(DeleteSome);
});