using API.Models;

namespace API.Repositories
{
    public class OrderRepository
    {
        private readonly EStoreMovetechContext _context;

        public OrderRepository(EStoreMovetechContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateOrderAsync(Guid userId, List<OrderItem> orderItems)
        {
            var order = new Order
            {
                UserId = userId,
                OrderItemList = orderItems,
                OrderDate = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }

}
