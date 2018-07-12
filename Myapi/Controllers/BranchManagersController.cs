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
    [RoutePrefix("api/Managers")]
    public class BranchManagersController : ApiController
    {

        BranchManagerRepository bmrepo = new BranchManagerRepository();
        LoginRepository lrepo = new LoginRepository();



        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.bmrepo.GetAll());
        }

        [Route("{Manager_Id}", Name = "GetBMById")]
        public IHttpActionResult Get(int Manager_Id)
        {
            BranchManager u = new BranchManager();
            u = this.bmrepo.Get(Manager_Id);
            List<BranchManager> ul = new List<BranchManager>();
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
        [HttpPost]
        [LoginAuthentication]
        public IHttpActionResult Post(BranchManager branchManager)
        {
            if (lrepo.Get(branchManager.Manager_Name) == null)
            {
                this.bmrepo.Insert(branchManager);
                string uri = Url.Link("GetBMById", new { id = branchManager.Manager_Id });
                return Created("GetBMById", branchManager);
            }
            else
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

        }

        [Route("")]
        [LoginAuthentication]
        [HttpPut]
        public IHttpActionResult Put(BranchManager branchManager)
        {
            this.bmrepo.Update(branchManager);
            return Ok(branchManager);
        }

        


    }
}
