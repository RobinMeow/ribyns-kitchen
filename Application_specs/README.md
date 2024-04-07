# Unit Tests

run `dotnet test .\api-tests.csproj` to excute the tests in the command line

produce a test resultfile `dotnet test  -- NUnit.TestOutputXml=yourfoldername` make sure to add this folder to gitingore

Since I don't really know ay 'should'-conventions my tests are inspired by [Structure and Interpretation of Test Cases - Kevlin Henney - GOTO 2022](https://www.youtube.com/watch?v=MWsk1h8pv2Q)

Short Summary:

- a test is more like a (sentence readable) statement of the domain.
- for better readability `use_underscore_to_write_your_methods` and not `PascalCase`.
- same applies for classes and namespaces. make use of them, as the framework allows you.

Exmaple from Kevlin Henney in the talk linked above (he shows how he makes use of the class name for DRY):

```csharp
namespace Leap_year_specifications;

public sealed class A_year_is_a_leap_year
{
    [Test]
    public void if_it_is_divisible_by_4_but_not_by_100(
        [Values(2020, 2016, 1984, 4)] int year) {}

    [Test]
    public void if_it_is_divisible_by_400(
        [Range(400, 4000, 400)] int year) {}
}

public sealed class A_year_is_not_a_leap_year
{
    [Test]
    public void if_it_is_not_divisible_by_4(
        [Values(2020, 2019, 1999, 1)] int year) {}

    [Test]
    public void if_it_is_divisible_by_100_but_not_by_400(
        [Values(2100, 1900, 100)] int year) {}
}

public sealed class A_year_is_supported
{
    [Test]
    public void if_it_is_positive([Values(1, int.MaxValue)] int year)
    {
        Assert.DoesNotThrow(() => IsLeapYear(year));
    }
}

public sealed class A_year_is_not_supported
{
    [Test]
    public void if_it_is_0()
    {
        Assert.Catch<ArgumentException>(() => IsLeapYear(0));
    }

    [Test]
    public void if_it_is_negative(
        [Values(-1, -4 -100, -400, int.MinValue)] int year)
    {
        Assert.Catch<ArgumentException>(() => IsLeapYear(year));
    }
}
```

>For tests to drive development they must do more than just test code performs its required functionality: they must clearly express that required functionality to the reader.
>
> -Nat Pryce & Steve Freeman *Are your tests really driving your development?*

---

> *Any fool can write code that a computer can understand. Good programmers write code that humans can understand*
>
> -Martin Fowler

Notes to get started:

- Simple Cases
- Common Cases
- Error Cases
- Boundary Cases

## Guidelines

- Create a folder per class you test.
  - Create a class per "Thing" you are testing. A "Thing" can be a method, or a behavior, anything really. Make sure express yourself.
- Prefer `[InlineData]` (when you can use constants and dont need reuseability) over `[MemberData]`.
- Prefer `[MemberData]` (when the test data is class scoped, or you need runtime initilization) over `[ClassData]`.
- Prefer `[ClassData]` when you need to reuse testdata across multiple classes.

The main reason for this unconventional structure is, to make use of tests running in parallel.
By Default (in xunit 2.x) tests are executed in parallel, per class, using the number of logical processor your device offers.
(There is currently no way of executing tests in parallel per method)

Exmaple:

- Folder: `EntityId`
  - `Constrcutor.cs`
  - `ToString.cs`

> If you need classes to run sequentially (for whatever reason) use the `[Collection("CollecName")]`-Attribute for the two classes and give them the same name.
>
> This is subject to change, because I trying out a lot of stuff. (Like swapping from nunit to xunit, ...)

---

> Note: With only `EntityId` and `IsoDateTime` tests the benchmarks performed on avrg. 6ms better after splitting up the classes using 8 logical processors.
>
> Means a total of 88 tests performed better in 10 classes (avrg. 42ms), compared to 3 classes (avrg. 47.833ms). (`IsoDateTime` was already split up in 2 classes)

