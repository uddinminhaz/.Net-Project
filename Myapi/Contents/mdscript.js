$(function () {

    var credential = btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password"));

    var loadMD = function () {

        $.ajax({
            url: 'http://localhost:48951/api/MD/' + localStorage.getItem("accountNo"),
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var user = xmlhttp.responseJSON;

                    $('#headname').html(user[0].MD_name);
                    $('#name').html(user[0].MD_name);
                    $('#accno').html(user[0].MD_Id);
                    $('#address').html(user[0].MD_address);
                    $('#mblno').html(user[0].MD_mobile);
                    $('#salary').html(user[0].MD_Salary);

                    localStorage.setItem("MD_address", user[0].MD_address);
                    localStorage.setItem("MD_mobile", user[0].MD_mobile);
                    localStorage.setItem("MD_Balance", user[0].MD_Balance);
                    localStorage.setItem("MD_Salary", user[0].MD_Salary);
                    localStorage.setItem("username", user[0].MD_name);
                    localStorage.setItem("password", user[0].MD_password);
                    
                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }


    if (localStorage.getItem("type") == "MD") {
        loadMD();
    } else {
        alert("Not Authorized");
        window.location.href = "http://localhost:48951/Webpage/Login.html"
    }

    var ChangePass = (function () {

        if ($('#cpass').val() == $('#Pass').val() && localStorage.getItem("password") == $('#Oldpass').val() && $('#Pass').val() != "") {

            var EditUser = {

                MD_name: localStorage.getItem("username"),
                MD_Id: localStorage.getItem("accountNo"),
                MD_Balance: localStorage.getItem("MD_Balance"),
                MD_address: localStorage.getItem("MD_address"),
                MD_mobile: localStorage.getItem("MD_mobile"),
                MD_Salary: localStorage.getItem("MD_Salary"),
                MD_password: $('#cpass').val()
            }

            $.ajax({
                url: 'http://localhost:48951/api/MD',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");
                        localStorage.setItem("password", $('#cpass').val());
                        window.location.href = "../MD/Home.html";
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

                MD_name: localStorage.getItem("username"),
                MD_Id: localStorage.getItem("accountNo"),
                MD_Balance: localStorage.getItem("MD_Balance"),
                MD_address: $('#editadd').val(),
                MD_mobile: $('#editmbl').val(),
                MD_Salary: localStorage.getItem("MD_Salary"),
                MD_password: localStorage.getItem("password")
            }

            $.ajax({
                url: 'http://localhost:48951/api/MD',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                type: 'PUT',
                data: EditUser,
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        $('#msg').html("Successfull");

                        window.location.href = "../MD/Home.html";

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

    var ManagerSalLoad = function () {

        if ($('#name').val() != "" && $('#accno').val() != "") {


            $.ajax({
                url: 'http://localhost:48951/api/Managers/' + $('#accno').val(),
                headers: {
                    Authorization: 'Basic ' + credential
                },
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        var user = xmlhttp.responseJSON;
                        if (user[0].Manager_Name == $('#name').val()) {



                            $('#getSal').val(user[0].Manager_Salary);
                            $('#getDate').val(user[0].Manager_LastPaymentDate);
                            $('#msg').html("Loaded")

                            $('#PayManagerSal').click(function () {

                                var today = new Date();
                                var dd = today.getDate() - 30;

                                if (dd < 0) {
                                    var mm = today.getMonth() + 1 - 1;
                                    dd = Math.abs(dd);
                                } else {
                                    var mm = today.getMonth() + 1;
                                }
                                if (mm == 0) {
                                    mm = 12;
                                    var yyyy = today.getFullYear() - 1;
                                } else {
                                    var yyyy = today.getFullYear();
                                }

                                today = yyyy + '/' + mm + '/' + dd;

                                if (user[0].Manager_LastPaymentDate <= today) {


                                    var now = new Date();
                                    var dd = now.getDate();
                                    var mm = now.getMonth() + 1;
                                    var yyyy = now.getFullYear();
                                    now = yyyy + '/' + mm + '/' + dd;

                                    var EditUser = {

                                        Manager_Name: user[0].Manager_Name,
                                        Manager_Id: user[0].Manager_Id,
                                        Manager_Balance: user[0].Manager_Balance,
                                        Manager_address: user[0].Manager_address,
                                        Manager_mobile: user[0].Manager_mobile,
                                        Manager_Salary: user[0].Manager_Salary,
                                        Manager_LastPaymentDate: now,
                                        Manager_TotalPayment: parseInt(user[0].Manager_TotalPayment + user[0].Manager_Salary),
                                        Manager_branch: user[0].Manager_branch,
                                        Manager_password: user[0].Manager_password
                                    }

                                    $.ajax({
                                        url: 'http://localhost:48951/api/Managers',
                                        headers: {
                                            Authorization: 'Basic ' + credential
                                        },
                                        type: 'PUT',
                                        data: EditUser,
                                        complete: function (xmlhttp) {
                                            if (xmlhttp.status == 200) {

                                                $('#msg').html("Successfull");
                                                window.location.href = "../MD/Home.html";
                                            }
                                            else {
                                                $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                            }
                                        }
                                    });

                                } else {
                                    $('#msg').html("To Early to Pay");
                                }
                            });
                        } else {
                            $('#msg').html("Username didnt Match");
                        }
                    }
                    else {
                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                    }
                }


            });


        } else {
            $('#msg').html("Cant Be Empty");
        }


    }


    $('#LoadManagerSal').click(ManagerSalLoad);

    var loadUnapproveLoans = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Loans/GetAllNoapprovalfromMD',
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var catList = xmlhttp.responseJSON;
                    var outputStr = '';
                    for (var i = 0; i < catList.length; i++) {
                        outputStr += '<tr><td>' + catList[i].User_Name + '</td><td>' + catList[i].User_acc_no + '</td><td>' + catList[i].Loan_Amount + '</td><td>' + catList[i].Interest_Rate + '</td><td>' + catList[i].Loan_Deadline + '</td><td>' + catList[i].Loan_Amount_Paid + '</td><td>' + catList[i].Manager_Approval + '</td><td>' + catList[i].MD_Approval + '</td></tr>';
                    }
                    $('#loanlist tbody').html(outputStr);

                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    $('#loadUnApproveClk').click(loadUnapproveLoans);

    var loadActiveLoans = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Loans/GetAllActive',
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var catList = xmlhttp.responseJSON;
                    var outputStr = '';
                    for (var i = 0; i < catList.length; i++) {
                        outputStr += '<tr><td>' + catList[i].User_Name + '</td><td>' + catList[i].User_acc_no + '</td><td>' + catList[i].Loan_Amount + '</td><td>' + catList[i].Interest_Rate + '</td><td>' + catList[i].Loan_Deadline + '</td><td>' + catList[i].AmountTo_Pay + '</td><td>' + catList[i].Loan_Amount_Paid + '</td></tr>';
                    }
                    $('#loanlist tbody').html(outputStr);

                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    $('#loadActiveClk').click(loadActiveLoans);

    var loadInActiveLoans = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Loans/GetAllInActive',
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var catList = xmlhttp.responseJSON;
                    var outputStr = '';
                    for (var i = 0; i < catList.length; i++) {
                        outputStr += '<tr><td>' + catList[i].User_Name + '</td><td>' + catList[i].User_acc_no + '</td><td>' + catList[i].Loan_Amount + '</td><td>' + catList[i].Interest_Rate + '</td><td>' + catList[i].Loan_Deadline + '</td><td>' + catList[i].AmountTo_Pay + '</td><td>' + catList[i].Loan_Amount_Paid + '</td></tr>';
                    }
                    $('#loanlist tbody').html(outputStr);

                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    $('#loadInActiveClk').click(loadInActiveLoans);

    var loadSelectedLoans = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Loans/GetUser/' + $('#accno').val(),
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var catList = xmlhttp.responseJSON;
                    var outputStr = '';

                    outputStr += "<fieldset> <legend>Loan Information</legend> <table> <tbody> <tr><td>User Name</td><td>:</td><td>" + catList[0].User_Name + "</td></tr> <tr><td>Account No</td><td>:</td><td>" + catList[0].User_acc_no + "</td></tr> <tr><td>Loan Amount</td><td>:</td><td>" + catList[0].Loan_Amount + "</td></tr> <tr><td>Interest Rate</td><td>:</td><td>" + catList[0].Interest_Rate + "</td></tr> <tr><td>Loan Deadline</td><td>:</td><td>" + catList[0].Loan_Deadline + "</td></tr> <tr><td>Manager Approval</td><td>:</td><td>" + catList[0].Manager_Approval + "</td></tr> <tr><td>Your Approval</td><td>:</td><td>" + catList[0].MD_Approval + "</td></tr> <tr><td>Status</td><td>:</td><td>" + catList[0].Status + "</td></tr> <tr><td></td><td><button id='ApproveLoan'>Approve</button></td></tr>  </tbody> </table> </fieldset>";

                    $('#content').html(outputStr);

                    $('#ApproveLoan').click(function () {

                        if (catList[0].MD_Approval == "No") {


                            var User1 = {
                                User_Name: catList[0].User_Name,
                                Loan_Id: catList[0].Loan_Id,
                                User_acc_no: catList[0].User_acc_no,
                                Loan_Amount: catList[0].Loan_Amount,
                                AmountTo_Pay: catList[0].AmountTo_Pay,
                                Interest_Rate: catList[0].Interest_Rate,
                                Loan_Amount_Paid: catList[0].Loan_Amount_Paid,
                                Loan_Date: catList[0].Loan_Date,
                                Loan_Deadline: catList[0].Loan_Deadline,
                                Manager_Approval: catList[0].Manager_Approval,
                                MD_Approval: "Yes",
                                Status: catList[0].Status
                            }

                            if (catList[0].Manager_Approval == "Yes") {
                                User1.Status = "Active";
                            }

                            $.ajax({
                                url: "http://localhost:48951/api/Loans",
                                type: 'PUT',
                                headers: {
                                    Authorization: 'Basic ' + credential
                                },
                                data: User1,
                                complete: function (xmlhttp) {
                                    if (xmlhttp.status == 200) {

                                        window.location.href = "../MD/Home.html";

                                    } else {
                                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                    }
                                }
                            });

                        } else {
                            alert("Already Approved");
                        }
                    });

                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    $('#LoadLoan').click(loadSelectedLoans);

    var CreateManager = function () {

        if ($('#User_Name').val() != "" && $('#User_address').val() != "" && $('#User_mobile').val() != "" && $('#User_password').val() != "") {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            today = yyyy + '/' + mm + '/' + dd;

            var User1 = {

                Manager_Name: $('#User_Name').val(),
                Manager_Balance: 0,
                Manager_address: $('#User_address').val(),
                Manager_mobile: $('#User_mobile').val(),
                Manager_Salary: 70000,
                Manager_LastPaymentDate: today,
                Manager_TotalPayment: 0,
                Manager_branch: $('#User_branch').val(),
                Manager_password: $('#User_password').val()
            }

        $.ajax({
            url: "http://localhost:48951/api/Managers",
            type: 'POST',
            headers: {
                Authorization: 'Basic ' + credential
            },
            data: User1,
            complete: function (xmlhttp) {

                if (xmlhttp.status == 201) {
                    $('#msg').html("Successfull");
                    window.location.href = "../MD/Home.html";
                } else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
        }else{
            $('#msg').html("Cant Be Empty");
        }

    }

    $('#addManagerClk').click(CreateManager);


});