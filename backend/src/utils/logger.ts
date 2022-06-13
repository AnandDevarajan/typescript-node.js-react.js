import logger from 'pino'
import pretty from 'pino-pretty'

const log = logger(pretty())
export default log