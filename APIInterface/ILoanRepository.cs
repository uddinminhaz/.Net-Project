using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using APIEntity;

namespace APIInterface
{
    public interface ILoanRepository
    {
        List<LInfo> GetAll();
        LInfo Get(int id);
        int Insert(LInfo loan);
        int Update(LInfo loan);
        
    }
}
