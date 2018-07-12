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
    [RoutePrefix("api/Admins")]
    public class AdminsController : ApiController
    {
        AdminRepository arepo = new AdminRepository();



        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.arepo.GetAll());
        }
        [Route("{Admin_Id}", Name = "GetAdminById")]
        public IHttpActionResult Get(int Admin_Id)
        {
            List<Admin> ul = new List<Admin>();
            Admin u = new Admin();
            u = this.arepo.Get(Admin_Id);
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
        public IHttpActionResult Post(Admin admin)
        {

            this.arepo.Insert(admin);
            string uri = Url.Link("GetUserById", new { id = admin.Admin_Id });
            return Created("GetCategoryById", admin);
        }

        [Route("")]
        [LoginAuthentication]
        [HttpPut]
        public IHttpActionResult Put(Admin admin)
        {
           
            this.arepo.Update(admin);
            return Ok(admin);
        }

        [Route("{Admin_Id}")]
        public IHttpActionResult Delete([FromUri]int Admin_Id)
        {
            this.arepo.Delete(Admin_Id);
            return StatusCode(HttpStatusCode.NoContent);
        }

    }
}
