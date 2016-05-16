import Promise from 'bluebird'
import initAppRoot from 'approot'
import moment from 'moment'
import fetch from 'node-fetch'

global.moment = moment

global.appRoot = initAppRoot(__dirname).consolidate()

global.Promise = Promise

global.fetch = fetch
