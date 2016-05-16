const TEST_ENVS = { }

function useEnv(...envs) {
  envs.forEach((env) => TEST_ENVS[env]())
}

useEnv.register = (name, functor) => { TEST_ENVS[name] = functor }

global.useEnv = useEnv
