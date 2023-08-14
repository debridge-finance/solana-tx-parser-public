## v2.0.0

- Update packages
- Migrate from @project-serum/anchor -> @coral-xyz/anchor

### Breaking changes
- Token instruction `setAuthority`, arg `authorityType` changed from `@solana/spl-token AuthorityType` to IDL enum
- Token instruction `initializeAccount3`, arg `authority` renamed to `owner`
- Token instruction `initializeAccount2`, arg `authority` renamed to `owner`