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
    [RoutePrefix("api/Cashiers")]
    
    public class ChasiersController : ApiController
    {

        CashierRepository crepo = new CashierRepository();
        LoginRepository lrepo = new LoginRepository();



        [Route("")][LoginAuthentication]
        public IHttpActionResult Get()
        {
            return Ok(this.crepo.GetAll());
        }

        [Route("{Cashier_Id}", Name = "GetCashierById")]
        public IHttpActionResult Get(int Cashier_Id)
        {
            List<Cashier> cl = new List<Cashier>();
            
            Cashier u = this.crepo.Get(Cashier_Id);
            cl.Add(u);

            if (u == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(cl);
            }
        }

        [Route("")]
        [LoginAuthentication]
        [HttpPost]
        public IHttpActionResult Post(Cashier cashier)
        {
            if (lrepo.Get(cashier.Cashier_Name)==null)
            {
                this.crepo.Insert(cashier);
                string uri = Url.Link("GetUserById", new { id = cashier.Cashier_Id });
                return Created("GetCategoryById", cashier);
            }
            else
            {
                return StatusCode(HttpStatusCode.Forbidden);
            }

            
        }

        [Route("")]
        [LoginAuthentication]
        [HttpPut]
        public IHttpActionResult Put(Cashier cashier)
        {
            this.crepo.Update(cashier);
            return Ok(cashier);
        }

        
    }
}
