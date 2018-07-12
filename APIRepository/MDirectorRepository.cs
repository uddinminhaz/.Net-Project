using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;
using APIInterface;

namespace APIRepository
{
    public class MDirectorRepository : IMDirectorRepository
    {
        MVCDbContext context = new MVCDbContext();

        public List<MDirector> GetAll()
        {
            return context.MDirectors.ToList();
        }

        public MDirector Get(int id)
        {
            return context.MDirectors.SingleOrDefault(d => d.MD_Id == id);
        }
        public MDirector Get(string username)
        {
            return context.MDirectors.SingleOrDefault(d => d.MD_name == username);
        }

        public int Insert(MDirector MDirector)
        {
            context.MDirectors.Add(MDirector);
            context.SaveChanges();

            Logininfo li = new Logininfo();
            li.Login_acc_no = Get(MDirector.MD_name).MD_Id;
            li.Login_Name = MDirector.MD_name;
            li.Login_Password = MDirector.MD_password;
            li.Login_type = "MD";
            context.Logininfos.Add(li);

            return context.SaveChanges();
        }

        public int Update(MDirector MDirector)
        {
            MDirector MDirectorToUpdate = context.MDirectors.SingleOrDefault(d => d.MD_Id == MDirector.MD_Id);
            MDirectorToUpdate.MD_name = MDirector.MD_name;
            MDirectorToUpdate.MD_password = MDirector.MD_password;
            MDirectorToUpdate.MD_address = MDirector.MD_address;
            MDirectorToUpdate.MD_mobile = MDirector.MD_mobile;
            MDirectorToUpdate.MD_Salary = MDirector.MD_Salary;
            MDirectorToUpdate.MD_mobile = MDirector.MD_mobile;

            LoginRepository lrepo = new LoginRepository();
            Logininfo li = lrepo.Get(MDirector.MD_name);
            li.Login_Password = MDirector.MD_password;
            lrepo.Update(li);

            return context.SaveChanges();
        }

        public int Delete(string MD_name)
        {
            MDirector MDirectorToDelete = context.MDirectors.SingleOrDefault(d => d.MD_name == MD_name);
            context.MDirectors.Remove(MDirectorToDelete);
            return context.SaveChanges();
        }


    }
}
