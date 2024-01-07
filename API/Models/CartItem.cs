namespace API.Models
{
    public class CartItem
    {
        public CartItem()
        {
            CartItemId = Guid.NewGuid();
        }

        public CartItem(CartItem cartItem)
        {
            CartItemId = cartItem.CartItemId;
            ProductId = cartItem.ProductId;
            Quantity = cartItem.Quantity;
        }

        public Guid CartItemId { get; set; }
        public Guid CartId { get; set; } 
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }

        // Navigation properties
        public Cart Cart { get; set; }
        public Product Product { get; set; }
    }

}
