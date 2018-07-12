$(function () {

    var credential = btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password"));

    var loadCashiers = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Cashiers/' + localStorage.getItem("accountNo"),
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var user = xmlhttp.responseJSON;
                    $('#headname').html(user[0].Cashier_Name);
                    $('#name').html(user[0].Cashier_Name);
                    $('#accno').html(user[0].Cashier_Id);
                    $('#address').html(user[0].Cashier_address);
                    $('#mblno').html(user[0].Cashier_mobile);
                    $('#salary').html(user[0].Cashier_Salary);
                    $('#totalPaym').html(user[0].Cashier_TotalPayment);
                    $('#lastdate').html(user[0].Cashier_LastPaymentDate);
                    $('#branch').html(user[0].Cashier_branch);
                   
                    localStorage.setItem("Cashier_TotalPayment", user[0].Cashier_TotalPayment);
                    localStorage.setItem("Cashier_address", user[0].Cashier_address);
                    localStorage.setItem("Cashier_mobile", user[0].Cashier_mobile);
                    localStorage.setItem("Cashier_Balance", user[0].Cashier_Balance);
                    localStorage.setItem("Cashier_LastPaymentDate", user[0].Cashier_LastPaymentDate);
                    localStorage.setItem("Cashier_Salary", user[0].Cashier_Salary);
                    localStorage.setItem("Cashier_branch", user[0].Cashier_branch);
                    localStorage.setItem("username", user[0].Cashier_Name);
                    localStorage.setItem("password", user[0].Cashier_password);
                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }


    if (localStorage.getItem("type") == "Cashier") {
        loadCashiers();
    } else {
        alert("Not Authorized");
        window.location.href = "http://localhost:48951/Webpage/Login.html"
    }


    var EditPro = (function () {

        if ($('#editadd').val() != "" && $('#editmbl').val() != "") {

            var EditUser = {

                Cashier_Name: localStorage.getItem("username"),
                Cashier_Id: localStorage.getItem("accountNo"),
                Cashier_Balance: localStorage.getItem("Cashier_Balance"),
                Cashier_address: $('#editadd').val(),
                Cashier_mobile: $('#editmbl').val(),
                Cashier_Salary: localStorage.getItem("Cashier_Salary"),
                Cashier_LastPaymentDate: localStorage.getItem("Cashier_LastPaymentDate"),
                Cashier_TotalPayment: localStorage.getItem("Cashier_TotalPayment"),
                Cashier_branch: localStorage.getItem("Cashier_branch"),
                Cashier_password: localStorage.getItem("password")
            }

            $.ajax({
                url: 'http://localhost:48951/api/Cashiers',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");

                        window.location.href = "../Cashier/Home.html";

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

        if ($('#cpass').val() == $('#Pass').val() && localStorage.getItem("password") == $('#Oldpass').val() && $('#Pass').val() != "") {

            var EditUser = {

                Cashier_Name: localStorage.getItem("username"),
                Cashier_Id: localStorage.getItem("accountNo"),
                Cashier_Balance: localStorage.getItem("Cashier_Balance"),
                Cashier_address: localStorage.getItem("Cashier_address"),
                Cashier_mobile: localStorage.getItem("Cashier_mobile"),
                Cashier_Salary: localStorage.getItem("Cashier_Salary"),
                Cashier_LastPaymentDate: localStorage.getItem("Cashier_LastPaymentDate"),
                Cashier_TotalPayment: localStorage.getItem("Cashier_TotalPayment"),
                Cashier_branch: localStorage.getItem("Cashier_branch"),
                Cashier_password: $('#cpass').val()
            }

            $.ajax({
                url: 'http://localhost:48951/api/Cashiers',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");
                        localStorage.setItem("password", $('#cpass').val());
                        window.location.href = "../Cashier/Home.html";
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

    var WithdrawCash = (function () {

        if ($('#withamount').val() == $('#withcamount').val() && $('#withamount').val()>0){

            $.ajax({
                url: 'http://localhost:48951/api/Users/' + $('#withdrawno').val(),
                headers: {
                    Authorization: 'Basic ' + credential
                },
                complete: function (xmlhttp) {

                    if (xmlhttp.status == 200) {
                        var user = xmlhttp.responseJSON;

                        if (user[0].User_acc_type == "Savings" && user[0].User_Name == $('#withdrawname').val() && user[0].User_balance > parseInt($('#withamount').val())) {

                            var User1 = {
                                User_Name: user[0].User_Name,
                                User_acc_no: user[0].User_acc_no,
                                User_balance: parseInt(user[0].User_balance - parseInt($('#withamount').val())),
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
                                data: User1,
                                complete: function (xmlhttp) {
                                    if (xmlhttp.status == 200) {

                                        window.location.href = "../Cashier/Home.html";
                                    }
                                    else {
                                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                    }
                                }
                            });

                            $('#msg').html("Cash Withdraw Successfull");

                        } else {
                            $('#msg').html("Invalid");
                        }

                    }else {
                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                    }
                }

                });

        }else {
            $('#msg').html("Invalid Amount");
        }

    });

    $('#Wdrawclk').click(WithdrawCash);


    var DepoCash = (function () {

        if ($('#depoamount').val() == $('#depocamount').val() && $('#depoamount').val() > 0) {

            $.ajax({
                url: 'http://localhost:48951/api/Users/' + $('#depono').val(),
                headers: {
                    Authorization: 'Basic ' + credential
                },
                complete: function (xmlhttp) {

                    if (xmlhttp.status == 200) {
                        var user = xmlhttp.responseJSON;

                        if (user[0].User_acc_type == "Savings" && user[0].User_Name == $('#depowname').val()) {

                            var User1 = {
                                User_Name: user[0].User_Name,
                                User_acc_no: user[0].User_acc_no,
                                User_balance: parseInt(user[0].User_balance + parseInt($('#depoamount').val())),
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
                                data: User1,
                                complete: function (xmlhttp) {
                                    if (xmlhttp.status == 200) {

                                        window.location.href = "../Cashier/Home.html";
                                    }
                                    else {
                                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                    }
                                }
                            });

                            $('#msg').html("Cash Deposite Successfull");

                        } else {
                            $('#msg').html("Invalid");
                        }

                    } else {
                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                    }
                }

            });

        } else {
            $('#msg').html("Invalid Amount");
        }

    });

    $('#depoclk').click(DepoCash);

});