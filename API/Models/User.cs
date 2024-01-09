using API.Controllers;

namespace API.Models
{
    public class User
    {
        public User()
        {
            UserId = Guid.NewGuid();
        }

        public User(User user)
        {
            UserId = user.UserId;
            UserName = user.UserName;
            PasswordHash = user.PasswordHash;
            Email = user.Email;
            OrderList = user.OrderList != null ? new List<Order>(user.OrderList) : null;
        }

        public User(UserLoginDto userDto)
        {
            UserId = Guid.NewGuid();
            //UserName = userDto.UserName;
            PasswordHash = userDto.Password;
            Email = userDto.Email;
        }

        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public List<Order> OrderList { get; set; }
    }
}
