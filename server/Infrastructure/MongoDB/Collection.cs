using MongoDB.Driver;

namespace api.Infrastructure.MongoDB;

public abstract class Collection
{
    protected static FindOptions s_findOptions = new FindOptions()
    {
        AllowDiskUse = false,
    };
}