I was thinking, "how much better would this perform on my laptop?", which runs on 16 logical processors. My conclusion was, that it wasnt much faster, because there were only 10 classes, meaning they untilize at max 10 out of 16 possible logical processors xD

## Reading Data via IDomainRepository vs IDocumentCollection

- the collections are used for read only operations, which allow to use versatile projections for performance optimazions. 
- the domain repository is for read and write operations, which have a Domain Interface

For example, a DomainRepositoey interface expects a EntityId as argument, whereas a Collection expects a string, to avoid the unneccassy conversion.

## Testing 

you might be wondering, why there are little to no unit tests for the Infrastrcuture Layer. 
Well if you look for exmaple at the MongoCollection implementations you will see that they are only delegating 
calls to the MongoDb.Library which is ofc, already tested. 
And I am no friend of strict-mock testing. I really couldnt care less about "how" the RecipeCollection is calling
MongoDb, if I do, there will be a test for it. 

But take this example: 
```csharp
[Fact]
    public async Task uses_projection_for_generic_mapping()
    {
        var collection = Substitute.For<IMongoCollection<RecipeDoc>>();

        _dbMongo.Database
            .GetCollection<IMongoQueryable<RecipeDoc>>(Arg.Any<string>())
            .ReturnsForAll(collection);
        
        var queryable = Substitute.For<IMongoQueryable<RecipeDoc>>();

        collection
            .AsQueryable()
            .Returns(queryable);
        
        queryable.ReturnsForAll(new List<RecipeDoc>() { new RecipeDoc() { Id = "1", Title = "2" } });

        IQueryable<MyType> actual = await _collection.GetAllAsync(doc => new MyType(doc.Id), default);
        Equal(1, actual.Count());
    }
```

This is a test I started to write (which is unfinished, because I could not find a way around for mocking the IMongoQueryable, 
without another abstraction layer (which would be for the sole purpose of unit testing) or create Dummy/Fake classes and interfaces).
If you look closely at the implementation (which is btw shorter than the unfinished test itself)
```csharp
public sealed class RecipeCollection : Collection, IRecipeRepository, IRecipeCollection
{
    readonly IMongoCollection<RecipeDoc> _collection;

    public RecipeCollection(IDbMongo mongo) : base()
    {
        _collection = mongo.Database.GetCollection<RecipeDoc>("recipes");
    }

    public ValueTask<IQueryable<T>> GetAllAsync<T>(Expression<Func<RecipeDoc, T>> projection, CancellationToken ct = default)
    {
        IQueryable<T> query = _collection
           .AsQueryable()
           .Select(projection);

        return new ValueTask<IQueryable<T>>(query);
    }
}
```
You will realize, that after mocking `.GetCollection()`. `AsQueryable()`, 
(which are both extension methods and therefore cannot be mocked easily by most mocking libraries)
there is only one line of code left to test. Which is whether or not the projection is passed in the Select() method. 
Testing this it nonsense. 
From a unit-test POV: 
1. I dont care whether or not it uises `.Select()` or `System.Reflection` 
or someother external method call, to make the projection. I only care about the result I recieve. 
2. There is no point in checking for types, because the Generics make sure, I get back what I want.

As a sidenote: the `IDbMongo` interface didnt exist previously, and was solely created for the purpose of unit tests
and was dumped just like the other tests.

Now.. one question is left open: How do we test the result (the only thing we care about here) whithout mocking?
The answer is simple. We use an integration test. Funny enough, before i started writing the unit test, the integration test 
was already existing. In the Cypress end-2-end test library :)
If you want to double test tho, in "smaller isolation" I suppose, you can use a mongodb in memory collection.
Now this again, has a few problems (which the e2e tests might not have).
For example, using a MongoDb local instance, can yield errors when using BulkWrites, as they are not supported on 
the local mongo db standalone server. Same could (I say "could" because I dont know) be with an InMemory representation. 
So you might end up "not testing" some things, because you simply cant. 
The e2e tests however, can swap out the mongodb standalone instance for a MongoDB M0 Cluster, which in turn supports
these operations. And the e2e environment is likely to support that dependency (internet and http lol).
