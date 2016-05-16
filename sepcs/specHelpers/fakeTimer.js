import Sinon from 'sinon'

useEnv.register('fakeTimer', () => {
  let fakeTimer = null

  const getTimer = () => fakeTimer

  const getNow = () => new Date(fakeTimer.now)

  const tick = (millis) => fakeTimer.tick(millis)

  const restoreFakeTimer = () => {
    if (fakeTimer == null) {
      return
    }

    fakeTimer.restore()
    fakeTimer = null
  }

  const setupFakeTimer = (now) => {
    restoreFakeTimer()

    const nowDate = new Date(now)

    fakeTimer = Sinon.useFakeTimers(nowDate.value)
  }

  beforeEach(() => {
    global.fakeTimer = {
      getTimer,
      getNow,
      tick,
      setupFakeTimer,
      restoreFakeTimer,
    }

    setupFakeTimer()
  })

  afterEach(() => {
    restoreFakeTimer()

    delete global.fakeTimer
  })
})
