using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Dynamic;
using APIEntity;
using APIRepository;
using APIInterface;
namespace APIApp.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        //public ActionResult Index(String String)
        //{
        //    ViewData["name"] = String;
        //    return View();
        //}

        public ActionResult Index()
        {
            UserRepository urepo = new UserRepository();

            return View(urepo.GetAll());
        }

    }
}