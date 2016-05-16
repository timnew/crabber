useEnv.register('redis', () => {
  beforeEach(() => redis.flushdb())

  afterEach(() => redis.flushdb())
})
