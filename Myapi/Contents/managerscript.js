$(function () {

    var credential = btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password"));

    var loadManager = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Managers/' + localStorage.getItem("accountNo"),
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var user = xmlhttp.responseJSON;
                    $('#headname').html(user[0].Manager_Name);
                    $('#name').html(user[0].Manager_Name);
                    $('#accno').html(user[0].Manager_Id);
                    $('#address').html(user[0].Manager_address);
                    $('#mblno').html(user[0].Manager_mobile);
                    $('#salary').html(user[0].Manager_Salary);
                    $('#totalPaym').html(user[0].Manager_TotalPayment);
                    $('#lastdate').html(user[0].Manager_LastPaymentDate);
                    $('#branch').html(user[0].Manager_branch);

                    localStorage.setItem("Manager_TotalPayment", user[0].Manager_TotalPayment);
                    localStorage.setItem("Manager_address", user[0].Manager_address);
                    localStorage.setItem("Manager_mobile", user[0].Manager_mobile);
                    localStorage.setItem("Manager_Balance", user[0].Manager_Balance);
                    localStorage.setItem("Manager_LastPaymentDate", user[0].Manager_LastPaymentDate);
                    localStorage.setItem("Manager_Salary", user[0].Manager_Salary);
                    localStorage.setItem("Manager_branch", user[0].Manager_branch);
                    localStorage.setItem("username", user[0].Manager_Name);
                    localStorage.setItem("password", user[0].Manager_password);
                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }


    if (localStorage.getItem("type") == "Manager") {
        loadManager();
    } else {
        alert("Not Authorized");
        window.location.href = "http://localhost:48951/Webpage/Login.html"
    }

    var ChangePass = (function () {

        if ($('#cpass').val() == $('#Pass').val() && localStorage.getItem("password") == $('#Oldpass').val() && $('#Pass').val() != "") {

            var EditUser = {

                Manager_Name: localStorage.getItem("username"),
                Manager_Id: localStorage.getItem("accountNo"),
                Manager_Balance: localStorage.getItem("Manager_Balance"),
                Manager_address: localStorage.getItem("Manager_address"),
                Manager_mobile: localStorage.getItem("Manager_mobile"),
                Manager_Salary: localStorage.getItem("Manager_Salary"),
                Manager_LastPaymentDate: localStorage.getItem("Manager_LastPaymentDate"),
                Manager_TotalPayment: localStorage.getItem("Manager_TotalPayment"),
                Manager_branch: localStorage.getItem("Manager_branch"),
                Manager_password: $('#cpass').val()
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
                        localStorage.setItem("password", $('#cpass').val());
                        window.location.href = "../Manager/Home.html";
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

                Manager_Name: localStorage.getItem("username"),
                Manager_Id: localStorage.getItem("accountNo"),
                Manager_Balance: localStorage.getItem("Manager_Balance"),
                Manager_address: $('#editadd').val(),
                Manager_mobile: $('#editmbl').val(),
                Manager_Salary: localStorage.getItem("Manager_Salary"),
                Manager_LastPaymentDate: localStorage.getItem("Manager_LastPaymentDate"),
                Manager_TotalPayment: localStorage.getItem("Manager_TotalPayment"),
                Manager_branch: localStorage.getItem("Manager_branch"),
                Manager_password: localStorage.getItem("password")
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

                        window.location.href = "../Manager/Home.html";

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



    var OfficerSalLoad = function () {

        if ($('#name').val() != "" || $('#accno').val() != "") {

            
            $.ajax({
                url: 'http://localhost:48951/api/Officers/' + $('#accno').val(),
                headers: {
                    Authorization: 'Basic ' + credential
                },
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {

                        var user = xmlhttp.responseJSON;
                        

                        if (user[0].Officer_Name == $('#name').val()) {

                            $('#getSal').val(user[0].Officer_Salary);
                            $('#getDate').val(user[0].Officer_LastPaymentDate);
                            $('#msg').html("Loaded")

                            $('#PayOfficerSal').click(function () {

                                var today = new Date();
                                var dd = today.getDate() - 30;

                                if (dd < 0) {
                                    var mm = today.getMonth() + 1 - 1;
                                    dd = Math.abs(dd);
                                } else {
                                    var mm = today.getMonth() + 1;
                                }
                                if(mm==0){
                                    mm = 12;
                                    var yyyy = today.getFullYear() - 1;
                                }else{
                                    var yyyy = today.getFullYear();
                                }

                                today = yyyy + '/' + mm + '/' + dd;

                                if (user[0].Officer_LastPaymentDate <= today) {


                                    var now = new Date();
                                    var dd = now.getDate();
                                    var mm = now.getMonth() + 1;
                                    var yyyy = now.getFullYear();
                                    now = yyyy + '/' + mm + '/' + dd;

                                    var EditUser = {

                                        Officer_Name: user[0].Officer_Name,
                                        Officer_Id: user[0].Officer_Id,
                                        Officer_Balance: user[0].Officer_Balance,
                                        Officer_address: user[0].Officer_address,
                                        Officer_mobile: user[0].Officer_mobile,
                                        Officer_Salary: user[0].Officer_Salary,
                                        Officer_LastPaymentDate: now,
                                        Officer_TotalPayment: parseInt(user[0].Officer_TotalPayment + user[0].Officer_Salary),
                                        Officer_branch: user[0].Officer_branch,
                                        Officer_password: user[0].Officer_password
                                    }

                                   
                                    $.ajax({
                                        url: 'http://localhost:48951/api/Officers',
                                        headers: {
                                            Authorization: 'Basic ' + credential
                                        },
                                        type: 'PUT',
                                        data: EditUser,
                                        complete: function (xmlhttp) {
                                            if (xmlhttp.status == 200) {

                                                $('#msg').html("Successfull");
                                                window.location.href = "../Manager/Home.html";
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


    $('#LoadOfficerSal').click(OfficerSalLoad);


    var CashierSalLoad = function () {

        if ($('#name').val() != "" || $('#accno').val() != "") {


            $.ajax({
                url: 'http://localhost:48951/api/Cashiers/' + $('#accno').val(),
                headers: {
                    Authorization: 'Basic ' + credential
                },
                complete: function (xmlhttp) {
                    if (xmlhttp.status == 200) {
                                
                        var user = xmlhttp.responseJSON;
                        if (user[0].Cashier_Name == $('#name').val()) {

                            

                            $('#getSal').val(user[0].Cashier_Salary);
                            $('#getDate').val(user[0].Cashier_LastPaymentDate);
                            $('#msg').html("Loaded")

                            $('#PayCashierSal').click(function () {

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

                                if (user[0].Cashier_LastPaymentDate <= today) {


                                    var now = new Date();
                                    var dd = now.getDate();
                                    var mm = now.getMonth() + 1;
                                    var yyyy = now.getFullYear();
                                    now = yyyy + '/' + mm + '/' + dd;

                                    var EditUser = {

                                        Cashier_Name: user[0].Cashier_Name,
                                        Cashier_Id: user[0].Cashier_Id,
                                        Cashier_Balance: user[0].Cashier_Balance,
                                        Cashier_address: user[0].Cashier_address,
                                        Cashier_mobile: user[0].Cashier_mobile,
                                        Cashier_Salary: user[0].Cashier_Salary,
                                        Cashier_LastPaymentDate: now,
                                        Cashier_TotalPayment: parseInt(user[0].Cashier_TotalPayment + user[0].Cashier_Salary),
                                        Cashier_branch: user[0].Cashier_branch,
                                        Cashier_password: user[0].Cashier_password
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
                                                window.location.href = "../Manager/Home.html";
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


    $('#LoadCashierSal').click(CashierSalLoad);


    var loadUnapproveLoans = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Loans/GetAllNoapprovalfromManager',
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

                    outputStr += "<fieldset> <legend>Loan Information</legend> <table> <tbody> <tr><td>User Name</td><td>:</td><td>" + catList[0].User_Name + "</td></tr> <tr><td>Account No</td><td>:</td><td>" + catList[0].User_acc_no + "</td></tr> <tr><td>Loan Amount</td><td>:</td><td>" + catList[0].Loan_Amount + "</td></tr> <tr><td>Interest Rate</td><td>:</td><td>" + catList[0].Interest_Rate + "</td></tr> <tr><td>Loan Deadline</td><td>:</td><td>" + catList[0].Loan_Deadline + "</td></tr> <tr><td>Your Approval</td><td>:</td><td>" + catList[0].Manager_Approval + "</td></tr> <tr><td>MD Approval</td><td>:</td><td>" + catList[0].MD_Approval + "</td></tr> <tr><td>Status</td><td>:</td><td>" + catList[0].Status + "</td></tr> <tr><td></td><td><button id='ApproveLoan'>Approve</button></td></tr>  </tbody> </table> </fieldset>";

                    $('#content').html(outputStr);

                    $('#ApproveLoan').click(function () {

                        if (catList[0].Manager_Approval=="No") {

        
                            var User1 = {
                                User_Name: catList[0].User_Name,
                                Loan_Id: catList[0].Loan_Id,
                                User_acc_no:catList[0].User_acc_no,
                                Loan_Amount: catList[0].Loan_Amount,
                                AmountTo_Pay:catList[0].AmountTo_Pay,
                                Interest_Rate: catList[0].Interest_Rate,
                                Loan_Amount_Paid: catList[0].Loan_Amount_Paid,
                                Loan_Date: catList[0].Loan_Date,
                                Loan_Deadline: catList[0].Loan_Deadline,
                                Manager_Approval: "Yes",
                                MD_Approval: catList[0].MD_Approval,
                                Status: catList[0].Status
                            }

                            if (catList[0].MD_Approval == "Yes") {
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

                                        window.location.href = "../Manager/Home.html";

                                    } else {
                                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                    }
                                }
                            });

                        }else{
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

    

});