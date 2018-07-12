using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIEntity
{
    public class LInfo
    {
        [Key]
        public int Loan_Id { get; set; }
        public int User_acc_no { get; set; }
        public string User_Name { get; set; }
        public double Loan_Amount { get; set; }
        public double AmountTo_Pay { get; set; }
        public double Interest_Rate { get; set; }
        public double Loan_Amount_Paid { get; set; }
        public string Loan_Date { get; set; }
        public string Loan_Deadline{ get; set; }
        public string Manager_Approval { get; set; }
        public string MD_Approval { get; set; }
        public string Status { get; set; }
    }
}
