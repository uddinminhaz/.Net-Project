using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;
using APIInterface;

namespace APIRepository
{
   public  class UserRepository : IUserRepository
    {
        MVCDbContext context = new MVCDbContext();
        LoginRepository lrepo = new LoginRepository();

        public List<User> GetAll()
        {
            return context.Users.ToList();
        }

        public User Get(int id)
        {
            return context.Users.SingleOrDefault(d => d.User_acc_no == id);
        }
  
        public User Get(string username)
        {
            return context.Users.SingleOrDefault(d => d.User_Name == username);
        }

        public int Insert(User User)
        {
                context.Users.Add(User);
                context.SaveChanges();

                Logininfo li = new Logininfo();
                li.Login_acc_no = Get(User.User_Name).User_acc_no;
                li.Login_Name = User.User_Name;
                li.Login_Password = User.User_password;
                li.Login_type = "User";
                context.Logininfos.Add(li);

                return context.SaveChanges();
            

        }

        public int Update(User User)
        {
            User userToUpdate = context.Users.SingleOrDefault(d => d.User_acc_no == User.User_acc_no);

            userToUpdate.User_address = User.User_address;
            userToUpdate.User_balance = User.User_balance;
            userToUpdate.User_mobile = User.User_mobile;
            userToUpdate.Deadline = User.Deadline;
            userToUpdate.User_password = User.User_password;

            LoginRepository lrepo = new LoginRepository();
            Logininfo li = lrepo.Get(User.User_Name);
            li.Login_Password = User.User_password;
            lrepo.Update(li);

            return context.SaveChanges();
        }
        public void Get(object v)
        {
            throw new NotImplementedException();
        }

        public int Delete(string User_Name)
        {
            User userToDelete = context.Users.SingleOrDefault(d => d.User_Name == User_Name);
            context.Users.Remove(userToDelete);
            return context.SaveChanges();
        }
    }
}
