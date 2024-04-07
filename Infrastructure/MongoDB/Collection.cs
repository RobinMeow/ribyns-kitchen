using MongoDB.Driver;

namespace Infrastructure.MongoDB;

public abstract class Collection
{
    protected static FindOptions s_findOptions = new FindOptions()
    {
        AllowDiskUse = false,
    };

    protected static AggregateOptions s_aggregateOptions = new AggregateOptions()
    {
        AllowDiskUse = false,
    };
}
