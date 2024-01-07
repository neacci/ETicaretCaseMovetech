using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Product
    {
        public Product()
        {
            ProductId = Guid.NewGuid();
            OrderItemList = new List<OrderItem>();
            CartItems = new List<CartItem>();
        }

        public Product(Product product)
        {
            ProductId = product.ProductId;
            Name = product.Name;
            Price = product.Price;
            Description = product.Description;
            CategoryId = product.CategoryId;
            Category = product.Category != null ? new Category(product.Category) : null;
            OrderItemList = product.OrderItemList != null ? new List<OrderItem>(product.OrderItemList) : null;
            CartItems = product.CartItems != null ? new List<CartItem>(product.CartItems) : null; 
        }

        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        public List<OrderItem> OrderItemList { get; set; } 
        public List<CartItem> CartItems { get; set; }     
    }
}
