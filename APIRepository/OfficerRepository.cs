using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;
using APIInterface;

namespace APIRepository
{
   public  class OfficerRepository : IOfficerRepository
    {
        MVCDbContext context = new MVCDbContext();

        public List<Officer> GetAll()
        {
            return context.Officers.ToList();
        }

        public Officer Get(string username)
        {
            return context.Officers.SingleOrDefault(d => d.Officer_Name == username);
        }
        public Officer Get(int Officer_Id)
        {
            return context.Officers.SingleOrDefault(d => d.Officer_Id == Officer_Id);
        }

        public int Insert(Officer officer)
        {
            
            context.Officers.Add(officer);
            context.SaveChanges();

            Logininfo li = new Logininfo();
            li.Login_acc_no = Get(officer.Officer_Name).Officer_Id;
            li.Login_Name = officer.Officer_Name;
            li.Login_Password = officer.Officer_password;
            li.Login_type = "Officer";
            context.Logininfos.Add(li);

            return context.SaveChanges();
        }

        public int Update(Officer officer)
        {
            Officer officerToUpdate = context.Officers.SingleOrDefault(d => d.Officer_Id == officer.Officer_Id);

            officerToUpdate.Officer_Name = officer.Officer_Name;
            officerToUpdate.Officer_address = officer.Officer_address;
            officerToUpdate.Officer_Balance = officer.Officer_Balance;
            officerToUpdate.Officer_branch = officer.Officer_branch;
            officerToUpdate.Officer_LastPaymentDate = officer.Officer_LastPaymentDate;
            officerToUpdate.Officer_password = officer.Officer_password;
            officerToUpdate.Officer_Salary = officer.Officer_Salary;
            officerToUpdate.Officer_TotalPayment = officer.Officer_TotalPayment;
            officerToUpdate.Officer_mobile = officer.Officer_mobile;

            LoginRepository lrepo = new LoginRepository();
            Logininfo li = lrepo.Get(officer.Officer_Name);
            li.Login_Password = officer.Officer_password;
            lrepo.Update(li);

            return context.SaveChanges();
        }

        public int Delete(string Officer_Name)
        {
            Officer officerToDelete = context.Officers.SingleOrDefault(d => d.Officer_Name == Officer_Name);
            context.Officers.Remove(officerToDelete);
            return context.SaveChanges();
        }
    }
}
