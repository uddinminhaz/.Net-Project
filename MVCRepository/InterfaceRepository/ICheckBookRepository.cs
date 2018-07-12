using APIInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIInterface
{
    public interface ICheckBookRepository
    {
        List<CheckBook> GetAll();
       
        int Insert(CheckBook checkbook);
        int Update(CheckBook checkbook);
       
    }
}
