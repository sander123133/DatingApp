using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T enitiy) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> getUsers();
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id);

         Task<Photo> getMainPhotoForUser(int userId);

    }
}