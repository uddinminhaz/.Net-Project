using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using APIInterface;
using APIRepository;
using APIEntity;
using Myapi.Attributes;

namespace Myapi.Controllers
{
    [RoutePrefix("api/Users")]
    
    public class UsersController : ApiController
    {

        UserRepository urepo = new UserRepository();
        LoginRepository lrepo = new LoginRepository();

        [Route("")]
        [LoginAuthentication]
        public IHttpActionResult Get()
        {
            return Ok(this.urepo.GetAll());
        }
        

        [Route("{User_acc_no}", Name = "GetUserById")]
        public IHttpActionResult Get(int User_acc_no)
        {
            User u = new User();
            u = this.urepo.Get(User_acc_no);
            List<User> ul = new List<User>();
            ul.Add(u);


            if (u == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ul);
            }
        }


        [Route("")]
        [LoginAuthentication]
        [HttpPost]
        public IHttpActionResult Post(User user)
        {
            if (lrepo.Get(user.User_Name) == null )
            {
                if (this.urepo.Get(user.User_Name) == null)
                {
                    this.urepo.Insert(user);
                    string uri = Url.Link("GetUserById", new { id = user.User_acc_no });
                    return Created("GetCategoryById", user);
                }else
                {
                    return StatusCode(HttpStatusCode.Forbidden);
                }

            }
            else
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }
 
        }

        [Route("")]
        [LoginAuthentication]
        [HttpPut]
        public IHttpActionResult Put(User user)
        { 
            this.urepo.Update(user);
            return Ok(user);
        }

        

    }
}
