namespace API.Models
{
    public class OrderItem
    {
        public OrderItem()
        {
            OrderItemId = Guid.NewGuid();
        }

        public OrderItem(OrderItem orderItem)
        {
            OrderItemId = orderItem.OrderItemId;
            Quantity = orderItem.Quantity;
            Price = orderItem.Price;
            OrderId = orderItem.OrderId;
            Order = orderItem.Order != null ? new Order(orderItem.Order) : null;
            ProductId = orderItem.ProductId;
            Product = orderItem.Product != null ? new Product(orderItem.Product) : null;
        }

        public Guid OrderItemId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
    }
}
