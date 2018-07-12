using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using APIEntity;
using APIRepository;
using APIInterface;

namespace APIApp.Controllers
{
    public class OfficerController : Controller
    {
        // GET: Officer
        public ActionResult Home(Officer ho)
        {
            Session["Officer"] = ho;
            Session["OfficerID"] = ho.Officer_Id;
            Session["OfficerName"] = ho.Officer_Name;
            Session["Name"] = ho.Officer_Name;
            Session["Password"] = ho.Officer_password;
            Session["Branch"] = ho.Officer_branch;
            return RedirectToAction("HomePage");
        }

        public ActionResult Home1()
        {
            return View(Session["Officer"]);
        }
        [HttpGet]
        public ActionResult EditProfile()
        {
            return View(Session["Officer"]);
        }

        [HttpPost, ActionName("EditProfile")]
        public ActionResult ConfirmEditProfile(Officer ho)
        {
            OfficerRepository orepo = new OfficerRepository();
            orepo.Update(ho);

            ViewData["Message"] = "Edit Successfull";
            Session["Officer"] = ho;
            return View("Empty");

        }

        User user = new User();
        [HttpGet]
        public ActionResult CreateAccount()
        {
            return View();
        }
         [HttpPost, ActionName("CreateAccount")]
        public ActionResult CreateAccount(User u)
        {
            UserRepository urepo = new UserRepository();
            LoginRepository lrepo = new LoginRepository();
            Logininfo li= lrepo.Get(u.User_Name);
            if (li == null)
            {
                TransactionRepository trepo = new TransactionRepository();
                Transaction tr = new Transaction();

                if (u.User_acc_type == "FDA")
                {
                    u.Deadline = DateTime.Today.AddYears(5).ToString();
                    tr.Tr_Type = "FDADeposit";
                }
                else
                {
                    u.Deadline = "No Deadline";
                    tr.Tr_Type = "CashDeposit";
                }
                
                urepo.Insert(u);

                ViewData["Message"] = "User Inserted Successfull";

                
                tr.Tr_Amount = u.User_balance;
                tr.Tr_Date = DateTime.Now.ToString("yyyy-MM-dd");
                tr.Tr_EmpType = "Officer";
                tr.Tr_AccName = u.User_Name;
                tr.Tr_Through = Session["Name"].ToString();
                tr.Tr_Branch = Session["Branch"].ToString();

                trepo.Insert(tr);

            }
            else
            {
                ViewData["Message"] = "Username in User";
            }
            
           
            return View("Empty");

        }

         


         [HttpGet]
         public ActionResult ChangePassword()
         {
             return View();
         }

         [HttpPost, ActionName("ChangePassword")]
         public ActionResult ConfirmChangePassword(string oldpass,string Pass, string cpass)
         {
             OfficerRepository orepo = new OfficerRepository();
             LoginRepository lrepo = new LoginRepository();

             Officer of = orepo.Get(Convert.ToInt32(Session["OfficerID"]));

             Logininfo log = lrepo.Get(Session["OfficerName"].ToString());

            if (Session["Password"].ToString() == oldpass)
            {
                if (Pass != cpass)
                {
                    ViewData["Message"] = "Password Didn't match";
                }
                else
                {
                    of.Officer_password = Pass;
                    log.Login_Password = Pass;

                    orepo.Update(of);
                    lrepo.Update(log);

                    ViewData["Message"] = "Password Updated Successfully";
                    Session["Officer"] = of;
                    Session["Password"] = Pass;

                }
            }
            else
            {
                ViewData["Message"] = "Wrong Password";
            }

             return View("Empty");
         }

        [HttpGet]
        public ActionResult TotalCustomers()
        {
            UserRepository urepo = new UserRepository();

            return View(urepo.GetAll());
        }
        [HttpGet]
        public ActionResult Cheak_C_Balance()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Cheak_C_Balance(string name)
        {   
            UserRepository urepo = new UserRepository();
            User us = urepo.Get(name);

            if (us==null)
            {
                ViewData["Message"] = "Not Found Any User";
                return View("Empty");
            }
            else
            {
                return RedirectToAction("newCheak_C_Balance", us);
            }
        }

        public ActionResult newCheak_C_Balance(User us)
        {
            return View(us);
        }

        [HttpGet]
        public ActionResult HomePage()
        {
            TransactionRepository urepo = new TransactionRepository();


            return View(urepo.GetByPos("Officer"));
        }

        public ActionResult MyProfile(string Tr_Through)
        {
            TransactionRepository urepo = new TransactionRepository();


            return View(urepo.GetByEmp(Session["Name"].ToString()));
        }

    }
}