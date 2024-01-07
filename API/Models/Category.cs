namespace API.Models
{
    public class Category
    {
        public Category()
        {
            CategoryId = Guid.NewGuid();
        }

        public Category(Category category)
        {
            CategoryId = category.CategoryId;
            Name = category.Name;
            ProductList = category.ProductList != null ? new List<Product>(category.ProductList) : null;
        }

        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public List<Product> ProductList { get; set; }
    }
}
