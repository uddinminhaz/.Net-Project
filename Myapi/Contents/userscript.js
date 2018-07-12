$(function () {
    var credential = btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password"));

    var loadUser = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Users/' + localStorage.getItem("accountNo"),
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var user = xmlhttp.responseJSON;
                    $('#headname').html(user[0].User_Name);
                    $('#name').html(user[0].User_Name);
                    $('#accno').html(user[0].User_acc_no);
                    $('#address').html(user[0].User_address);
                    $('#mblno').html(user[0].User_mobile);
                    $('#balance').html(user[0].User_balance);

                    localStorage.setItem("User_address", user[0].User_address);
                    localStorage.setItem("User_mobile", user[0].User_mobile);
                    localStorage.setItem("User_balance", user[0].User_balance);
                    localStorage.setItem("User_acc_type", user[0].User_acc_type);
                    localStorage.setItem("Deadline", user[0].Deadline);
                    localStorage.setItem("username", user[0].User_Name);
                    localStorage.setItem("password", user[0].User_password);
                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    if (localStorage.getItem("type")=="User") {
        loadUser();
    } else {
        alert("Not Authorized");
        window.location.href = "http://localhost:48951/Webpage/Login.html"
    }
    
    

    var transferBalance = (function(){

        var amount = $('#amount').val();

        

        if (parseInt(amount) > 0 && parseInt(amount) < localStorage.getItem("User_balance") && localStorage.getItem("User_acc_type") == "Savings") {

            $.ajax({
                url: 'http://localhost:48951/api/Users/' + $('#Tid').val(),
                headers: {
                    Authorization: 'Basic ' + credential
                },
                complete: function (xmlhttp) {

                    if (xmlhttp.status == 200) {

                        var user = xmlhttp.responseJSON;
                        
                        if (user[0].User_acc_type == "Savings" && user[0].User_Name == $('#Tname').val()) {

                            var balance = user[0].User_balance

                            var User2 = {
                                User_Name: user[0].User_Name,
                                User_acc_no: $('#Tid').val(),
                                User_balance: parseInt(balance + parseInt(amount)),
                                User_address: user[0].User_address,
                                User_mobile: user[0].User_mobile,
                                User_acc_type: user[0].User_acc_type,
                                Deadline: user[0].Deadline,
                                User_password: user[0].User_password
                            }

                            $.ajax({
                                url: 'http://localhost:48951/api/Users',
                                headers: {
                                    Authorization: 'Basic ' + credential
                                },
                                type: 'PUT',
                                data: User2,
                                complete: function (xmlhttp) {
                                    if (xmlhttp.status == 200) {

                                        var User1 = {
                                            User_Name: localStorage.getItem("username"),
                                            User_acc_no: localStorage.getItem("accountNo"),
                                            User_balance: parseInt(localStorage.getItem("User_balance") - amount),
                                            User_address: localStorage.getItem("User_address"),
                                            User_mobile: localStorage.getItem("User_mobile"),
                                            User_acc_type: localStorage.getItem("User_acc_type"),
                                            Deadline: localStorage.getItem("Deadline"),
                                            User_password: localStorage.getItem("password")
                                        }

                                        $.ajax({
                                            url: 'http://localhost:48951/api/Users',
                                            headers: {
                                                Authorization: 'Basic ' + credential
                                            },
                                            type: 'PUT',
                                            data: User1,
                                            complete: function (xmlhttp) {
                                                if (xmlhttp.status == 200) {

                                                    window.location.href = "../User/Home.html";
                                                }
                                                else {
                                                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                                }
                                            }
                                        });

                                        $('#msg').html("Updated Successfully");
                                    }
                                    else {
                                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                    }
                                }
                            });
                        } else {
                            $('#msg').html("Username unavailable for Transfer");
                        }
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

    $('#TransfersveClk').click(transferBalance);

    var EditPro = (function () {

        if ($('#editadd').val() != "" && $('#editmbl').val() != "") {

            var EditUser = {

                User_Name: localStorage.getItem("username"),
                User_acc_no: localStorage.getItem("accountNo"),
                User_balance: localStorage.getItem("User_balance"),
                User_address: $('#editadd').val(),
                User_mobile: $('#editmbl').val(),
                User_acc_type: localStorage.getItem("User_acc_type"),
                Deadline: localStorage.getItem("Deadline"),
                User_password: localStorage.getItem("password")
            }

            $.ajax({
                url: 'http://localhost:48951/api/Users',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");

                        window.location.href = "../User/Home.html";
                        
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

    var ChangePass = (function () {

        if ($('#cpass').val() == $('#Pass').val() && localStorage.getItem("password") == $('#Oldpass').val() && $('#Pass').val()!="" ) {

            var EditUser = {

                User_Name: localStorage.getItem("username"),
                User_acc_no: localStorage.getItem("accountNo"),
                User_balance: localStorage.getItem("User_balance"),
                User_address: localStorage.getItem("User_address"),
                User_mobile: localStorage.getItem("User_mobile"),
                User_acc_type: localStorage.getItem("User_acc_type"),
                Deadline: localStorage.getItem("Deadline"),
                User_password: $('#cpass').val()
            }

            $.ajax({
                url: 'http://localhost:48951/api/Users',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");
                        localStorage.setItem("password", $('#cpass').val());
                        window.location.href = "../User/Home.html";
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

    
    
});