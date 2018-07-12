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
    [RoutePrefix("api/Loans")]
    public class LoansController : ApiController
    {
        LoanRepository trepo = new LoanRepository();


        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.trepo.GetAll());
        }

        //[Route("{id}")]
        //public IHttpActionResult Get(int id)
        //{
        //    return Ok(this.trepo.Get(id));
        //}

        [Route("GetUser/{User_acc_no}")]
        public IHttpActionResult GetUser(int User_acc_no)
        {
            LInfo u = trepo.GetUser(User_acc_no);
            List<LInfo> ul = new List<LInfo>();
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
        public IHttpActionResult Post(LInfo lInfo)
        {   
            this.trepo.Insert(lInfo);
            string uri = Url.Link("GetUserById", new { id = lInfo.User_acc_no });
            return Created("GetCategoryById", lInfo);
        }


        //*****PRoblematic/ may be not
        [Route("")]
        [LoginAuthentication]
        [HttpPut]
        public IHttpActionResult Put(LInfo loan)
        {
            this.trepo.Update(loan);
            return Ok(loan);
        }

        //prb
        [HttpPut]
        [Route("MD_Approval_Update/{Loan_Id}")]
        public IHttpActionResult MD_Approval_Update(LInfo loan,int Loan_Id)
        {
            loan.Loan_Id = Loan_Id;
            this.trepo.MD_Approval_Update(loan);
            return Ok(loan);
        }
        [HttpPut]
        //prb
        [Route("Manager_Approval_Update/{Loan_Id}")]
        public IHttpActionResult Manager_Approval_Update(LInfo loan, int Loan_Id)
        {
            loan.Loan_Id = Loan_Id;
            this.trepo.MD_Approval_Update(loan);
            return Ok(loan);
        }
        // get all unppraove

        [HttpGet]
        [Route("GetAllUnapproved")]
        public IHttpActionResult GetAllUnapproved()
        {
            List<LInfo> ll = new List<LInfo>();
            ll = this.trepo.GetAllUnapproved();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        // get all GetAllActive
        [HttpGet]
        [Route("GetAllActive")]
        public IHttpActionResult GetAllActive()
        {
            List<LInfo> ll = new List<LInfo>();
            ll = this.trepo.GetAllActive();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        // get all GetAllInActive
        [HttpGet]
        [Route("GetAllInActive")]
        public IHttpActionResult GetAllInActive()
        {
            List<LInfo> ll = new List<LInfo>();
            ll = this.trepo.GetAllInActive();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }

        // get all GetAllNoapprovalfromMD
        [HttpGet]
        [Route("GetAllNoapprovalfromMD")]
        public IHttpActionResult GetAllNoapprovalfromMD()
        {
            List<LInfo> ll = new List<LInfo>();
            ll = this.trepo.GetAllNoapprovalfromMD();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }
        //get By GetAllNoapprovalfromManager By Manager
        
        [Route("GetAllNoapprovalfromManager")]
        public IHttpActionResult GetAllNoapprovalfromManager()
        {
            List<LInfo> ll = new List<LInfo>();
            ll = this.trepo.GetAllNoapprovalfromManager();

            if (ll == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return Ok(ll);
            }
        }


    }
}
