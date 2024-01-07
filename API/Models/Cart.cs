using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Cart
    {
        public Cart()
        {
            CartId = Guid.NewGuid();
            CartItems = new List<CartItem>();
        }

        public Cart(Cart cart)
        {
            CartId = cart.CartId;
            UserId = cart.UserId;
            CartItems = new List<CartItem>(cart.CartItems);
        }

        public Guid CartId { get; set; } 
        public Guid UserId { get; set; }

   
        public List<CartItem> CartItems { get; set; }

       
        public User User { get; set; }
    }
}
