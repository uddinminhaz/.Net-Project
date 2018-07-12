using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using APIRepository;
using APIEntity;
using Myapi.Attributes;

namespace Myapi.Controllers
{
    [RoutePrefix("api/LoginCheck")]
    [LoginAuthentication]
    public class LoginController : ApiController
    {
        [Route("")][HttpPost]
        public IHttpActionResult Login(Logininfo Login)
        {
            List<Logininfo> lu = new List<Logininfo>();

            LoginRepository lrepo = new LoginRepository();
            //string[] str = lrepo.checkLogin(Login.Login_Name, Login.Login_Password);

            Login = lrepo.Get(Login.Login_Name);
            lu.Add(Login);

            return Ok(lu);
        }

        //[Route("LoginDelete/")]
        //[HttpDelete]
        //public IHttpActionResult Delete(Logininfo login)
        //{
        //    LoginRepository lrepo = new LoginRepository();
        //    Logininfo log= lrepo.Get(login.Login_Name);


        //    if(log != null && log.Login_type!="User" && log.Login_acc_no== login.Login_acc_no)
        //    {
        //        MDirectorRepository mrepo = new MDirectorRepository();
        //        CashierRepository crepo = new CashierRepository();
        //        OfficerRepository orepo = new OfficerRepository();
        //        BranchManagerRepository brepo = new BranchManagerRepository();

        //        mrepo.Delete(log.Login_Name);
        //        crepo.Delete(log.Login_Name);
        //        orepo.Delete(log.Login_Name);
        //        brepo.Delete(log.Login_Name);
        //        lrepo.Delete(log.Login_Name);

        //        return Ok();

        //    }
        //    else
        //    {
        //        return StatusCode(HttpStatusCode.Forbidden);
        //    }

            
        //}


    }
}
