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
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Home(Admin a)
        {
            Session["Admin"] = a;
            Session["Password"] = a.Admin_password;
            return RedirectToAction("Home1");
        }

        public ActionResult Home1()
        {
            return View(Session["Admin"]);
        }

        [HttpGet]
        public ActionResult AddBranch()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddMD()
        {
            return View();
        }

        [HttpPost, ActionName("AddMD")]
        public ActionResult ConfirmAddMD(MDirector md)
        {
            LoginRepository lrepo = new LoginRepository();

            if (lrepo.Get(md.MD_name) == null)
            {
                MDirectorRepository repo = new MDirectorRepository();
                repo.Insert(md);
                ViewData["Message"] = "MD inserted successfully";
            }else
            {
                ViewData["Message"] = "Username In User";
            }

            return View("Empty");
        }

    }
}