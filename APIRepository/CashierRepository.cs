using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;
using APIInterface;

namespace APIRepository
{
   public  class CashierRepository : ICashierRepository
    {
        MVCDbContext context = new MVCDbContext();

        public List<Cashier> GetAll()
        {
            return context.Cashiers.ToList();
        }

        public Cashier Get(int Cashier_Id)
        {
            return context.Cashiers.SingleOrDefault(d => d.Cashier_Id == Cashier_Id);
        }
        public Cashier Get(string username)
        {
            return context.Cashiers.SingleOrDefault(d => d.Cashier_Name == username);
        }

        public int Insert(Cashier cashier)
        {
            context.Cashiers.Add(cashier);
            context.SaveChanges();

            Logininfo li = new Logininfo();
            li.Login_acc_no = Get(cashier.Cashier_Name).Cashier_Id;
            li.Login_Name = cashier.Cashier_Name;
            li.Login_Password = cashier.Cashier_password;
            li.Login_type = "Cashier";
            context.Logininfos.Add(li);

            return context.SaveChanges();
        }

        public int Update(Cashier cashier)
        {
            Cashier cashierToUpdate = context.Cashiers.SingleOrDefault(d => d.Cashier_Id == cashier.Cashier_Id);
            cashierToUpdate.Cashier_Name = cashier.Cashier_Name;
            cashierToUpdate.Cashier_address = cashier.Cashier_address;
            cashierToUpdate.Cashier_branch = cashier.Cashier_branch;
            cashierToUpdate.Cashier_LastPaymentDate = cashier.Cashier_LastPaymentDate;
            cashierToUpdate.Cashier_mobile = cashier.Cashier_mobile;
            cashierToUpdate.Cashier_password = cashier.Cashier_password;
            cashierToUpdate.Cashier_Salary = cashier.Cashier_Salary;
            cashierToUpdate.Cashier_Balance = cashier.Cashier_Balance;
            cashierToUpdate.Cashier_TotalPayment = cashier.Cashier_TotalPayment;

            LoginRepository lrepo = new LoginRepository();
            Logininfo li = lrepo.Get(cashier.Cashier_Name);
            li.Login_Password = cashier.Cashier_password;
            lrepo.Update(li);

            return context.SaveChanges();
        }

        public int Delete(string Cashier_Name)
        {
            Cashier cashierToDelete = context.Cashiers.SingleOrDefault(d => d.Cashier_Name == Cashier_Name);
            context.Cashiers.Remove(cashierToDelete);
            return context.SaveChanges();
        }
    }
}
