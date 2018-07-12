using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;

namespace APIInterface
{
    public interface IMDirectorRepository
    {
        List<MDirector> GetAll();
        MDirector Get(int MD_Id);
        int Insert(MDirector MDirector);
        int Update(MDirector MDirector);
        int Delete(string MD_Id);

    }
}
