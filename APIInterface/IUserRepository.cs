using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;

namespace APIInterface
{
   public interface IUserRepository
    {
        List<User> GetAll();
        User Get(int id);
        User Get(string username);
        int Insert(User user);
        int Update(User user);
        int Delete(string id);
        
    }
}
