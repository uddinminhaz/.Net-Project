using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;
using APIInterface;

namespace APIRepository
{
   public  class BranchManagerRepository : IBranchManagerRepository
    {
        MVCDbContext context = new MVCDbContext();

        public List<BranchManager> GetAll()
        {
            return context.BranchManagers.ToList();
        }

        public BranchManager Get(int Manager_Id)
        {
            return context.BranchManagers.SingleOrDefault(d => d.Manager_Id == Manager_Id);
        }
        public BranchManager Get(string username)
        {
            return context.BranchManagers.SingleOrDefault(d => d.Manager_Name == username);
        }

        public int Insert(BranchManager branchMangaer)
        {
            context.BranchManagers.Add(branchMangaer);
            context.SaveChanges();

            Logininfo li = new Logininfo();
            li.Login_acc_no = Get(branchMangaer.Manager_Name).Manager_Id;
            li.Login_Name = branchMangaer.Manager_Name;
            li.Login_Password = branchMangaer.Manager_password;
            li.Login_type = "Manager";
            context.Logininfos.Add(li);
            

            return context.SaveChanges();
        }

        public int Update(BranchManager branchMangaer)
        {
            BranchManager branchMangaerToUpdate = context.BranchManagers.SingleOrDefault(d => d.Manager_Id == branchMangaer.Manager_Id);
            branchMangaerToUpdate.Manager_Name = branchMangaer.Manager_Name;
            branchMangaerToUpdate.Manager_address = branchMangaer.Manager_address;
            branchMangaerToUpdate.Manager_Balance = branchMangaer.Manager_Balance;
            branchMangaerToUpdate.Manager_branch = branchMangaer.Manager_branch;
            branchMangaerToUpdate.Manager_LastPaymentDate = branchMangaer.Manager_LastPaymentDate;
            branchMangaerToUpdate.Manager_mobile = branchMangaer.Manager_mobile;
            branchMangaerToUpdate.Manager_password = branchMangaer.Manager_password;
            branchMangaerToUpdate.Manager_Salary = branchMangaer.Manager_Salary;
            branchMangaerToUpdate.Manager_TotalPayment = branchMangaer.Manager_TotalPayment;

            LoginRepository lrepo = new LoginRepository();
            Logininfo li = lrepo.Get(branchMangaer.Manager_Name);
            li.Login_Password = branchMangaer.Manager_password;
            lrepo.Update(li);

            return context.SaveChanges();
        }

        public int Delete(string Manager_Name)
        {
            BranchManager branchMangaerToDelete = context.BranchManagers.SingleOrDefault(d => d.Manager_Name == Manager_Name);
            context.BranchManagers.Remove(branchMangaerToDelete);
            return context.SaveChanges();
        }
    }
}
