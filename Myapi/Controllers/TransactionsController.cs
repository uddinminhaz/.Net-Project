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
    [RoutePrefix("api/Transactions")]
    [LoginAuthentication]

    public class TransactionsController : ApiController
    {

        TransactionRepository trepo = new TransactionRepository();



        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.trepo.GetAll());
        }
        //Getby_Type
       
        [Route("{Tr_Type}", Name = "GetTransactionTr_Type")]
        public IHttpActionResult GetbyTr_Type(string Tr_Type)
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetByType(Tr_Type);

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }
        //Getby_through
      [HttpGet]
        [Route("GetByEmp/{Tr_Through}")]
        public IHttpActionResult GetByEmp(string Tr_Through)
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetByEmp(Tr_Through);

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        //Get By Emp Type
        [HttpGet]
        [Route("GetByPos/{Tr_EmpType}")]
        public IHttpActionResult GetByPos(string Tr_EmpType)
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetByPos(Tr_EmpType);

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        //get By Today
        [HttpGet]
        [Route("GetToday")]
        public IHttpActionResult GetToday()
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetToday();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        //get By Today By Manager
        [HttpGet]
        [Route("GetToday/{Manager_branch}")]
        public IHttpActionResult GetToday(string Manager_branch)
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetToday(Manager_branch);

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }


        //get By Yestarday
        [HttpGet]
        [Route("GetYesterday")]
        public IHttpActionResult GetYesterday()
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetYesterday();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        //get By Yestardat By Manager
        [HttpGet]
        [Route("GetYesterday/{Manager_branch}")]
        public IHttpActionResult GetYesterday(string Manager_branch)
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetYesterday(Manager_branch);

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        //Get 6 month
        [HttpGet]
        [Route("Get6Months")]
        public IHttpActionResult Get6Months()
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.Get6Months();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }
        //Get 6 month By branch
        [HttpGet]
        [Route("Get6Month/{Manager_branch}")]
        public IHttpActionResult Get6Months(string Manager_branch)
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.Get6Months(Manager_branch);

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        //current year
        [HttpGet]
        [Route("GetCurrentYear")]
        public IHttpActionResult GetCurrentYear()
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetCurrentYear();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        //Get currentyear by branch
        [HttpGet]
        [Route("GetCurrentYear/{Manager_branch}")]
        public IHttpActionResult GetCurrentYear(string Manager_branch)
        {
            List<Transaction> ll = new List<Transaction>();
            ll = this.trepo.GetCurrentYear(Manager_branch);

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        [Route("")]
        public IHttpActionResult Post(Transaction transaction)
        {

            this.trepo.Insert(transaction);
            string uri = Url.Link("GetUserById", new { id = transaction.Tr_Id });
            return Created("GetCategoryById", transaction);
        }

        
    }
}
