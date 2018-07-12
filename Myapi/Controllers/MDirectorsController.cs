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
    [RoutePrefix("api/MD")]
    public class MDirectorsController : ApiController
    {

        MDirectorRepository mrepo = new MDirectorRepository();
        LoginRepository lrepo = new LoginRepository();


        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.mrepo.GetAll());
        }
        [Route("{MD_Id}", Name = "GetmDirectorById")]
        public IHttpActionResult Get(int MD_Id)
        {
            List<MDirector> ul = new List<MDirector>();
            MDirector u = new MDirector();
            u = this.mrepo.Get(MD_Id);
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
        public IHttpActionResult Post(MDirector mDirector)
        {
            if (lrepo.Get(mDirector.MD_name)==null)
            {
                this.mrepo.Insert(mDirector);
                string uri = Url.Link("GetUserById", new { id = mDirector.MD_Id });
                return Created("GetCategoryById", mDirector);
            }
            else
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }
            
        }

        [Route("")]
        [LoginAuthentication]
        [HttpPut]
        public IHttpActionResult Put(MDirector mDirector)
        {
            this.mrepo.Update(mDirector);
            return Ok(mDirector);
        }

        

    }
}
