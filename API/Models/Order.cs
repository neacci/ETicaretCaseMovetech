namespace API.Models
{
    public class Order
    {
        public Order()
        {
            OrderId = Guid.NewGuid();
        }

        public Order(Order order)
        {
            OrderId = order.OrderId;
            OrderDate = order.OrderDate;
            UserId = order.UserId;
            User = order.User != null ? new User(order.User) : null;
            OrderItemList = order.OrderItemList != null ? new List<OrderItem>(order.OrderItemList) : null;
        }

        public Guid OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public List<OrderItem> OrderItemList { get; set; }
    }
}
