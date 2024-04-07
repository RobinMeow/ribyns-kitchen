namespace Domain;

public interface IChefRepository
{
    ValueTask AddAsync(Chef chef, CancellationToken ct = default);

    ValueTask<Chef?> GetByNameAsync(string chefname, CancellationToken ct = default);

    ValueTask<Chef?> GetByEmailAsync(string email, CancellationToken ct = default);

    ValueTask<IQueryable<Chef>> GetAllAsync(CancellationToken ct = default);

    ValueTask RemoveAsync(string chefname, CancellationToken ct = default);
}
