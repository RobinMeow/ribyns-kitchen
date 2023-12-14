// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

#pragma warning disable IDE0077 // Avoid legacy format target in 'SuppressMessageAttribute'
[assembly: SuppressMessage("Style", "IDE1006:Naming Styles", Justification = "doing unit test naming according to Kevlin Henney. see here for more https://www.youtube.com/watch?v=MWsk1h8pv2Q", Scope = "namespaceanddescendants", Target = "server.tests")]
#pragma warning restore IDE0077 // Avoid legacy format target in 'SuppressMessageAttribute'
