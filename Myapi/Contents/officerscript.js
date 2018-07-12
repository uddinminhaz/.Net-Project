$(function () {

    var credential = btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password"));

    var loadOfficer = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Officers/' + localStorage.getItem("accountNo"),
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var user = xmlhttp.responseJSON;
                    $('#headname').html(user[0].Officer_Name);
                    $('#name').html(user[0].Officer_Name);
                    $('#accno').html(user[0].Officer_Id);
                    $('#address').html(user[0].Officer_address);
                    $('#mblno').html(user[0].Officer_mobile);
                    $('#salary').html(user[0].Officer_Salary);
                    $('#totalPaym').html(user[0].Officer_TotalPayment);
                    $('#lastdate').html(user[0].Officer_LastPaymentDate);
                    $('#branch').html(user[0].Officer_branch);

                    localStorage.setItem("Officer_TotalPayment", user[0].Officer_TotalPayment);
                    localStorage.setItem("Officer_address", user[0].Officer_address);
                    localStorage.setItem("Officer_mobile", user[0].Officer_mobile);
                    localStorage.setItem("Officer_Balance", user[0].Officer_Balance);
                    localStorage.setItem("Officer_LastPaymentDate", user[0].Officer_LastPaymentDate);
                    localStorage.setItem("Officer_Salary", user[0].Officer_Salary);
                    localStorage.setItem("Officer_branch", user[0].Officer_branch);
                    localStorage.setItem("username", user[0].Officer_Name);
                    localStorage.setItem("password", user[0].Officer_password);
                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }


    if (localStorage.getItem("type") == "Officer") {
        loadOfficer();
    } else {
        alert("Not Authorized");
        window.location.href = "http://localhost:48951/Webpage/Login.html"
    }

    var ChangePass = (function () {

        if ($('#cpass').val() == $('#Pass').val() && localStorage.getItem("password") == $('#Oldpass').val() && $('#Pass').val() != "") {

            var EditUser = {

                Officer_Name: localStorage.getItem("username"),
                Officer_Id: localStorage.getItem("accountNo"),
                Officer_Balance: localStorage.getItem("Officer_Balance"),
                Officer_address: localStorage.getItem("Officer_address"),
                Officer_mobile: localStorage.getItem("Officer_mobile"),
                Officer_Salary: localStorage.getItem("Officer_Salary"),
                Officer_LastPaymentDate: localStorage.getItem("Officer_LastPaymentDate"),
                Officer_TotalPayment: localStorage.getItem("Officer_TotalPayment"),
                Officer_branch: localStorage.getItem("Officer_branch"),
                Officer_password: $('#cpass').val()
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
                        localStorage.setItem("password", $('#cpass').val());
                        window.location.href = "../Officer/Home.html";
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

                Officer_Name: localStorage.getItem("username"),
                Officer_Id: localStorage.getItem("accountNo"),
                Officer_Balance: localStorage.getItem("Officer_Balance"),
                Officer_address: $('#editadd').val(),
                Officer_mobile: $('#editmbl').val(),
                Officer_Salary: localStorage.getItem("Officer_Salary"),
                Officer_LastPaymentDate: localStorage.getItem("Officer_LastPaymentDate"),
                Officer_TotalPayment: localStorage.getItem("Officer_TotalPayment"),
                Officer_branch: localStorage.getItem("Officer_branch"),
                Officer_password: localStorage.getItem("password")
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

                        window.location.href = "../Officer/Home.html";

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

    var loadUsers = function () {
        
        $.ajax({
            url: 'http://localhost:48951/api/Users',
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var catList = xmlhttp.responseJSON;
                    var outputStr = '';
                    for (var i = 0; i < catList.length; i++) {
                        outputStr += '<tr><td>' + catList[i].User_Name + '</td><td>' + catList[i].User_acc_no + '</td><td>' + catList[i].User_address + '</td><td>' + catList[i].User_mobile + '</td><td>' + catList[i].User_balance + '</td><td>' + catList[i].User_acc_type + '</td><td>' + catList[i].Deadline + '</td></tr>';
                    }
                    $('#userlist tbody').html(outputStr);

                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    $('#loadUserClk').click(loadUsers);

    var CreateSavingsAccount = function () {

        if ($('#User_Name').val() != "" && $('#User_address').val() != "" && $('#User_mobile').val() != "" && $('#User_password').val() != "" && $('#User_balance').val() != "") {

            var User1 = {
                User_Name: $('#User_Name').val(),
                User_balance: parseInt($('#User_balance').val()),
                User_address: $('#User_address').val(),
                User_mobile: $('#User_mobile').val(),
                User_acc_type: "Savings",
                Deadline: "None",
                User_password: $('#User_password').val()
            }

            $.ajax({
                url: "http://localhost:48951/api/Users",
                type: 'POST',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                data: User1,
                complete: function (xmlhttp) {

                    if (xmlhttp.status == 201) {
                        window.location.href = "../Officer/AllCustomerList.html";
                    } else {
                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                    }
                }
            });
        } else {
            $('#msg').html("Cant Be Empty");
        }
    }

    $('#CreateSaving').click(CreateSavingsAccount);

    var CreateEmp = function () {

        if ($('#User_Name').val() != "" && $('#User_address').val() != "" && $('#User_mobile').val() != "" && $('#User_password').val() != ""){


            var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;

        if ($('#Emp_position').val() == "Officers") {

            var User1 = {

                Officer_Name: $('#User_Name').val(),
                Officer_Balance: 0,
                Officer_address: $('#User_address').val(),
                Officer_mobile: $('#User_mobile').val(),
                Officer_Salary: 50000,
                Officer_LastPaymentDate: today,
                Officer_TotalPayment: 0,
                Officer_branch: $('#User_branch').val(),
                Officer_password: $('#User_password').val()
            }

        } else if ($('#Emp_position').val() == "Cashiers") {

            var User1 = {

                Cashier_Name: $('#User_Name').val(),
                Cashier_Balance: 0,
                Cashier_address: $('#User_address').val(),
                Cashier_mobile: $('#User_mobile').val(),
                Cashier_Salary: 40000,
                Cashier_LastPaymentDate: today,
                Cashier_TotalPayment: 0,
                Cashier_branch: $('#User_branch').val(),
                Cashier_password: $('#User_password').val()
            }
        }


        $.ajax({
            url: "http://localhost:48951/api/" + $('#Emp_position').val(),
            type: 'POST',
            headers: {
                Authorization: 'Basic ' + credential
            },
            data: User1,
            complete: function (xmlhttp) {

                if (xmlhttp.status == 201) {
                    window.location.href = "../Officer/Home.html";
                } else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
        }else{
            $('#msg').html("Cant Be Empty");
        } 
    }

    $('#addEmpClk').click(CreateEmp);

    var CreateLoanAccount = function () {

        if ($('#lUser_Name').val() != "" && $('#lUser_address').val() != "" && $('#lUser_mobile').val() != "" && $('#lUser_password').val() != "" && $('#Lamount').val() != "" && $('#ldeadl').val() != "" && $('#irate').val() != "") {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            var yyyydead = today.getFullYear() + parseInt($('#ldeadl').val());

            var deadline = yyyydead + '/' + mm + '/' + dd;
            today = yyyy + '/' + mm + '/' + dd;

            var User1 = {
                User_Name: $('#lUser_Name').val(),
                User_balance: 0,
                User_address: $('#lUser_address').val(),
                User_mobile: $('#lUser_mobile').val(),
                User_acc_type: "Loan",
                Deadline: deadline,
                User_password: $('#lUser_password').val()
            }
            

            $.ajax({
                url: "http://localhost:48951/api/Users",
                type: 'POST',
                headers: {
                    Authorization: 'Basic ' + credential
                },
                data: User1,
                complete: function (xmlhttp) {
                
                    
                    if (xmlhttp.status == 201) {

                        var User1 = {
                            User_Name: $('#lUser_Name').val(),
                            Loan_Amount: parseInt($('#Lamount').val()),
                            Interest_Rate: parseInt($('#irate').val()),
                            Loan_Amount_Paid: 0,
                            Loan_Date: today,
                            Loan_Deadline: deadline,
                            Manager_Approval: "No",
                            MD_Approval: "No",
                            Status: "Unapproved"
                        }

                        

                        $.ajax({
                            url: "http://localhost:48951/api/Loans",
                            type: 'POST',
                            headers: {
                                Authorization: 'Basic ' + credential
                            },
                            data: User1,
                            complete: function (xmlhttp) {
                                if (xmlhttp.status == 201) {

                                    window.location.href = "../Officer/AllCustomerList.html";

                                } else {
                                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                }
                            }
                        });

                    } else {
                        $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                    }
                }
            });
        } else {
            $('#msg').html("Cant Be Empty");
        }
    }

    $('#CreateLoan').click(CreateLoanAccount);

    var loadallLoans = function () {

        $.ajax({
            url: 'http://localhost:48951/api/Loans',
            headers: {
                Authorization: 'Basic ' + credential
            },
            complete: function (xmlhttp) {

                if (xmlhttp.status == 200) {

                    var catList = xmlhttp.responseJSON;
                    var outputStr = '';
                    for (var i = 0; i < catList.length; i++) {
                        outputStr += '<tr><td>' + catList[i].User_Name + '</td><td>' + catList[i].User_acc_no + '</td><td>' + catList[i].Loan_Amount + '</td><td>' + catList[i].Interest_Rate + '</td><td>' + catList[i].Loan_Amount_Paid + '</td><td>' + catList[i].Loan_Deadline + '</td><td>' + catList[i].Status + '</td></tr>';
                    }
                    $('#loanlist tbody').html(outputStr);

                }
                else {
                    $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                }
            }
        });
    }

    $('#loadloanClk').click(loadallLoans);


    var loanRemain = function () {

        if ($('#loanAccno').val() != "" && $('#loanname').val() != "") {

            $.ajax({
                url: 'http://localhost:48951/api/Loans/GetUser/' + $('#loanAccno').val(),
                headers: {
                    Authorization: 'Basic ' + credential
                },
                complete: function (xmlhttp) {

                    if (xmlhttp.status == 200) {
                        var user = xmlhttp.responseJSON;
                        if (user[0].Status == "Active" && user[0].User_Name == $('#loanname').val()) {

                            $('#LoanRemainAmount').val(user[0].AmountTo_Pay - user[0].Loan_Amount_Paid);

                            var today = new Date();
                            var dd = today.getDate();
                            var mm = today.getMonth() + 1;
                            var yyyy = today.getFullYear();
                            today = yyyy + '/' + mm + '/' + dd;

                            if (today < user[0].Loan_Deadline) {

                                $('#loanPayclk').click(function () {


                                    var Loan1 = {
                                        User_Name: user[0].User_Name,
                                        User_acc_no: user[0].User_acc_no,
                                        Loan_Amount: user[0].Loan_Amount,
                                        Interest_Rate: user[0].Interest_Rate,
                                        Loan_Amount_Paid: 0,
                                        Loan_Date: user[0].Loan_Date,
                                        Loan_Deadline: user[0].Loan_Deadline,
                                        Manager_Approval: user[0].Manager_Approval,
                                        MD_Approval: user[0].MD_Approval,
                                        Status: user[0].Status
                                    }

                                    

                                    if ($('#LoanPamount').val() >= $('#LoanRemainAmount').val()) {
                                        Loan1.Loan_Amount_Paid = parseInt(user[0].Loan_Amount_Paid + parseInt($('#LoanRemainAmount').val()));
                                    } else {
                                        Loan1.Loan_Amount_Paid = parseInt(user[0].Loan_Amount_Paid + parseInt($('#LoanPamount').val()));
                                    }

                                    if (user[0].AmountTo_Pay == Loan1.Loan_Amount_Paid) {
                                        Loan1.Status = "InActive";
                                    }

                                    $.ajax({
                                        url: 'http://localhost:48951/api/Loans',
                                        headers: {
                                            Authorization: 'Basic ' + credential
                                        },
                                        type: 'PUT',
                                        data: Loan1,
                                        complete: function (xmlhttp) {
                                            if (xmlhttp.status == 200) {

                                                window.location.href = "../Officer/Home.html";
                                            }
                                            else {
                                                $('#msg').html(xmlhttp.status + ": " + xmlhttp.statusText);
                                            }
                                        }
                                    });

                                    $('#msg').html("Loan Payment Successfull");

                                });

                            } else {
                                $('#msg').html("Deadline Over");
                            }


                        } else {
                            $('#msg').html("Loan Status Issue");
                        }

                    }
                }
            });

        }else{
            $('#msg').html("Cant Be Empty");
        }

    };


    $('#loanRemain').click(loanRemain);

    

    });