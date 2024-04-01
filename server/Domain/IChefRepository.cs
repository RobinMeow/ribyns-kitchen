namespace api.Domain;

public interface IChefRepository
{
    Task AddAsync(Chef chef, CancellationToken ct = default);

    Task<Chef?> GetByNameAsync(string chefname, CancellationToken ct = default);

    Task<Chef?> GetByEmailAsync(string email, CancellationToken ct = default);

    Task<IEnumerable<Chef>> GetAllAsync(CancellationToken ct = default);

    Task RemoveAsync(string chefname, CancellationToken ct = default);
}
