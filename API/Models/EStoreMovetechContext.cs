﻿using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class EStoreMovetechContext : DbContext
    {
        public EStoreMovetechContext(DbContextOptions<EStoreMovetechContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<User>()
                .HasMany(u => u.OrderList)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);


            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.ProductList)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Product>()
               .Property(p => p.Price)
               .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItemList)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId);


            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany(p => p.OrderItemList)
                .HasForeignKey(oi => oi.ProductId);

            modelBuilder.Entity<OrderItem>()
               .Property(p => p.Price)
               .HasColumnType("decimal(18, 2)");


            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);


            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Cart>()
               .HasMany(c => c.CartItems)
               .WithOne(ci => ci.Cart)
               .HasForeignKey(ci => ci.CartId);

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Product)
                .WithMany(p => p.CartItems)
                .HasForeignKey(ci => ci.ProductId);

            var electronicsCategory = new Category { CategoryId = Guid.NewGuid(), Name = "Elektronik" };
            var bookCategory = new Category { CategoryId = Guid.NewGuid(), Name = "Kitap" };
            modelBuilder.Entity<Category>().HasData(
               electronicsCategory, bookCategory

            );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Email = "nacianilakman@gmail.com.com",
                    UserName = "nacianil",
                    PasswordHash = "d630bbca6d9aeac6e1eff1e8eccc093be85a92843e248415f3f666fefa5b14e0",
                    UserId = Guid.NewGuid()
                });

            modelBuilder.Entity<Product>().HasData(
                 new Product
                 {
                     ProductId = Guid.NewGuid(),
                     Name = "Laptop",
                     Description = "Yüksek performanslı oyun ve iş laptopu.",
                     Price = 15000.00m,
                     CategoryId = electronicsCategory.CategoryId
                 },
                 new Product
                 {
                     ProductId = Guid.NewGuid(),
                     Name = "Roman Kitabı",
                     Description = "Çok satan romanlardan biri.",
                     Price = 45.00m,
                     CategoryId = bookCategory.CategoryId
                 }
             );



        }

    }
}
