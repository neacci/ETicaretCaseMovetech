using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class CartRepository
    {
        private readonly EStoreMovetechContext _context;

        public CartRepository(EStoreMovetechContext context)
        {
            _context = context;
        }

        public async Task AddItemToCartAsync(Guid userId, Guid productId, int quantity)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
            }

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem != null)
            {
                cartItem.Quantity += quantity;
            }
            else
            {
                _context.CartItems.Add(new CartItem { ProductId = productId, Quantity = quantity, CartItemId = Guid.NewGuid(), CartId = cart.CartId });
                //cart.CartItems.Add();
            }

            await _context.SaveChangesAsync();
        }

        public async Task RemoveItemFromCartAsync(Guid userId, Guid productId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart != null)
            {
                var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
                if (cartItem != null)
                {
                    cart.CartItems.Remove(cartItem);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public async Task<Cart> GetCartAsync(Guid userId)
        {
            return await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);
        }

        public async Task ClearCartAsync(Guid userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart != null)
            {
                _context.CartItems.RemoveRange(cart.CartItems);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateItemInCartAsync(Guid userId, Guid productId, int quantity)
        {
            var cart = await _context.Carts.Include(c => c.CartItems)
                                           .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                throw new InvalidOperationException("Sepet bulunamadı.");
            }

            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
            if (cartItem == null)
            {
                throw new InvalidOperationException("Sepette bu ürün bulunamadı.");
            }

            if (quantity > 0)
            {
                cartItem.Quantity = quantity;
            }
            else
            {
                cart.CartItems.Remove(cartItem);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<List<CartItem>> GetCartItemsAsync(Guid userId)
        {
            return await _context.CartItems
                .Where(ci => ci.Cart.UserId == userId)
                .Include(ci => ci.Product) 
                .ToListAsync();
        }
    }
}
