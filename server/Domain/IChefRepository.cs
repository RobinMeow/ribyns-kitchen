namespace api.Domain;

public interface IChefRepository
{
    Task AddAsync(Chef chef, CancellationToken cancellationToken = default);
    Task<Chef?> GetByNameAsync(string chefname, CancellationToken cancellationToken = default);
    Task<Chef?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<IEnumerable<Chef>> GetAllAsync(CancellationToken cancellationToken = default);
    Task RemoveAsync(string chefname, CancellationToken cancellationToken = default);
}
