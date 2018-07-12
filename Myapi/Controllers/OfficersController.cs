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
    [RoutePrefix("api/Officers")]
    
    public class OfficersController : ApiController
    {

        OfficerRepository orepo = new OfficerRepository();
        LoginRepository lrepo = new LoginRepository();

        [Route("")]
        [LoginAuthentication]
        public IHttpActionResult Get()
        {
            return Ok(this.orepo.GetAll());
        }

        [Route("{Officer_Id}", Name = "GetofficerById")]
        [LoginAuthentication]
        public IHttpActionResult Get(int Officer_Id)
        {
            Officer u = new Officer();
            u = this.orepo.Get(Officer_Id);

            List<Officer> ul = new List<Officer>();
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
        public IHttpActionResult Post(Officer officer)
        {
            if (lrepo.Get(officer.Officer_Name)==null)
            {
                this.orepo.Insert(officer);
                string uri = Url.Link("GetUserById", new { id = officer.Officer_Id });
                return Created("GetCategoryById", officer);
            }
            else
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            
        }

        [Route("")]
        [LoginAuthentication]
        [HttpPut]
        public IHttpActionResult Put(Officer officer)
        {
            this.orepo.Update(officer);
            return Ok(officer);
        }

        
    }
}
