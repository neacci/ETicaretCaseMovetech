using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class SalesReportRepository
    {
        private readonly EStoreMovetechContext _context;

        public SalesReportRepository(EStoreMovetechContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetSalesReportAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Orders
                .Include(o => o.OrderItemList)
                .ThenInclude(oi => oi.Product)
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .ToListAsync();
        }

        public async Task<decimal> CalculateTotalRevenueAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Orders
                .Include(o => o.OrderItemList)
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .SelectMany(o => o.OrderItemList)
                .SumAsync(oi => oi.Price * oi.Quantity);
        }

        public async Task<IEnumerable<CategorySalesReport>> GetSalesByCategoryAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.OrderItems
                .Include(oi => oi.Product)
                .ThenInclude(p => p.Category)
                .Where(oi => oi.Order.OrderDate >= startDate && oi.Order.OrderDate <= endDate)
                .GroupBy(oi => oi.Product.Category)
                .Select(g => new CategorySalesReport
                {
                    Category = g.Key.Name,
                    TotalSales = g.Sum(oi => oi.Price * oi.Quantity)
                })
                .ToListAsync();
        }
    }

    public class CategorySalesReport
    {
        public string Category { get; set; }
        public decimal TotalSales { get; set; }
    }
}
