-- Runs once when the Postgres container is first created.
-- Creates an isolated database for the automated test suite, kept separate
-- from your local dev data so tests never clobber what you're working on.
CREATE DATABASE arduwyn_test;
