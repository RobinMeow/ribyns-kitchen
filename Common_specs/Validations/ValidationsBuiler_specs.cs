using Common.Validations;

namespace Common_specs.Validations;

public sealed class ValidationsBuiler_specs
{
    public sealed class AddField_should
    {
        public sealed class throws_on_Build
        {
            [Fact]
            public void with_no_constraint_added()
            {
                Throws<InvalidOperationException>(() => new ValidationsBuilder()
                    .AddField("Meow")
                    .Build());
            }

            [Fact]
            public void when_min_constraint_is_added_twice()
            {
                Throws<InvalidOperationException>(() => new ValidationsBuilder()
                    .AddField("A")
                    .Min(1)
                    .Min(2)
                    .Build());
            }

            [Fact]
            public void when_max_constraint_is_added_twice()
            {
                Throws<InvalidOperationException>(() => new ValidationsBuilder()
                    .AddField("A")
                    .Max(1)
                    .Max(2)
                    .Build());
            }

            [Fact]
            public void when_required_constraint_is_added_twice()
            {
                Throws<InvalidOperationException>(() => new ValidationsBuilder()
                    .AddField("A")
                    .Required()
                    .Required()
                    .Build());
            }
        }

        [Fact]
        public void does_not_reuse_constraints_from_previous_field()
        {
            var actual = new ValidationsBuilder()
                .AddField("previous field")
                .Required()
                .Min(1)
                .Max(2)
                .AddField("next field")
                .Required()
                .Build();

            Null(actual["next field"].Min);
            Null(actual["next field"].Max);

            var actualRequired = new ValidationsBuilder()
                .AddField("previous field")
                .Required()
                .AddField("next field")
                .Min(1)
                .Build();

            False(actualRequired["next field"].IsRequired);
        }

        [Fact]
        public void throws_for_null_or_whitespace_field_name()
        {
            Throws<ArgumentException>(() => new ValidationsBuilder()
            .AddField("")
            .Required()
            .AddField("B"));

            Throws<ArgumentException>(() => new ValidationsBuilder()
            .AddField("")
            .Required()
            .Build());
        }

        [Fact]
        public void add_fieldname_with_its_first_letter_converted_to_lowercase()
        {
            Dictionary<string, FieldConstraints> actual = new ValidationsBuilder()
                .AddField("Meow")
                .Required()
                .Min(1)
                .Max(2)
                .Build();

            Single(actual);
            FieldConstraints fieldConstraints = actual["meow"];
            NotNull(fieldConstraints);
        }

        [Fact]
        public void add_fieldname_with_constraints()
        {
            Dictionary<string, FieldConstraints> actual = new ValidationsBuilder()
                .AddField("A")
                .Required()
                .Min(1)
                .Max(2)
                .Build();

            Single(actual);
            FieldConstraints fieldConstraints = actual.First().Value;
            True(fieldConstraints.IsRequired);
            Equal(1u, fieldConstraints.Min);
            Equal(2u, fieldConstraints.Max);
        }

        [Fact]
        public void add_multiple_fields_with_multiple_constraints()
        {
            Dictionary<string, FieldConstraints> actual = new ValidationsBuilder()
                .AddField("A")
                .Required()
                .Min(1)
                .Max(2)
                .AddField("B")
                .Required()
                .Min(3)
                .Max(4)
                .Build();

            Equal(2, actual.Count);
            FieldConstraints fcA = actual.First().Value;
            True(fcA.IsRequired);
            Equal(1u, fcA.Min);
            Equal(2u, fcA.Max);
            FieldConstraints fcB = actual.Last().Value;
            True(fcB.IsRequired);
            Equal(3u, fcB.Min);
            Equal(4u, fcB.Max);
        }

        [Fact]
        public void throw_if_fieldname_already_set()
        {
            Throws<InvalidOperationException>(() => new ValidationsBuilder().AddField("A").AddField("A"));
        }
    }
}
